package iplant.controller;

import iplant.data.Product;
import iplant.repository.misc.FieldHelper;
import iplant.repository.ProductsRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/products", produces = "application/json")
public class ProductsController {

    private ProductsRepository productsRepository;


    @GetMapping(path = "")
    public List<Product> getProducts() {

        return productsRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Product> fetchProductById(@PathVariable long id) {
        Optional<Product> optionalProduct = productsRepository.findById(id);
        if(optionalProduct.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        return optionalProduct;
    }

//    @PostMapping("")
//    public void createProduct(@RequestBody Product newProduct) {
//
//        productsRepository.save(newProduct);
//
//    }


    @DeleteMapping("/{id}")
    public void deleteProductsById(@PathVariable long id) {

        Optional<Product> optionalProduct = productsRepository.findById(id);
        if(optionalProduct.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product id " + id + " not found");
        }
        // grab the original post from the optional and check the logged in user
        Product originalProduct = optionalProduct.get();



        productsRepository.deleteById(id);
    }


    @PutMapping("/{id}")
    public void updateProducts(@RequestBody Product updatedProduct, @PathVariable long id) {
        Optional<Product> optionalProduct = productsRepository.findById(id);
        if(optionalProduct.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product " + id + " not found");
        }
        Product originalProduct = optionalProduct.get();


        // in case id is not in the request body (i.e., updatedPost), set it
        // with the path variable id
        updatedProduct.setId(id);

        // copy any new field values FROM updatedPost TO originalPost
        BeanUtils.copyProperties(updatedProduct, originalProduct, FieldHelper.getNullPropertyNames(updatedProduct));

        productsRepository.save(updatedProduct);
    }

}
