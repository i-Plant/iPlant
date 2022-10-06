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
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties({"messages", "password", "createdAt", "screenName"})
    private User Buyer;

    @Column(nullable = false)
    private LocalDate createdAt;

    @OneToMany(mappedBy = "order")
    private Collection<OrderProduct> products;
}
