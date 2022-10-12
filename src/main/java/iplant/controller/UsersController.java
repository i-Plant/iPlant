package iplant.controller;

import iplant.data.User;
import iplant.data.UserAuthInfoDTO;
import iplant.misc.FieldHelper;
import iplant.repository.UsersRepository;
import iplant.services.AuthBuddy;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/users", produces = "application/json")
public class UsersController {
    private AuthBuddy authBuddy;

    private UsersRepository usersRepository;
//    private PasswordEncoder passwordEncoder;

    @GetMapping("")
    public List<User> fetchUsers() {
      return usersRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> fetchUserById(@PathVariable long id) {
        Optional<User> user = usersRepository.findById(id);
        if(fetchUsers().isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User "+ id + "not found");
        }
        return user;
    }
    @GetMapping("/authinfo")
    private UserAuthInfoDTO getUserAuthInfo(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        User loggedInUser = authBuddy.getUserFromAuthHeaderJWT(authHeader);

        // use email to lookup the user's info
        UserAuthInfoDTO userDTO = new UserAuthInfoDTO();
        userDTO.setEmail(loggedInUser.getEmail());
    //    userDTO.setRole("");
        userDTO.setUserName(loggedInUser.getScreenName());
        userDTO.setProfilePic("");//how do I get the profile pic?

        return userDTO;
    }

    @GetMapping("/me")
    private User fetchMe(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        //using authBuddy to grab the info we need form the jwt about the user
        return authBuddy.getUserFromAuthHeaderJWT(authHeader);

//        String userName = user.getScreenName();
//        User user1 =  usersRepository.findByUsername(userName);
//        return Optional.of(user1);
//        return null;
    }

    private Optional<User> findUserById(long id) {
        // didn't find it so do something
        return usersRepository.findById(id);
    }

    @PostMapping("/create")
    public void createUser(@RequestBody User newUser) {


       String plainTextPassword = newUser.getPassword();
//       String encryptedPassword = passwordEncoder.encode(plainTextPassword);
       newUser.setPassword(plainTextPassword);

       newUser.setCreatedAt(LocalDate.now());
       usersRepository.save(newUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable long id) {
        usersRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateUser(@RequestBody User updatedUser, @PathVariable long id) {
        // get the original record from the db
        Optional<User> userOptional = usersRepository.findById(id);
        // return 404 if user not found
        if(userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id " + id + " not found");
        }
        // get the user from the optional so we no longer have to deal with the optional
        User originalUser = userOptional.get();

        // merge the changed data in updatedUser with originalUser
        BeanUtils.copyProperties(updatedUser, originalUser, FieldHelper.getNullPropertyNames(updatedUser));

        // originalUser now has the merged data (changes + original data)
        originalUser.setId(id);

        usersRepository.save(originalUser);
    }

    @PutMapping("/{id}/updatePassword")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @Valid @Size(min = 3) @RequestParam String newPassword) {
        User user = usersRepository.findById(id).get();
//        if(user == null) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id" + id + "not found");
//        }

        // compare old password with saved pw
        if(!user.getPassword().equals(oldPassword)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "amscray");
        }

        // validate new password
        if(newPassword.length() < 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NEW password too few characters");
        }

        user.setPassword(newPassword);
        usersRepository.save(user);
    }

}