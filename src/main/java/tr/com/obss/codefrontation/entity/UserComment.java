package tr.com.obss.codefrontation.entity;

import java.util.Date;
import java.util.UUID;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class UserComment {

  @Id
  @GeneratedValue
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User commentedCandidate;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User commenter;

  private String comment;

  private String rating;

  private Date createdDate;

  private Date updatedDate;
}
