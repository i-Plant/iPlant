package iplant.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true, length = 100)
    private String userName;

    private String firstName;

    private String lastName;

    @Email
    @NotEmpty
    @Column(nullable = false, length = 100)
    private String email;

    private String street;

    private String city;

    private String state;

    private Integer zipCode;

    @ToString.Exclude
    @Column(nullable = false, length = 100)
    private String password;

    @Column()
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column
    private UserRole role;

//    @OneToMany(mappedBy = "author")
//    @JsonIgnoreProperties("author")
//    private Collection<Post> posts;

}
