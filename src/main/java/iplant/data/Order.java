package iplant.data;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    @JsonIgnoreProperties({"reviews", "orders", "password", "createdAt", "email", "firstName", "lastName", "street", "city", "state", "zipCode"})
    private User buyer;

    @Column(nullable = false)
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    @Column(nullable = false)
    @JsonIgnoreProperties({"order"})
    private Collection<OrderProduct> products;
}
