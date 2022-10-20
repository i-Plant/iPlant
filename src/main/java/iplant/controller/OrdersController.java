
package iplant.controller;

import iplant.data.Order;
import iplant.repository.misc.FieldHelper;
import iplant.repository.OrdersRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static iplant.data.Status.Active;
@CrossOrigin
@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping(value = "/api/orders", produces = "application/json")
public class OrdersController {
    @Autowired
    private OrdersRepository orderRepository;

    @GetMapping(path = "")
    public List<Order> getOrders() {
        List<Order> flemflam = orderRepository.fetchActiveOrders();
        if (flemflam.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Active Orders");
        }
        return flemflam;
    }

    @GetMapping(path = "/{id}")
    public Optional<Order> fetchOrdersById(@PathVariable long id) {

        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order  " + id + " not found");
        }
        return optionalOrder;
    }

    @PostMapping("/create")
    public void createOrder(@RequestBody Order newOrder ) {
//        set UserId as Buyer for the newOrder. If not a user set Buyer to null:
        newOrder.setBuyer(null);
//                if(isLoggedIn()) {
//                    newOrder.setBuyer(user);
//                }

//        create and set DateTimeStamp as createdAt to newOrder:
        newOrder.setCreatedAt(LocalDate.now());
        newOrder.setStatus(Active);

//        add in item selected to the list; then save it to the newOrder:

        orderRepository.save(newOrder);
    }

    @DeleteMapping("/{id}")
    public void deleteOrderById(@PathVariable long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order # " + id + " not found");
        } else {
            orderRepository.deleteById(id);
        }
    }

    @PutMapping("/{id}")
    public void updateOrder(@RequestBody Order updatedOrder, @PathVariable long id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if(orderOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order " + id + " not found");
        }
        Order originalOrder = orderOptional.get();
        BeanUtils.copyProperties(updatedOrder, originalOrder, FieldHelper.getNullPropertyNames(updatedOrder));
        originalOrder.setId(id);
        originalOrder.setCreatedAt(LocalDate.now());

        orderRepository.save(originalOrder);
    }

}
