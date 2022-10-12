package iplant.repository;

import iplant.data.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByScreenName(User screenName);//not being used?
   // User findByProfilePic(User profilePic);//do I need this to find the profile pic?

}
