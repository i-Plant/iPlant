package iplant.controller;

import iplant.data.Order;
import iplant.data.User;
import iplant.repository.OrdersRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/order", produces = "application/json")
public class OrdersController {

    private OrdersRepository orderRepository;

    @GetMapping(path = "")
    public List<Order> getOrders() {

        return orderRepository.findAll();
    }
    @GetMapping(path = "/{id}")
    public Optional<Order> fetchOrdersByBuyer(@PathVariable Order buyer) {
        Long userId = buyer.getId();
        Optional<Order> optionalOrder = Optional.ofNullable(orderRepository.findByBuyer(userId));
        if(optionalOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order Buyer " + buyer.getBuyer().getScreenName() + " not found");
        }
        return optionalOrder;
    }
    public void createOrder(@RequestBody Order newOrder) {
        //orderId auto creates in db//

        //set UserId as Buyer for the newOrder. If not a user set Buyer to null:

        //create and set DateTimeStamp as createdAt to newOrder:

        //check that the products list has items in it, then save it to the newOrder:

    }
}
