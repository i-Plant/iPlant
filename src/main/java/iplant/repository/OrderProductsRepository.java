package iplant.repository;

import iplant.data.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductsRepository extends JpaRepository<OrderProduct, Long> {

}
