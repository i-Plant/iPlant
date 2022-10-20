package iplant.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@Controller
public class ViewController {

    @RequestMapping({"/", "/about", "/login", "/home", "/posts", "/register", "/me","/products","/checkout","/paymentOk", "/cart", "/reviews"})
    public String showView() {
        return "forward:/index.html";
    }
}

