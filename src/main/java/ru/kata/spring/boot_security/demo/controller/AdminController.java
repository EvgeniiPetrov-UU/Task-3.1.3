//package ru.kata.spring.boot_security.demo.controller;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//import ru.kata.spring.boot_security.demo.model.User;
//import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
//import ru.kata.spring.boot_security.demo.service.UserServiceImpl;
//
//import java.security.Principal;
//
//@Controller
//@RequestMapping("/admin")
//public class AdminController {
//
//    private final UserServiceImpl userService;
//    private final RoleServiceImpl roleService;
//
//    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService) {
//        this.userService = userService;
//        this.roleService = roleService;
//    }
//
//    @GetMapping
//    public String getAdminForm(Model model, Principal principal) {
//        model.addAttribute("authUser", userService.getUserByName(principal.getName()));
//        model.addAttribute("newUser", new User());
//        model.addAttribute("users", userService.getAllUsers());
//        model.addAttribute("roles", roleService.getAllRoles());
//        return "admin";
//    }
//}
