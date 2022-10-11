
package iplant.controller;

import iplant.data.Order;
import iplant.data.User;
import iplant.repository.OrdersRepository;
import iplant.repository.ProductsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static iplant.data.Status.Active;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/order", produces = "application/json")
public class OrdersController {

    private OrdersRepository orderRepository;
//    private ProductsRepository productsRepository;

    @GetMapping(path = "")
    public List<Order> getOrders() {

        return orderRepository.findAll();
    }
    @GetMapping(path = "/{id}")
    public Optional<Order> fetchOrdersById(@PathVariable Order buyer) {
        Long userId = buyer.getId();
        Optional<Order> optionalOrder = orderRepository.findById(userId);
        if(optionalOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order Buyer " + buyer.getBuyer().getScreenName() + " not found");
        }
        return optionalOrder;
    }
    @PostMapping("/create")
    public void createOrder(@RequestBody Order newOrder) {
//        set UserId as Buyer for the newOrder. If not a user set Buyer to null:
        newOrder.setBuyer(null);
//                if(user.isLoggedIn) {
//                    newOrder.setBuyer(user.id);
//                }

//        create and set DateTimeStamp as createdAt to newOrder:
        newOrder.setCreatedAt(LocalDate.now());
        newOrder.setStatus(Active);

//        add in item selected to the list; then save it to the newOrder:

        orderRepository.save(newOrder);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable long id) {

    }

    @PutMapping("/{id}")
    public void updateOrder(@RequestBody User updatedOrder, @PathVariable long id) {

    }

}
