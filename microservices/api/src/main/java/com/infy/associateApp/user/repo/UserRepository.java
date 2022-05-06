package com.infy.associateApp.user.repo;

import com.infy.associateApp.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Integer> {
    User save(User user);

    public User getByEmpId(int empId);
}
