package iplant.controller;

import iplant.data.Order;
import iplant.data.Product;
import iplant.data.User;
import iplant.repository.OrdersRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/order", produces = "application/json")
public class OrderController {

    private OrdersRepository orderRepository;

    @GetMapping(path = "")
    public List<Order> getOrders() {

        return orderRepository.findAll();
    }
    @GetMapping(path = "/{id}")
    public Optional<Order> fetchOrderByBuyer(@PathVariable User Buyer) {
        Optional<Order> optionalOrder;
        if(optionalOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order Buyer " + Buyer + " not found");
        }
        return optionalOrder;
    }

}
