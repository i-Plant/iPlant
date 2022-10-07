package iplant.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({"/", "/about", "/login", "/home", "/posts", "/register", "/me","/products","/checkout","/paymentOk"})
    public String showView() {
        return "forward:/index.html";
    }
}

