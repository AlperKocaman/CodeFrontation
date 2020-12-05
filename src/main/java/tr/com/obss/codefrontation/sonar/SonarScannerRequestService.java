/*
package tr.com.obss.codefrontation.sonar;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.javatuples.Pair;
import com.squareup.okhttp.*;

import java.io.IOException;
import java.net.ConnectException;

@Slf4j
public class SonarScannerRequestService {

	*/
/**
	 * https://docs.sonarqube.org/latest/user-guide/metric-definitions/
	 *//*


	private static final ObjectMapper objectMapper = new ObjectMapper();
	private static final OkHttpClient client = new OkHttpClient();

	public static Pair<String, String> getBugs(String id){
		Request request = new Request.Builder()
				.url(SonarConstants.BACKEND_BASE_URL + "issues/search?componentKeys=" + id + "&types=BUG")
				.method("GET", null)
				.build();
		try {
			Response response = client.newCall(request).execute();
			if (response.code() == 200) {
				String responseBody = response.body().string();
				SonarRestApiResponseIssues mappedResponse = objectMapper.readValue(responseBody, SonarRestApiResponseIssues.class);
				if (mappedResponse.getResult().equals("success")) {
					return Pair.with(mappedResponse.getData().toString(), mappedResponse.getMessage());
				} else {
					log.warn("Request result is 'fail' on getBugs request");
					return Pair.with(null, mappedResponse.getMessage());
				}
			} else {
				log.warn("Got HTTP {} from getBugs request", response.code());
				String responseString = resolveHttpCodeResponse(response.code());
				return Pair.with(null, responseString);
			}
		} catch (ConnectException e) {
			log.warn("HTTP Connection Error on request");
			return Pair.with(null, SonarConstants.HTTP_CONN_ERROR);
		} catch (IOException e) {
			e.printStackTrace();
			return Pair.with(null, SonarConstants.CLIENT_ERROR);
		}

	}
	*/
/**
	 * 	Complexity
	 * 		Cyclomatic Complexity & Value
	 * 		Cognitive Complexity & Value & BestValue (?)
	 *
	 * 		measures/component?metricKeys=complexity,cognitive_complexity&component={id}
	 *//*


	*/
/**
	 * 	Duplications
	 * 		Duplicated Blocks
	 * 		Duplicated Files
	 * 		Duplicated Lines
	 * 		Duplicated Lines Density
	 *
	 * 		measures/component?metricKeys=duplicated_blocks,duplicated_files,duplicated_lines,duplicated_lines_density&component={id}
	 *//*


	*/
/**
	 * 	Maintainability
	 * 		Code Smells(code_smells) -> Total count of Code Smell issues
	 * 		Technical Debt (sqale_index) -> Effort to fix all Code Smells. The measure is stored in minutes in the database.
	 *
	 * 		measures/component?metricKeys=code_smells,sqale_index&component={id}
	 *//*


	*/
/**
	 * 	Reliability
	 * 		Bugs (bugs) -> Number of bug issues.
	 * 		Reliability Rating (reliability_rating) ->
	 * 			A = 0 Bugs
	 * 			B = at least 1 Minor Bug
	 * 			C = at least 1 Major Bug
 * 				D = at least 1 Critical Bug
	 * 			E = at least 1 Blocker Bug
	 * 		Reliability remediation effort (reliability_remediation_effort) -> Effort to fix all bug issues.
	 * 			The measure is stored in minutes in the DB.
	 *
	 *	 	measures/component?metricKeys=bugs,reliability_rating,reliability_remediation_effort&component={id}
	 *//*


	*/
/**
	 * 	Security
	 * 		Vulnerabilities (vulnerabilities) -> Number of vulnerability issues.
	 * 		Security Rating (security_rating)
	 * 			A = 0 Vulnerabilities
	 * 			B = at least 1 Minor Vulnerability
	 * 			C = at least 1 Major Vulnerability
	 * 			D = at least 1 Critical Vulnerability
	 * 			E = at least 1 Blocker Vulnerability
	 * 		Security remediation effort (security_remediation_effort) ->
	 * 			Effort to fix all vulnerability issues. The measure is stored in minutes in the DB.
	 * 		Security Hotspots (security_hotspots) -> Number of Security Hotspots
	 * 		Security Review Rating (security_review_rating) ->
	 * 			The Security Review Rating is a letter grade based on the percentage of Reviewed (Fixed or Safe) Security Hotspots.
	 * 				A = >= 80%
	 * 				B = >= 70% and <80%
	 * 				C = >= 50% and <70%
	 * 				D = >= 30% and <50%
	 * 				E = < 30%
	 *
	 * 		measures/component?metricKeys=vulnerabilities,security_rating,security_remediation_effort,security_hotspots,security_review_rating&component=={id}
	 *//*


	*/
/**
	 * 	Size
	 * 		Comment lines (comment_lines) -> Number of lines containing either comment or commented-out code.
	 * 		Comments (%) (comment_lines_density)
	 * 		Lines of code (ncloc)
	 * 		Functions (functions) -> Number of functions.
	 *
	 * 		measures/component?metricKeys=comment_lines,comment_lines_density,ncloc,functions&component={id}
	 *//*


	*/
/**
	 *
	 *
	 * @param httpCode
	 * @return
	 *//*


	public static String resolveHttpCodeResponse(Integer httpCode) {
		switch (httpCode) {
			case 400:
				return SonarConstants.HTTP_400;
			case 401:
				return SonarConstants.HTTP_401;
			case 404:
				return SonarConstants.HTTP_404;
			case 500:
				return SonarConstants.HTTP_500;
			default: {
				log.warn("Got {} HTTP code after a request", httpCode);
				return "Something went wrong - " + httpCode;
			}
		}
	}


	public static void makeBulkRequests(String id) {
		getBugs(id);
	}
}
*/
