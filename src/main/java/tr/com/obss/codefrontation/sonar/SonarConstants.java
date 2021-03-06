package tr.com.obss.codefrontation.sonar;

public class SonarConstants {

	// TODO: Change this line according to the sonar scanner path before execution
	public static final String SONAR_SCANNER_PATH = "/home/alper269707/sonar-scanner-4.5.0.2216-linux/bin/sonar-scanner ";
	public static final String SONAR_PROJECT_KEY_PARAMETER = "-Dsonar.projectKey=%s ";
	public static final String SONAR_PROJECT_BASE_DIRECTORY_PARAMETER = "-Dsonar.projectBaseDir=%s ";

	public static final String BACKEND_BASE_URL = "http://localhost:9000/api/";

	public static final String METRICS_REQUEST = "measures/component?metricKeys=" +
			"complexity,cognitive_complexity," + // complexity metrics
			"duplicated_blocks,duplicated_files,duplicated_lines,duplicated_lines_density," + // duplication metrics
			"code_smells,sqale_index," + // maintainability metrics
			"bugs,reliability_rating,reliability_remediation_effort," + // reliability metrics
			"vulnerabilities,security_rating,security_remediation_effort,security_hotspots,security_review_rating," + // security metrics
			"comment_lines,comment_lines_density,ncloc,functions" + // size metrics
			"&component=";

	public static final String ISSUES_REQUEST = "issues/search?facets=types&componentKeys=";

	public static final String JAVA_COMPILE_COMMAND =  "cd %s/ && javac *.java && mkdir target && mv *.class target && cd ../../" ;

	// TODO : if any lang support will be added and this language is compiled, its compile command should be added here.
	public static final String CPP_COMPILE_COMMAND = "";
	public static final String C_COMPILE_COMMAND = "";
	public static final String C_SHARP_COMPILE_COMMAND = "";
	public static final String GO_COMPILE_COMMAND = "";
	public static final String HASKELL_COMPILE_COMMAND = "";
	public static final String SCALA_COMPILE_COMMAND = "";
	public static final String KOTLIN_COMPILE_COMMAND = "";
	public static final String SWIFT_COMPILE_COMMAND = "";
	public static final String OBJECTIVE_C_COMPILE_COMMAND = "";

	public static final String JAVA_PARAMETER = "-Dsonar.java.binaries=target";
	public static final String CPP_PARAMETER = "";
	public static final String C_PARAMETER = "";
	public static final String C_SHARP_PARAMETER = "";
	public static final String GO_PARAMETER = "";
	public static final String HASKELL_PARAMETER = "";
	public static final String SCALA_PARAMETER = "";
	public static final String KOTLIN_PARAMETER = "";
	public static final String SWIFT_PARAMETER = "";
	public static final String OBJECTIVE_C_PARAMETER = "";
	public static final String PYTHON_PARAMETER = "-Dsonar.sources=.";
	public static final String JAVASCRIPT_PARAMETER = "";
	public static final String TYPESCRIPT_PARAMETER = "";
	public static final String PHP_PARAMETER = "";
	public static final String RUBY_PARAMETER = "";
	public static final String HTML_PARAMETER = "";
	public static final String CSS_PARAMETER = "";
}
