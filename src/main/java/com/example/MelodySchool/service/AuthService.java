package com.example.MelodySchool.service;

import com.example.MelodySchool.entity.*;
import com.example.MelodySchool.models.request.CreateUserRequest;
import com.example.MelodySchool.models.request.LoginRequest;
import com.example.MelodySchool.models.request.MailRequest;
import com.example.MelodySchool.models.response.AuthResponse;
import com.example.MelodySchool.models.response.MessageResponse;
import com.example.MelodySchool.repository.ConfirmationTokenRepository;
import com.example.MelodySchool.repository.RefreshTokenRepository;
import com.example.MelodySchool.repository.RoleRepository;
import com.example.MelodySchool.repository.UserRepository;
import com.example.MelodySchool.security.jwt.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.mail.MailMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.util.WebUtils;


import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    ConfirmationTokenService confirmationTokenService;
    @Autowired
    EmailService emailService;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    RefreshTokenRepository refreshTokenRepository;
    @Autowired
    BCryptPasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    RefreshTokenService refreshTokenService;
    Cookie cookie;
    @Autowired
    EmailValidator emailValidator;

    @Value("${spring.mail.username}")
    private String userName;

    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);
        RefreshToken oldRefreshJwt = refreshTokenService.findTokenById(userDetails).get();
        if(oldRefreshJwt == null){
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
            cookie = new Cookie("refresh", refreshToken.getToken());
            cookie.setMaxAge(7 * 24 * 60 * 60);
            cookie.setHttpOnly(true);
            cookie.setPath("/api/auth/refresh");
            cookie.setSecure(true);
            response.addCookie(cookie);
        }
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok()
                .body(new AuthResponse(jwt,
                        userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        roles));
    }

    public ResponseEntity<?> registerUser(@Valid @RequestBody CreateUserRequest createUserRequest) {
        if (userRepository.existsByUsername(createUserRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(createUserRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(createUserRequest.getUsername(),
                createUserRequest.getEmail(),
                encoder.encode(createUserRequest.getPassword()));

        Set<String> strRoles = createUserRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_PARENTS)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        boolean isValidEmail = emailValidator.test(createUserRequest.getEmail());
        if (isValidEmail) {
            String tokenForNewUser = userDetailsService.getVerifyEmailToken(user);

            String link = "http://localhost:8080/api/auth/confirm?token=" + tokenForNewUser;
            emailService.sendEmail(createUserRequest.getEmail(), buildEmail(createUserRequest.getFirstName(), link));

        } else {
            throw new IllegalStateException(String.format("Email %s, not valid", createUserRequest.getEmail()));
        }

        return ResponseEntity.ok(new MessageResponse("Verify email by the link sent on your email address"));
    }


    @Transactional
    public String confirmToken(String token) {
        Optional<ConfirmationToken> confirmToken = confirmationTokenService.getToken(token);

        if (confirmToken.isEmpty()) {
            throw new IllegalStateException("Token not found!");
        }

        if (confirmToken.get().getConfirmedAt() != null) {
            throw new IllegalStateException("Email is already confirmed");
        }

        LocalDateTime expiresAt = confirmToken.get().getExpiresAt();

        if (expiresAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token is already expired!");
        }

        confirmationTokenService.setConfirmedAt(token);
        userDetailsService.enableUser(confirmToken.get().getUser().getEmail());

        return "Your email is confirmed. Thank you for using our service!";
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
    public ResponseEntity<?> refreshToken(@RequestBody HttpServletRequest request){
        return refreshTokenService.findByToken(WebUtils.getCookie(request, "refresh").getValue())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String accessToken= jwtUtils.generateTokenFromUsername(user.getUsername());
                    RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
                    ResponseCookie cookie = ResponseCookie.from("refresh", refreshToken.getToken())
                            .path("/api/auth/refresh")
                            .httpOnly(true)
                            .secure(true)
                            .build();
                    return ResponseEntity.ok()
                            .header(HttpHeaders.SET_COOKIE, cookie.toString())
                            .body(accessToken);
                }).orElseThrow(()->new RuntimeException("Refresh token is not in database!.." + WebUtils.getCookie(request, "refresh").getValue()));

    }

    public void logout(){

        var currentPrincipal = new  SecurityContextHolder().getContext().getAuthentication().getPrincipal();
        if (currentPrincipal instanceof UserDetailsImpl userDetails){
            Long userid = userDetails.getId();
        }
    }
}
