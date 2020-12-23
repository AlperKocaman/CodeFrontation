package tr.com.obss.codefrontation.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class AssignmentDTO {

    private UUID id;

    private UserDTO user;

    private ProblemDTO problem;

}
