package tr.com.obss.codefrontation.sonar;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SonarRestApiResponseMetrics {
	/* Complexity */
	private int complexity ; // cyclomatic complexity
	private int cognitive_complexity;

	/* Duplications */
	private int duplicatedBlocks;
	private int duplicatedFiles;
	private int duplicatedLines;
	private float duplicatedLinesDensity;

	/* Maintainability */
	private int codeSmells;
	private int maintainabilityDebt;

	/* Reliability */
	private int NumberofBugs;

}
