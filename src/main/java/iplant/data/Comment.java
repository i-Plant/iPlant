//package iplant.data;
//
//import lombok.*;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotNull;
//import java.time.LocalDate;
//import java.util.Date;
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@ToString
//@Entity
//@Table(name="comment")
//public class Comment {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private Long postId;
//    @ManyToOne
//    @JoinColumn (name = "users_id")
//    private Long userId;
//    @NotNull
//    @Column(nullable = false, unique = true, length = 100)
//    private String content;
//    @Column()
//    private LocalDate createdAt;
//}
