package tr.com.obss.codefrontation.dto;

import java.util.Set;
import java.util.UUID;


import lombok.Data;

@Data
public class TemplateDTO {
    private UUID id;

    private UserDTO author;
    private String authorName;
    private UUID authorId;
    private String name;
    private String definition;
    
    private RoleDTO role;
    
    private Set<UUID> problemIds;
    private Set<ProblemDTO> templateProblems;

}
