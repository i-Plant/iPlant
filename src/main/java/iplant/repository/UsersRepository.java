package iplant.repository;

import iplant.data.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersRepository extends JpaRepository<User, Long> {
User findByScreenName(User screenName);

}
