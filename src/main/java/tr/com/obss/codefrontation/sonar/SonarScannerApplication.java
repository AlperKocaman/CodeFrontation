package tr.com.obss.codefrontation.sonar;

import lombok.*;
import org.sonarsource.scanner.cli.Main;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author Alper Kocaman
 */

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SonarScannerApplication {

	private String id;
	private String programmingLanguage;
	private int numberOfSubmittedFile;
	private List<String> codes = new ArrayList<>();
	private List<String> fileNames = new ArrayList<>();

	public void execute(){
		SonarScannerFileOperationsController sonarScannerFileOperationsController =
				new SonarScannerFileOperationsController(this);
		sonarScannerFileOperationsController.performFileOperations();
		String[] sonarParameters = constituteSonarParameters(sonarScannerFileOperationsController.getFolderPath());
		Main.main(sonarParameters);
//		SonarScannerRequestService.makeBulkRequests(getId());
	}

	private String[] constituteSonarParameters(String projectBaseDir) {
		String firstArg = String.format("-Dsonar.projectKey=%s",getId());
		String secondArg = String.format("-Dsonar.projectBaseDir=%s",projectBaseDir);
		// TODO : change below line
		List<String> additionalArgsConsideringLanguage = Arrays.asList("-Dsonar.java.binaries=target");
		List<String> sonarParameters = new ArrayList<>();
		sonarParameters.add(firstArg);
		sonarParameters.add(secondArg);
		sonarParameters.addAll(additionalArgsConsideringLanguage);
		return sonarParameters.toArray(new String[0]);
	}

}
