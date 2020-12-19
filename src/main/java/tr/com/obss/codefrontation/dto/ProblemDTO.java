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
	private int point;
	private long timeLimit;
	private long memoryLimit;
	private String allowedLanguages;

}
