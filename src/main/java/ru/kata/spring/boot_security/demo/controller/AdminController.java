package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

@Controller
public class AdminController {

    private final UserServiceImpl userService;
    private final RoleServiceImpl roleService;

    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public String showUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "admin";
    }

    @GetMapping("/admin/{id}")
    public String showUserById(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getUserById(id));
        return "user";
    }

    @GetMapping("/admin/deleteUser/{id}")
    public String deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
        return "redirect:/admin";
    }

    @GetMapping("/admin/createUser")
    public String getCreateUserForm(User user, Model model) {
        model.addAttribute("newUser", user);
        model.addAttribute("roles", roleService.getAllRoles());
        return "createUser";
    }

    @PostMapping("/createUser")
    public String saveUser(User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/admin/updateUser/{id}")
    public String getUpdateUserForm(Model model, @PathVariable("id") Long id) {
        model.addAttribute("userToUpdate", userService.getUserById(id));
        model.addAttribute("roles", roleService.getAllRoles());
        return "editUser";
    }

    @PutMapping("/updateUser")
    public String updateUser(User user) {
        userService.editUser(user);
        return "redirect:/admin";
    }
}
