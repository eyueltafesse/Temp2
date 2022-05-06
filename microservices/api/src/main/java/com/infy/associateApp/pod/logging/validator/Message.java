package com.infy.associateApp.pod.logging.validator;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

// custom error message:David
@Data
@AllArgsConstructor
public class Message {
    Set<String> messages = new HashSet<>();
    boolean error = false;

    public Message() {
    }
    public Message(String m) {
        add(m);
        this.error = true;
    }

    public void add(String m) {
        this.setError(true);
        this.messages.add(m);
    }
    public void addMessage(String m) {
        this.messages.add(m);
    }
}
