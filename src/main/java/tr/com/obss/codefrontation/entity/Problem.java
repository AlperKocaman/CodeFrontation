package tr.com.obss.codefrontation.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data

@Entity
@Table(name = "problems")
public class Problem {

	// FIXME : difference between type and category?

	@Id
	@GeneratedValue
	private UUID id;
	private String name;
	private String code;
	private String creators;
	private String type;
	private String category;
	private int difficultyLevel;
	private String bestCode;
	private int point;
	private long timeLimit;
	private long memoryLimit;
	private String allowedLanguages;
	private Timestamp createdDate;  //FIXME time should be added in service or entity
	private Timestamp updatedDate;   //FIXME time should be added in service or entity



}
