package iplant.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
<<<<<<< HEAD

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
=======
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
>>>>>>> 749ca6f85681b1cc8badf446882ccd5753d1e312
@ToString
@Entity
@Table(name="reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 1024)
    private String content;

    @ManyToOne
<<<<<<< HEAD
    @JsonIgnoreProperties({"reviews", "password"})
    private User author;
=======
    @JsonIgnoreProperties({"messages", "password", "firstName", "lastName", "street", "city", "state", "zip"})
    private User author;

    @Column(nullable = false)
    private LocalDate createdAt;

>>>>>>> 749ca6f85681b1cc8badf446882ccd5753d1e312
}
