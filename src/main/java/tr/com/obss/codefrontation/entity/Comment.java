package tr.com.obss.codefrontation.entity;

import java.util.Date;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "comment_submission")
public class Comment {

  @Id
  @GeneratedValue
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "submission_id")
  private Submission submission;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User commenter;

  private String comment;

  private Integer rating;

  private Date createdDate;

  private Date updatedDate;
}
