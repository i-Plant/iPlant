
package iplant.controller;

import iplant.data.Order;
import iplant.data.OrderProduct;
import iplant.data.User;
import iplant.repository.OrderProductsRepository;
import iplant.repository.misc.FieldHelper;
import iplant.repository.OrdersRepository;
import iplant.services.AuthBuddy;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static iplant.data.Status.*;

@CrossOrigin
@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping(value = "/api/orders", produces = "application/json")
public class OrdersController {
    @Autowired
    private OrdersRepository orderRepository;
    @Autowired
    private OrderProductsRepository orderProductsRepository;
    @Autowired
    private AuthBuddy authBuddy;


    @GetMapping(path = "")
    public List<Order> getOrders() {
        List<Order> activeOrders = orderRepository.fetchActiveOrders();
        if (activeOrders.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Active Orders");
        }
        return activeOrders;
    }

    @GetMapping(path = "/{id}")
    public Optional<Order> fetchOrderById(@PathVariable long id) {

        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order  " + id + " not found");
        }
        return optionalOrder;
    }


    @DeleteMapping("/delete/{id}")
    public void deleteOrderById(@PathVariable long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order # " + id + " not found");
        } else {
            orderRepository.deleteById(id);
        }
    }

    @PutMapping("/update/{id}")
    public void updateOrder(@RequestBody Order updatedOrder, @PathVariable long id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if(orderOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order " + id + " not found");
        }
        Order originalOrder = orderOptional.get();
        BeanUtils.copyProperties(updatedOrder, originalOrder, FieldHelper.getNullPropertyNames(updatedOrder));
        originalOrder.setId(id);
        originalOrder.setCreatedAt(LocalDate.now());

        orderRepository.save(updatedOrder);
    }



    @PostMapping("/products/{orderId}")
    public OrderProduct addProductToOrder(@RequestBody OrderProduct newProductToOrder, @PathVariable Long orderId, @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader ) {
        User loggedInUser = authBuddy.getUserFromAuthHeaderJWT(authHeader);
        if(loggedInUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not logged in");
        }
        if(orderId == 0) {
            Order newOrder = new Order();
            newOrder.setBuyer(loggedInUser);
            newOrder.setCreatedAt(LocalDate.now());
            newOrder.setStatus(Active);
            newOrder = orderRepository.save(newOrder);
            newProductToOrder.setOrder(newOrder);
            orderId = newOrder.getId();
        }
        newProductToOrder.getOrder().setId(orderId);
        newProductToOrder.setQuantity(1);
        newProductToOrder = orderProductsRepository.save(newProductToOrder);
        return newProductToOrder;
    }

    @PutMapping("/products/{id}/quantity-decrement")
    public void decrementProductInOrder(@PathVariable Long id){
        Optional<OrderProduct> originalProduct = orderProductsRepository.findById(id);
        if(originalProduct.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "OrderProducts "+ id + " not found");
        }
//        System.out.println(originalProduct.get().getQuantity());
        originalProduct.get().setQuantity((originalProduct.get().getQuantity()) - 1);
//        System.out.println(originalProduct.get().getQuantity());
        orderProductsRepository.save(originalProduct.get());
    }

    @PutMapping("/products/{id}/quantity-increment")
    public void incrementProductInOrder(@PathVariable Long id){
        Optional<OrderProduct> originalProduct = orderProductsRepository.findById(id);
        if(originalProduct.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "OrderProducts "+ id + " not found");
        }
        System.out.println(originalProduct.get().getQuantity());
        originalProduct.get().setQuantity((originalProduct.get().getQuantity()) + 1);
        System.out.println(originalProduct.get().getQuantity());
        orderProductsRepository.save(originalProduct.get());
    }

    @DeleteMapping("/products/delete/{id}")
    public void deleteProductInOrder(@PathVariable long id){
        orderProductsRepository.deleteById(id);
    }

    @PutMapping("/{id}/Completed")
    public void completeOrder(@RequestBody Order updatedOrder,@PathVariable long id){
        Optional<Order> orderOptional = orderRepository.findById(id);
        if(orderOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order " + id + " not found");
        }
        Order originalOrder = orderOptional.get();
        BeanUtils.copyProperties(updatedOrder, originalOrder, FieldHelper.getNullPropertyNames(updatedOrder));
        updatedOrder.setId(id);
        updatedOrder.setCreatedAt(LocalDate.now());
        updatedOrder.setStatus(Completed);

        orderRepository.save(updatedOrder);
    }
}
