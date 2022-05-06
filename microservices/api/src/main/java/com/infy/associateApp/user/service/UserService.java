package com.infy.associateApp.user.service;

import com.infy.associateApp.user.model.User;
import com.infy.associateApp.user.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserService {

    @Autowired
    UserRepository userRepository;

    // Creates User details and generates password: David
    public User createNewUser(User userData) {
        User newUser = new User();

        newUser.setEmpId(userData.getEmpId());
        newUser.generatePassword();
        newUser.setSecurityQuestion(userData.getSecurityQuestion());
        newUser.setSecurityAnswer(encryptAnswer(userData.getSecurityAnswer()));
        userRepository.save(newUser);

        return newUser;
    }
    // Gets a list of all Users: David
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    // Verifies initial password: David
    public boolean verifyInitial(User existingUser, String initialPassword) {
        return existingUser.getInitialPassword().equals(initialPassword);
    }
    // Resets initial password given by admin, encrypts password and answer: David
    public String initialPasswordReset(User user) {
        String encryptedPassword = encryptPassword(user.getPassword());
        String encryptedAnswer = encryptAnswer(user.getSecurityAnswer());
        User existingUser = userRepository.getByEmpId(user.getEmpId());

        if (verifyInitial(existingUser, user.getInitialPassword())) {
            existingUser.setPassword(encryptedPassword);
            existingUser.setSecurityAnswer(encryptedAnswer);
            existingUser.setSecurityQuestion(user.getSecurityQuestion());
            existingUser.setUpdatedPassword(true);
            userRepository.save(existingUser);
            return "Update successful";
        } else {
            return "Password Incorrect";
        }
    }
    // Resets password by verifying security question: David
    public String forgotPassword(User user) {
        User existingUser = userRepository.getByEmpId(user.getEmpId());
        if (verifyAnswer(user.getSecurityAnswer(), user.getEmpId())) {
            String password = encryptPassword(user.getPassword());
            existingUser.setPassword(password);
            userRepository.save(existingUser);
            return "Password reset successful";
        } else {
            return "Answer incorrect";
        }
    }
    // Gets user by empId: David
    public User getUser(int empId) {
        return userRepository.getByEmpId(empId);
    }
    // hashes and salts user password: David
    public String encryptPassword(String password) {
         return BCrypt.hashpw(password, BCrypt.gensalt());
    }
    // hashes and salts security answer: David
    public String encryptAnswer(String answer) {
        String encryptAnswer;
        encryptAnswer = BCrypt.hashpw(answer, BCrypt.gensalt());
        return encryptAnswer;
    }
    // compares password submitted by user to hashed password in DB: David
    public boolean verifyPassword(User user) {
        User existingUser = userRepository.getByEmpId(user.getEmpId());
        String encryptPassword = existingUser.getPassword();
        return BCrypt.checkpw(user.getPassword(), encryptPassword);
    }
    // compares security answer to encrypted answer in DB: David
    public boolean verifyAnswer(String answer, int empId) {
        boolean verify;
        User user = userRepository.getByEmpId(empId);
        String encryptedAnswer = user.getSecurityAnswer();

        verify = BCrypt.checkpw(answer, encryptedAnswer);
        return verify;
    }
}
