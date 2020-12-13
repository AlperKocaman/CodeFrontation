
package tr.com.obss.codefrontation.sonar;

import lombok.extern.slf4j.Slf4j;
import com.squareup.okhttp.*;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.ConnectException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class SonarScannerRequestService {

	// if we need to map Json responses to POJO object,  we need this object mapper(currently we don't need it).
	// private static final ObjectMapper objectMapper = new ObjectMapper();
	private static final OkHttpClient client = new OkHttpClient();

	/**
	 * The following link has the metrics&definitions. All the necessary fields were written to below JavaDoc comment.
	 * https://docs.sonarqube.org/latest/user-guide/metric-definitions/
	 */

	/**
	 * 	METRICS & DEFINITONS - When getMetrics method is callled, it returns the following fields in Json format.
	 *
	 * 	Complexity
	 * 		Cyclomatic Complexity & Value
	 * 		Cognitive Complexity & Value & BestValue (?)
	 *
	 * 		measures/component?metricKeys=complexity,cognitive_complexity&component={id}

	 * 	Duplications
	 * 		Duplicated Blocks
	 * 		Duplicated Files
	 * 		Duplicated Lines
	 * 		Duplicated Lines Density
	 *
	 * 		measures/component?metricKeys=duplicated_blocks,duplicated_files,duplicated_lines,duplicated_lines_density&component={id}

	 * 	Maintainability
	 * 		Code Smells(code_smells) -> Total count of Code Smell issues
	 * 		Technical Debt (sqale_index) -> Effort to fix all Code Smells. The measure is stored in minutes in the database.
	 *
	 * 		measures/component?metricKeys=code_smells,sqale_index&component={id}

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

	 * 	Size
	 * 		Comment lines (comment_lines) -> Number of lines containing either comment or commented-out code.
	 * 		Comments (%) (comment_lines_density)
	 * 		Lines of code (ncloc)
	 * 		Functions (functions) -> Number of functions.
	 *
	 * 		measures/component?metricKeys=comment_lines,comment_lines_density,ncloc,functions&component={id}
	 */

	private static JSONObject getMetrics(String id){
		Request request = new Request.Builder()
				.url(SonarConstants.BACKEND_BASE_URL + SonarConstants.METRICS_REQUEST + id)
				.method("GET", null)
				.build();
		return sendRequestAndGetResponse(request);
	}

	/**
	 * This method will get the results about:
	 * 		How many bugs/code smell/vulnerability does the project have and where are them?
	 * 		Bugs/code smell/vulnerability severity & why this is bug/code smell/vulnerability?
	 *
	 * @param id
	 * @return response in JSON Format
	 */
	private static JSONObject getIssues(String id){
		Request request = new Request.Builder()
				.url(SonarConstants.BACKEND_BASE_URL + SonarConstants.ISSUES_REQUEST + id)
				.method("GET", null)
				.build();
		return sendRequestAndGetResponse(request);
	}

	private static JSONObject sendRequestAndGetResponse(Request request) {
		try {
			Response response = client.newCall(request).execute();
			if (response.code() == 200) {
				return new JSONObject(response.body().string());
			}
			log.warn("Response code is not HTTP.OK(200), Json object response is null!");
			return null;
		} catch (ConnectException e) {
			log.warn("HTTP Connection Error on request, Json object response is null!");
			return null;
		} catch (IOException e) {
			log.warn("IOException thrown, Json object response is null!");
			return null;
		} catch (JSONException e) {
			log.warn("JSON Exception thrown, Json object cannot be created from response!");
			return null;
		}
	}

	public static List<JSONObject> makeBulkRequests(String id) {
		List<JSONObject> jsonResponses = new ArrayList<>();
		jsonResponses.add(getMetrics(id));
		jsonResponses.add(getIssues(id));
		return jsonResponses;
	}
}
