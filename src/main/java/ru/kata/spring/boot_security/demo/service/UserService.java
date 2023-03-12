package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void saveUser(User user);
    void deleteUserById(Long id);
    void editUser(User user);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User getUserByName(String name);
}
