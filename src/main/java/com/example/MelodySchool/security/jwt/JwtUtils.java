package com.example.MelodySchool.security.jwt;

import java.util.Date;

import com.example.MelodySchool.service.StudentDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.lifetime}")
    private int jwtExpirationMs;

    public String generateJwtToken(StudentDetails studentDetails) {
        return generateTokenFromUsername(studentDetails);
    }

    private String generateTokenFromUsername(StudentDetails studentDetails) {
        return Jwts.builder()
                .setId(studentDetails.getId().toString())
                .setSubject(studentDetails.getUsername())
                .claim("roles", studentDetails.getAuthorities())
                .claim("email", studentDetails.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

    }

    public boolean validateJwtToken(String jwt) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwt);
            return true;
        } catch (MalformedJwtException e) {
            System.err.println(e.getMessage());
        } catch (SignatureException e) {
            System.err.println(e.getMessage());
        } catch (ExpiredJwtException e) {
            System.err.println(e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.err.println(e.getMessage());
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
        }

        return false;
    }

    public String getUserNameFromJwtToken(String jwt) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwt).getBody().getSubject();
    }


}
