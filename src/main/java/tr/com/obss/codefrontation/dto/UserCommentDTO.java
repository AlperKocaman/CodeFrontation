package tr.com.obss.codefrontation.dto;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class UserCommentDTO {

    private UUID id;

    private String commenterUserName;

    private String userName;

    private String comment;

    private String rating;

    private Date createdDate;

    private Date updatedDate;

}
