package iplant.repository;

import iplant.data.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
User findByscreenName(String screenName);
//User findByEmail(String email);
}
