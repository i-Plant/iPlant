package iplant.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties({"comments"})
    private Message message;

    @ManyToOne
    @JsonIgnoreProperties({"messages", "password", "firstName", "lastName", "street", "city", "state", "zip"})
    private User commentor;

    @NotNull
    @Column(nullable = false, unique = true, length = 100)
    private String content;

    @Column(nullable = false)
    private LocalDate createdAt;
}
