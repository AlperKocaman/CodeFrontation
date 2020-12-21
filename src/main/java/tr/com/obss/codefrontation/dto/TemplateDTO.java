package tr.com.obss.codefrontation.dto;

import java.util.UUID;


import lombok.Data;

@Data
public class TemplateDTO {
    private UUID id;

    private String author;
    private String name;
    private String definition;
    
    private RoleDTO role;

}
