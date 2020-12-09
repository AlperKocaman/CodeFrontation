package tr.com.obss.codefrontation.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDTO {

    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private Boolean isAdmin;
    private String targetRole;
    private String targetProject;
    private String skills;

}
