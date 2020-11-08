package com.novacoders.homebuilding.ResourceException;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class ResourceException extends RuntimeException {
    private final long serialVersionUID = 1;
    public ResourceException(String message){
        super(message);
    }
    public ResourceException(String message, Throwable exception ){
        super(message,exception);
    }
}
