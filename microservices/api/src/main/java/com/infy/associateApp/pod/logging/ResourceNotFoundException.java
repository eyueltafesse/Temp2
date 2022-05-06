package com.infy.associateApp.pod.logging;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "employee id  not found")
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String s) {
    }
}


