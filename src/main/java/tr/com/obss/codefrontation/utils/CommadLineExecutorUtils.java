package tr.com.obss.codefrontation.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import tr.com.obss.codefrontation.entity.JavaTestEntity;

public final class CommadLineExecutorUtils {
	private static final String JAVA_COMMAD_LINE_EXECUTOR_PATH = "java-scripts";

	public static Process executeJavaClassMethod(String testeePath, JavaTestEntity testEntity) throws IOException {
		List<String> commadParamsList = new ArrayList<String>();
		commadParamsList.add("java");
		commadParamsList.add("-cp");
		commadParamsList.add(JAVA_COMMAD_LINE_EXECUTOR_PATH + ":" + testeePath);
		commadParamsList.add("CommandMethodExecutorMain");
		commadParamsList.add(testEntity.getMethodName());
		for (int i = 0; i < testEntity.getParameterTypes().size(); i++) {
			commadParamsList.add(testEntity.getParameterTypes().get(i).getName());
			commadParamsList.add(testEntity.getParams().get(i).toString());
		}

		ProcessBuilder pCompile = new ProcessBuilder();
		pCompile.command(commadParamsList);
		return pCompile.start();
	}

	// TODO kaan.uyar : check java name must be ended with .java
	public static Process compileJavaProcess(String javaFilePath, String javaName) throws IOException {
		ProcessBuilder pb = new ProcessBuilder("javac", javaFilePath + "/" + javaName);
		return pb.start();
	}

	// TODO kaan.uyar : Location can be changed!
	public static String generateString(InputStream is) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		String line;
		StringBuilder sb = new StringBuilder();
		while ((line = br.readLine()) != null)
			sb.append(line);
		return sb.toString();
	}

}
