package com.infy.associateApp.user.controller;

import com.infy.associateApp.user.model.User;
import com.infy.associateApp.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // Gets user object from DB with empId: David (Passed postman)
    @GetMapping("/users/{empId}")
    public ResponseEntity<User> getUser(@PathVariable int empId){
        return new ResponseEntity<>(userService.getUser(empId), HttpStatus.OK);
    }
    // Gets all users from DB: David
    @GetMapping("/users")
    public ResponseEntity <List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }
    // returns true or false for password verification: David (Passed)
    @PutMapping("/users/{empId}/login")
    public ResponseEntity<Boolean> login(@RequestBody User user) {
        return new ResponseEntity<>(userService.verifyPassword(user), HttpStatus.OK);
    }
    // resets the initial password for the user and adds security questions: David (Passed)
    @PutMapping("/users/{empId}/initial")
    public ResponseEntity<String> initialPasswordReset(@RequestBody User user) {
        String success = userService.initialPasswordReset(user);
        return new ResponseEntity<>(success, HttpStatus.OK);
    }
//    // Resets password using security question: David (passed)
    @PutMapping("/users/{empId}/reset")
    public ResponseEntity<String> forgotPassword(@RequestBody User user) {
        return new ResponseEntity<>(userService.forgotPassword(user), HttpStatus.OK);
    }
}
