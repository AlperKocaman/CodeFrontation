package tr.com.obss.codefrontation.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.UUID;
import java.sql.Timestamp;

@Data

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue
    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private Boolean isAdmin;
    private String targetRole;
    private String targetProject;
    private String skills;
    private Timestamp createdDate;  //FIXME time should be added in service or entity
    private Timestamp updatedDate;   //FIXME time should be added in service or entity

}