package tr.com.obss.codefrontation.dto;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class SubmissionCommentDTO {
    private UUID id;

    private UUID submissionId;

    private UUID commenterUserId;

    private String userName;

    private String problemName;

    private String targetRole;

    private String targetProject;

    private String commenterUserName;

    private String comment;

    private String rating;

    private Date createdDate;

    private Date updatedDate;

}
