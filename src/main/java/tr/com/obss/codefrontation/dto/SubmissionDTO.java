package tr.com.obss.codefrontation.dto;

import lombok.Data;
import tr.com.obss.codefrontation.enums.Language;
import tr.com.obss.codefrontation.enums.Result;
import tr.com.obss.codefrontation.enums.Status;

import java.net.URL;
import java.util.UUID;

@Data
public class SubmissionDTO {
    private UUID id;
    private String problemCode;
    private String name;
    private String candidate;
    private Language language;
    private String time;
    private String memory;
    private Integer points;
    private Status status;
    private Result result;
    private URL sonarUrl;
}
