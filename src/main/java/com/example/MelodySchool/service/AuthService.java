package com.example.MelodySchool.service;

import com.example.MelodySchool.entity.*;
import com.example.MelodySchool.models.request.CreateUserRequest;
import com.example.MelodySchool.models.request.LoginRequest;
import com.example.MelodySchool.models.request.LogoutRequest;
import com.example.MelodySchool.models.response.AuthResponse;
import com.example.MelodySchool.models.response.MessageResponse;
import com.example.MelodySchool.models.response.SimpleResponse;
import com.example.MelodySchool.models.response.TokenRefreshResponse;
import com.example.MelodySchool.repository.*;
import com.example.MelodySchool.security.jwt.JwtUtils;
import com.example.MelodySchool.security.jwt.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.util.WebUtils;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.*;

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
    @Autowired
    ItemsMenuService itemsMenuService;


    @Value("${spring.mail.username}")
    private String userName;

    public ResponseEntity<?> authenticateUser( @RequestBody LoginRequest loginRequest, HttpServletResponse response) throws SQLException {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));


        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);
        if(loginRequest.getRememberMe()){
            if(refreshTokenRepository.findByUserId(userDetails.getId()).isPresent()){
                refreshTokenService.deleteOldRefreshTokenByUserId(userDetails.getId());
                RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
                cookie = refreshTokenService.generateRefreshJwtCookie(refreshToken.getToken(), 50000);
                response.addCookie(cookie);
            }
            if(refreshTokenRepository.findByUserId(userDetails.getId()).isEmpty()){
                RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
                cookie = refreshTokenService.generateRefreshJwtCookie(refreshToken.getToken(), 50000);
                response.addCookie(cookie);
            }
        }

        return ResponseEntity.ok()
                .body(new AuthResponse(jwt));
    }

    public ResponseEntity<?> registerUser(@RequestBody CreateUserRequest createUserRequest) throws SQLException {
              if (userRepository.existsByEmail(createUserRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }
        String partSeparator = ",";

            String encodedImg = createUserRequest.getAvatar().split(partSeparator)[1];
            byte[] result = Base64.getDecoder().decode(encodedImg);
            Blob b = new SerialBlob(result);

        User user = new User(
                b,
                createUserRequest.getEmail(),
                encoder.encode(createUserRequest.getPassword()),
                createUserRequest.getFirstName(),
                createUserRequest.getLastName());

        Set<String> strRoles = createUserRequest.getRoles();
        Set<Role> roles = new HashSet<>();
        List<ItemsMenu> itemsMenus = new ArrayList<>();


        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            itemsMenus.addAll(itemsMenuService.setDefaultStudentItemsMenu());
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "ROLE_ADMIN":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);


                        break;
                    case "ROLE_PARENTS":
                        Role modRole = roleRepository.findByName(ERole.ROLE_PARENTS)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        itemsMenus.addAll(itemsMenuService.setDefaultStudentItemsMenu());
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        user.setItemsMenus(itemsMenus);
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

        return "<div style=\"display: flex; justify-content: center; height: 10vw;  width: 90vw; " +
                "background-color: rgb(0, 3, 2);\">" +
                "<div style=\" display: flex; justify-content: center; text-align: center; " +
                "height: 50vw;  width: 90vw; background-color: rgb(253, 253, 253);\">" +
                "<div>" +
                "<p style=\"font-size: 20px; font-weight: 700;\">Email подтверждён, спасибо! </p>" +
                "<p>Перейдите по ссылке, чтобы вернуться на сайт</p>" +
                "<a href=\"localhost:3000/\"> Активировать аккаунт </a>  </div> </div>";
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"display: flex; justify-content: center; height: 10vw;  width: 90vw; " +
                "background-color: rgb(0, 3, 2);\">" +
        "<div style=\" display: flex; justify-content: center; text-align: center; " +
                "height: 50vw;  width: 90vw; background-color: rgb(253, 253, 253);\">" +
            "<div>" +
                "<p style=\"font-size: 20px; font-weight: 700;\">Спасибо, за регистрацию на сайте," +name +" </p>" +
                "<p>Чтобы завершить регистрацию, и активировать аккаунт, перейдите пожалуйста по ссылке ниже!</p>" +
                "<a href=\""+ link +  "\"> Активировать аккаунт </a>  </div> </div>";
    }
    public ResponseEntity<?> refreshToken(@RequestBody HttpServletRequest request, HttpServletResponse response){

        try {
            refreshTokenService.findByToken(WebUtils.getCookie(request, "refresh").getValue())
                    .map(refreshTokenService::verifyExpiration)
                    .map(RefreshToken::getUser)
                    .map(user -> {
                        String accessToken= null;
                        try {
                            accessToken = jwtUtils.generateTokenFromEmail(user.getEmail(),userDetailsService.loadUserByUsername(user.getEmail()));
                        } catch (SQLException e) {
                            throw new RuntimeException(e);
                        }
                        refreshTokenService.deleteOldRefreshTokenByUserId(user.getId());
                        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
                        cookie = refreshTokenService.generateRefreshJwtCookie(refreshToken.getToken(), 50000);
                        response.addCookie(cookie);
                        return ResponseEntity.ok()
                                .body(new TokenRefreshResponse(accessToken));
                    }).orElseThrow(()->new RuntimeException("Refresh token is not in database!.." + WebUtils.getCookie(request, "refresh").getValue()));
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new SimpleResponse("Refresh token not found"));
        }

        return ResponseEntity.ok().body(new SimpleResponse(""));
    }


    public ResponseEntity<?> logout(LogoutRequest logoutRequest) {

        if(refreshTokenRepository.findByUserId(logoutRequest.getUserId()).isPresent()) {
            refreshTokenService.deleteOldRefreshTokenByUserId(logoutRequest.getUserId());
            return ResponseEntity.ok(new SimpleResponse("logout sucessful"));
        }
        return ResponseEntity.ok(new SimpleResponse("logout sucessful"));

    }

}
