package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserServiceImpl userService;
    private final RoleServiceImpl roleService;

    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String getAdminForm(Model model, Principal principal) {
        model.addAttribute("authUser", userService.getUserByName(principal.getName()));
        model.addAttribute("newUser", new User());
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("roles", roleService.getAllRoles());
        return "admin";
    }

    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute("newUser") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/updateUser/{id}")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.editUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
        return "redirect:/admin";
    }

//    @GetMapping
//    public String showUsers(Model model) {
//        model.addAttribute("users", userService.getAllUsers());
//        return "admin";
//    }
//
//    @GetMapping("/{id}")
//    public String showUserById(Model model, @PathVariable("id") Long id) {
//        model.addAttribute("user", userService.getUserById(id));
//        return "user";
//    }
//
//    @DeleteMapping("/deleteUser/{id}")
//    public String deleteUserById(@PathVariable("id") Long id) {
//        userService.deleteUserById(id);
//        return "redirect:/admin";
//    }
//
//    @GetMapping("/createUser")
//    public String getCreateUserForm(User user, Model model) {
//        model.addAttribute("newUser", user);
//        model.addAttribute("roles", roleService.getAllRoles());
//        return "createUser";
//    }
//
//    @PostMapping
//    public String saveUser(User user) {
//        userService.saveUser(user);
//        return "redirect:/admin";
//    }
//
//    @GetMapping("/updateUser/{id}")
//    public String getUpdateUserForm(Model model, @PathVariable("id") Long id) {
//        model.addAttribute("userToUpdate", userService.getUserById(id));
//        model.addAttribute("roles", roleService.getAllRoles());
//        return "editUser";
//    }
//
//    @PatchMapping
//    public String updateUser(User user) {
//        userService.editUser(user);
//        return "redirect:/admin";
//    }
}
