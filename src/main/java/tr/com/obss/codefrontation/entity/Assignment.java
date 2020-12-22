package tr.com.obss.codefrontation.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Entity
@Table(name = "assignments")
public class Assignment {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problem problemId;
}


