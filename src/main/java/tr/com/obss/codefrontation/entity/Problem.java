package tr.com.obss.codefrontation.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import tr.com.obss.codefrontation.enums.Category;
import tr.com.obss.codefrontation.enums.Level;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Data
@Getter
@Setter
@Entity
@Table(name = "problems")
public class Problem {

	@Id
	@GeneratedValue
	private UUID id;
	private String name;
	@Column(name="code", unique=true)
	private String code;
	private String author;
	private Category category;
	private Level difficultyLevel;
	private String bestCode;
	@Column(columnDefinition="TEXT")
	private String inputs;
	@Column(columnDefinition="TEXT")
	private String inputSpecification;
	@Column(columnDefinition="TEXT")
	private String outputs;
	@Column(columnDefinition="TEXT")
	private String outputSpecification;
	@Column(columnDefinition="TEXT")
	private String description;
	@Column(columnDefinition="TEXT")
	private String sampleInputs;
	@Column(columnDefinition="TEXT")
	private String sampleOutputs;
	@Column(columnDefinition="TEXT")
	private String explanation;
	private String point;
	private long timeLimit;
	private long memoryLimit;
	private String allowedLanguages;
	private Timestamp createdDate;
	private Timestamp updatedDate;

}
