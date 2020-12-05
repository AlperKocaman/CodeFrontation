package tr.com.obss.codefrontation.dto.problem;

import lombok.Data;

@Data
public class ProblemTestCaseDto {
  private String input;
  private String output;
  private Double point;
}
