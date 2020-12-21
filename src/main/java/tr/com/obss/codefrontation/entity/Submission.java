package tr.com.obss.codefrontation.entity;

import lombok.Data;
import tr.com.obss.codefrontation.enums.Language;
import tr.com.obss.codefrontation.enums.Result;
import tr.com.obss.codefrontation.enums.Status;

import javax.persistence.*;
import java.net.URL;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    private Double time;

    private Long memory;

    private Long point;

    private String body;

    private Language language;

    private Status status;

    private Result result;

    private URL sonarUrl;

    private String name;//FIXME kaldırılabilir gereksiz

    private Date createdDate;

    private Date updatedDate;

}

