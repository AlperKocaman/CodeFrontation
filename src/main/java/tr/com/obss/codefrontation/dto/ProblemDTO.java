package tr.com.obss.codefrontation.dto;

import lombok.Data;
import tr.com.obss.codefrontation.enums.Category;
import tr.com.obss.codefrontation.enums.Level;

import java.util.UUID;

@Data
public class ProblemDTO {

	private UUID id;
	private String name;
	private String code;
	private String author;
	private Category category;
	private Level difficultyLevel;
	private String bestCode;
	private String inputs;
	private String inputSpecification;
	private String outputs;
	private String outputSpecification;
	private String description;
	private String sampleOutputs;
	private String sampleInputs;
	private String explanation;
	private String point;
	private long timeLimit;
	private long memoryLimit;
	private String allowedLanguages;

}
