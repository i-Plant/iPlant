package iplant.repository;

<<<<<<< HEAD
import com.stripe.model.Review;
import iplant.data.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Review, Long> {
=======
import iplant.data.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Review, Long> {

>>>>>>> 749ca6f85681b1cc8badf446882ccd5753d1e312
}