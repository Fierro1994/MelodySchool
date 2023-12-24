package com.example.MelodySchool.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class WebAppExceptionHandling {

    @ExceptionHandler(TokenRefreshException.class)
    public ResponseEntity<ErrorResponseBody> refreshTokenExceptionHandler (TokenRefreshException ex, WebRequest webRequest){
        return buildResponse(HttpStatus.FORBIDDEN, ex, webRequest);
    }

    @ExceptionHandler(AlreadyExistException.class)
    public ResponseEntity<ErrorResponseBody> allreadyExistException (AlreadyExistException ex, WebRequest webRequest){
        return buildResponse(HttpStatus.BAD_REQUEST, ex, webRequest);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponseBody> entityNotFoundException (EntityNotFoundException ex, WebRequest webRequest){
        return buildResponse(HttpStatus.NOT_FOUND, ex, webRequest);
    }

    private ResponseEntity<ErrorResponseBody> buildResponse(HttpStatus httpStatus, Exception ex, WebRequest webRequest) {
   return ResponseEntity.status(httpStatus)
           .body(ErrorResponseBody.builder().message(ex.getMessage()).description(webRequest.getDescription(false)).build());
    }


}
