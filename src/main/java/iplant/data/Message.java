package iplant.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties({"messages", "password", "firstName", "lastName", "street", "city", "state", "zip"})
    private User author;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String content;

    @Column(nullable = true)
    private String pictureUrl;

    @Column(nullable = false)
    private LocalDate createdAt;

    @OneToMany( mappedBy = "message")
    @JsonIgnoreProperties({"message"})
    private Collection<Comment> comments;
}
