package tr.com.obss.codefrontation.entity;

import lombok.Data;
import tr.com.obss.codefrontation.enums.Status;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "testruncase")
public class TestRunCase {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "testrun_id")
    private TestRun testRun;

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

