package tr.com.obss.codefrontation.entity;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "assignments")
public class Assignments {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problems problemId;
}


