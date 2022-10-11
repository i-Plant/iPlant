package iplant.data;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserAuthInfoDTO {
    private Long id;
    private String userName;
    private String email;
    private String role;
    private String profilePic;
}
