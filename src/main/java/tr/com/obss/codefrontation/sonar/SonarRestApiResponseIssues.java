package tr.com.obss.codefrontation.sonar;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SonarRestApiResponseIssues {
	private Object data;
	private String message;
	private String result;
}
