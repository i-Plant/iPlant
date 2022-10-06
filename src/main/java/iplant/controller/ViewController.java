package iplant.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class ViewController {


    @RequestMapping({"/", "/about", "/login", "/home", "/posts", "/register", "/me","/products","/checkout","/paymentOk"})
    public String showView() {
        return "forward:/index.html";
    }
}
