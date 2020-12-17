package tr.com.obss.codefrontation.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ProblemDTO {

	// FIXME : difference between type and category?
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

}
