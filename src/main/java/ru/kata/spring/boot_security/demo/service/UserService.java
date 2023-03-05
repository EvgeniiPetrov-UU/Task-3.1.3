package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    void saveUser(User user);
    void deleteUserById(Long id);
    void editUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    User getUserByName(String name);
}
