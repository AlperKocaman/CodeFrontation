package tr.com.obss.codefrontation.sonar;

import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Slf4j
public class SonarUtils {
	protected static void runProcess(String command) {
		try {
//			Process process = Runtime.getRuntime().exec(command);
			Process process = Runtime.getRuntime().exec(new String[]{ "/bin/bash", "-c", command});

			printLines(command + " stdout:", process.getInputStream());
			printLines(command + " stderr:", process.getErrorStream());
			process.waitFor();
		} catch (InterruptedException interruptedException) {
			interruptedException.printStackTrace();
			Thread.currentThread().interrupt();
		} catch (IOException ioException) {
			ioException.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.info(String.format("The command %s is applied.", command));
	}

	private static void printLines(String cmd, InputStream ins) throws Exception {
		String line = null;
		BufferedReader in = new BufferedReader(
				new InputStreamReader(ins));
		while ((line = in.readLine()) != null) {
			System.out.println(line);
		}
	}
}
