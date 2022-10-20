package iplant.controller;

import iplant.data.Order;
import iplant.data.Product;
import iplant.repository.OrderProductsRepository;
import iplant.repository.OrdersRepository;
import iplant.repository.ProductsRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/order_products", produces = "application/json")
public class OrderProductsController {
//    private ProductsRepository productsRepository;
//    private OrdersRepository orderRepository;
//    private OrderProductsRepository orderProductsRepository;
//    public List<Order> getOrders() {
//
//        return orderRepository.findAll();
//    }
//    public List<Product> getProducts() {
//
//        return productsRepository.findAll();
//    }

}
