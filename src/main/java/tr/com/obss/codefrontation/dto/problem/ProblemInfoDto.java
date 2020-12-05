package tr.com.obss.codefrontation.dto.problem;

import java.util.List;

import lombok.Data;

@Data
public class ProblemInfoDto {
	private String archive;
	private List<ProblemTestCaseInfoDto> test_cases;
}
