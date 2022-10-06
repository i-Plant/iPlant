package iplant.repository;

import com.stripe.model.Review;
import iplant.data.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Review, Long> {
}