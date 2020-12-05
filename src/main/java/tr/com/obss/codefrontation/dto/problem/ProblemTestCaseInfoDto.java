package tr.com.obss.codefrontation.dto.problem;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProblemTestCaseInfoDto {
	private String in;
	private String out;
	private Double points;
}
