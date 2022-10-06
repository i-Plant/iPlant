package iplant.repository;
import iplant.data.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Review, Long> {
}