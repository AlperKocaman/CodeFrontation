
package tr.com.obss.codefrontation.sonar;

import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import tr.com.obss.codefrontation.service.SubmissionService;

import java.io.IOException;
import java.net.ConnectException;

@Slf4j
@Service
public class SonarScannerRequestService {

	SubmissionService submissionService;

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
	 * @return
	 */

	public static String getMetrics(String id){
		Request request = new Request.Builder()
				.url(SonarConstants.BACKEND_BASE_URL + SonarConstants.METRICS_REQUEST + id)
				.method("GET", null)
				.build();
		return sendRequestAndGetResponse(request);
	}

	public static String getGroupOfMetricsByUrl(String requestURL){
		Request request = new Request.Builder()
				.url(requestURL)
				.method("GET", null)
				.build();
		return sendRequestAndGetResponse(request);
	}

	private static String getMetricsUsedByPointCalculation(String id){
		Request request = new Request.Builder()
				.url(SonarConstants.BACKEND_BASE_URL + SonarConstants.METRICS_USED_IN_POINT_CALCULATION_REQUEST + id)
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
	private static String getIssues(String id){
		Request request = new Request.Builder()
				.url(SonarConstants.BACKEND_BASE_URL + SonarConstants.ISSUES_REQUEST + id)
				.method("GET", null)
				.build();
		return sendRequestAndGetResponse(request);
	}

	private static String sendRequestAndGetResponse(Request request) {
		try {
			Response response = client.newCall(request).execute();
			if (response.code() == 200) {
				return response.peekBody(2048).string();
			}
			log.warn("Response code is not HTTP.OK(200), Json object response is null!");
			return null;
		} catch (ConnectException e) {
			log.warn("HTTP Connection Error on request, Json object response is null!");
			return null;
		} catch (IOException e) {
			log.warn("IOException thrown, Json object response is null!");
			return null;
		}
	}

	public static double calculateSonarPointBySubmission(String id) throws JSONException {
		double sonarPoints = 0;
		double value = 0;
		String metrics = getMetricsUsedByPointCalculation(id);
		JSONObject metricsInJsonFormat = new JSONObject(metrics);
		JSONArray metricsArray = metricsInJsonFormat.getJSONObject("component").getJSONArray("measures");
		for(int i=0; i<metricsArray.length() ; i++) {
			value = metricsArray.getJSONObject(i).getDouble("value");
			switch (metricsArray.getJSONObject(i).getString("metric")){
				case "complexity":
					if(value<15){
						sonarPoints += 5;
					} else if(value > 99) {
					} else {
						sonarPoints += (100-(1.0/0.85)*(value-15))*0.05;
					}
					break;
				case "cognitive_complexity":
					if(value<15){
						sonarPoints += 5;
					} else if(value > 99) {
					} else {
						sonarPoints += (100-(1.0/0.85)*(value-15))*0.05;
					}
					break;
				case "duplicated_lines_density":
					if(value>15){
						sonarPoints += 0;
					} else {
						sonarPoints += 5.0-value*(1.0/3.0);
					}
					break;
				case "sqale_rating":
					sonarPoints += 7.2-1.2*value;
					break;
				case "reliability_rating":
					sonarPoints += 8.4-1.4*value;
					break;
				case "security_rating":
					sonarPoints += 1.25-0.25*value;
					break;
				case "comment_lines":
					if(value > 0){
						sonarPoints += 1;
					}
					break;
				default:
					sonarPoints +=0;
			}
		}
		return sonarPoints;
	}
}
