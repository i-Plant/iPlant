package iplant.controller;

import iplant.data.Order;
import iplant.data.Product;
import iplant.repository.OrdersRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/order", produces = "application/json")
public class OrderController {

    private OrdersRepository orderRepository;

    @GetMapping(path = "")
    public List<Order> getOrders() {

        return orderRepository.findAll();
    }

}
