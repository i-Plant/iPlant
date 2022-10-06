package iplant.controller;

import iplant.data.Review;
import iplant.data.User;
import iplant.repository.ReviewsRepository;
import iplant.repository.UsersRepository;
import lombok.AllArgsConstructor;
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
//       @PostMapping("")
//    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')");
//    public void createReview(@RequestBody Review newReview) {
//        if (newReview.getTitle() == null || newReview.getTitle().length() < 1) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title cannot be blank!");
//        }
//        if (newReview.getContent() == null || newReview.getContent().length() < 1) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be blank!");
//        }
//        User author = usersRepository.findByScreenName(screenName);
//        newReview.setAuthor(author);
//
//        reviewsRepository.save(newReview);
//    }
}