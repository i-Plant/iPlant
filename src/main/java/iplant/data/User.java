package iplant.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(nullable = false, unique = true, length = 40)
    private String screenName;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable = false, length = 100)
    private String lastName;

    @Email
    @NotEmpty
    @Column(nullable = false, length = 100)
    private String email;

    @Column()
    private String street;

    @Column()
    private String city;

    @Column(length = 20)
    private String state;

    @Column(length = 5)
    private Integer zipCode;

    @ToString.Exclude
    @Column(nullable = false, length = 100)
    private String password;

    @Column()
    private LocalDate createdAt;
<<<<<<< HEAD
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column
    private UserRole role;
    @OneToMany(mappedBy = "author")
    @JsonIgnoreProperties("author")
    private Collection<Review>reviews;
=======

    @OneToMany(mappedBy = "author")
    @JsonIgnoreProperties("author")
    private Collection<Review> reviews;

>>>>>>> 749ca6f85681b1cc8badf446882ccd5753d1e312
}
