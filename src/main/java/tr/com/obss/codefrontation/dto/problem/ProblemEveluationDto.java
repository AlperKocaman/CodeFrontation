package tr.com.obss.codefrontation.dto.problem;

import java.util.List;

import lombok.Data;

@Data
public class ProblemEveluationDto {
	private String name;
	private List<ProblemTestCaseDto> testCases;
}
