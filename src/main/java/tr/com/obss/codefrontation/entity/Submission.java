package tr.com.obss.codefrontation.entity;

import lombok.Data;
import tr.com.obss.codefrontation.enums.Language;
import tr.com.obss.codefrontation.enums.Result;
import tr.com.obss.codefrontation.enums.Status;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.net.URL;
import java.util.UUID;

@Data
@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue
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
