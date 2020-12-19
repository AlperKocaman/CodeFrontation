package tr.com.obss.codefrontation.dto;

import lombok.Data;
import tr.com.obss.codefrontation.entity.Assignments;
import tr.com.obss.codefrontation.enums.Language;
import tr.com.obss.codefrontation.enums.Result;
import tr.com.obss.codefrontation.enums.Status;

import java.net.URL;
import java.util.Date;
import java.util.UUID;

@Data
public class  SubmissionDTO {

    private UUID id;

    private Assignments assignmentId;

    private Double time;

    private Double memory;

    private Integer point;

    private String body;

    private Language language;

    private Status status;

    private Result result;

    private URL sonarUrl;

    private String name;

    private Date createdDate;

    private Date updatedDate;

}
