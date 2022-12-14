package iplant.repository;

import iplant.data.Order;
import iplant.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Order, Long>{
    @Query(value = "select * from orders where status = 'Active'", nativeQuery = true)
    List<Order> fetchActiveOrders();

}
