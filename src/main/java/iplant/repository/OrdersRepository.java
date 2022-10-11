package iplant.repository;

import iplant.data.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Order, Long>{
//    Order findByBuyer(Long id);
}
