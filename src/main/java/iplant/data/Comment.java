package iplant.data;

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
    private Message message;

    @ManyToOne
    private User commentor;

    @NotNull
    @Column(nullable = false, unique = true, length = 100)
    private String content;

    @Column(nullable = false)
    private LocalDate createdAt;
}
