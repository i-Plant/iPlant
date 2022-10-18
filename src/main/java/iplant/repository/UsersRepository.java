package iplant.repository;

import iplant.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface UsersRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByScreenName(User screenName);//not being used?

    @Query(value = "select * from users where status = 'Active'", nativeQuery = true)
    List<User> fetchActiveUsers();

}
