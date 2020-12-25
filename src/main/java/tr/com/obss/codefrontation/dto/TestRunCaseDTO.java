package tr.com.obss.codefrontation.dto;

import lombok.Data;
import tr.com.obss.codefrontation.enums.Status;

import java.util.Date;
import java.util.UUID;

@Data
public class TestRunCaseDTO {

    private UUID id;

    private UUID testRunId;

    private String input;

    private String output;

    private Long position;

    private Double time;

    private Long memory;

    private Long point;

    private Long totalPoint;

    private Status status;

    private Date createdDate;

}
