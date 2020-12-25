package tr.com.obss.codefrontation.dto;

import lombok.Data;
import tr.com.obss.codefrontation.enums.Language;
import tr.com.obss.codefrontation.enums.Result;
import tr.com.obss.codefrontation.enums.Status;

import java.net.URL;
import java.util.Date;
import java.util.UUID;

@Data
public class TestRunDTO {

    private UUID id;

    //private AssignmentDTO assignment;

    private UUID assignmentId;

    private String problemCode;
//
    private String username;

    private Double time;

    private Long memory;

    private Long point;

    private String body;

    private Language language;

    private Status status;

    private Result result;

    private URL sonarUrl;

    private String name; //FIXME kaldırılabilir gereksiz

    private Date createdDate;

    private Date updatedDate;

}
