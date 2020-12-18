package tr.com.obss.codefrontation.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.UUID;

@Data

@Entity
@Table(name = "problems")
public class Problem {


	@Id
	@GeneratedValue
	private UUID id;
	private String name;
	private String code;
	private String author;
	private String type;
	private String category;
	private int difficultyLevel;
	private String bestCode;
	private int point;
	private long timeLimit;
	private long memoryLimit;
	private String allowedLanguages;
	private Timestamp createdDate;
	private Timestamp updatedDate;

}
