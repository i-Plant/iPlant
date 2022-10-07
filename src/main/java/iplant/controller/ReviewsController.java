package iplant.controller;


import iplant.data.Order;
import iplant.data.Review;
import iplant.data.User;
import iplant.misc.FieldHelper;
import iplant.repository.ReviewsRepository;
import iplant.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/reviews", produces = "application/json")
public class ReviewsController {
    private ReviewsRepository reviewsRepository;
    private UsersRepository usersRepository;
    @GetMapping("")
    public List<Review> fetchPosts() {
        return reviewsRepository.findAll();
    }
    @GetMapping("/{id}")
    public Optional<Review> fetchReviewById(@PathVariable long id){
        Optional<Review> optionalReview = reviewsRepository.findById(id);
        if(optionalReview.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review id" + id + "not found");
        }
        return optionalReview;
    }






    @PostMapping("create")
    public void createReview(@RequestBody Review newReview) {
        if (newReview.getContent() == null || newReview.getContent().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be blank!");
        }
//        Long id = usersRepository
//        Optional<User> author = usersRepository.findById(id);
//        newReview.setAuthor(author);

        reviewsRepository.save(newReview);
    }
    @DeleteMapping("/{id}")
    public void deleteReviewById(@PathVariable long id) {
        reviewsRepository.deleteById(id);
        // what to do if we find it
        Optional<Review> optionalReview = reviewsRepository.findById(id);
        if (optionalReview.isPresent()) {
            throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED,"Review was not deleted");
        }
        // grab the original post from the optional and check the logged in user
//        Review originalReview = optionalReview.get();

        // admin can delete anyone's post. author of the post can delete only their posts
//        if(loggedInUser.getRole() != UserRole.ADMIN && originalPost.getAuthor().getId() != loggedInUser.getId()) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not your post!");
//        }


    }
    @PutMapping("/{id}")
    public void updateReview(@RequestBody Review updatedReview, @PathVariable long id) {
        Optional<Review> optionalReview = reviewsRepository.findById(id);
        if(optionalReview.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post "+ id + " not found");
        }

//        if(loggedInUser.getRole() != UserRole.ADMIN && originalPost.get().getAuthor().getId() != loggedInUser.getId()) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not your post!");
//        }
        Review originalReview = optionalReview.get();
        updatedReview.setId(id);

        BeanUtils.copyProperties(updatedReview, originalReview, FieldHelper.getNullPropertyNames(updatedReview));

        reviewsRepository.save(originalReview);
    }

}
