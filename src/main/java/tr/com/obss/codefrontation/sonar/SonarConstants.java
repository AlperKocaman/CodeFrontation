package tr.com.obss.codefrontation.sonar;

public class SonarConstants {

	public static final String BACKEND_BASE_URL = "http://localhost:9000/api/";

	public static final String CLIENT_ERROR = "Something went wrong on client";
	public static final String HTTP_400 = "Request failed - BAD REQUEST";
	public static final String HTTP_401 = "Invalid username or password - UNAUTHORIZED";
	public static final String HTTP_404 = "Requested data is not found on the game server.";
	public static final String HTTP_CONN_ERROR = "Seems like you can't access the SonarQube server.\nPlease check your internet connection and try again.";
	public static final String HTTP_500 = "Something went wrong on server";

	public static final String JAVA_COMPILE_COMMAND = "javac ./%s/*.java\n " +
			"mkdir ./%s/target\n" +
			"mv ./%s/*.class ./%s/target";

	public static final String CPP_COMPILE_COMMAND = "";
	public static final String C_COMPILE_COMMAND = "";
	public static final String C_SHARP_COMPILE_COMMAND = "";
	public static final String GO_COMPILE_COMMAND = "";
	public static final String HASKELL_COMPILE_COMMAND = "";
	public static final String SCALA_COMPILE_COMMAND = "";
	public static final String KOTLIN_COMPILE_COMMAND = "";
	// public static final String SWIFT_COMPILE_COMMAND = "";
	// public static final String OBJECTIVE_C_COMPILE_COMMAND = "";
}
