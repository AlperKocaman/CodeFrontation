package tr.com.obss.codefrontation.dto;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class CommentDTO {
    private UUID id;

    private UUID submissionId;

    private UUID commenterUserId;

    private String username;

    private String problemName;

    private String targetRole;

    private String targetProject;

    private String commenterUserName;

    private String comment;

    private String rating;

    private Date createdDate;

    private Date updatedDate;

}
