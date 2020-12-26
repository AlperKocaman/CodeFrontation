package tr.com.obss.codefrontation.sonar;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
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
		SonarUtils.runProcess(constituteSonarParameters(sonarScannerFileOperationsController.getFolderPath()));
		log.info("Sonar scanner completed its operation");
	}

	private String constituteSonarParameters(String projectBaseDir) {
		StringBuilder sonarParametersBuilder = new StringBuilder();
		sonarParametersBuilder.append(SonarConstants.SONAR_SCANNER_PATH);
		sonarParametersBuilder.append(String.format(SonarConstants.SONAR_PROJECT_KEY_PARAMETER, getId()));
		sonarParametersBuilder.append(String.format(SonarConstants.SONAR_PROJECT_BASE_DIRECTORY_PARAMETER, projectBaseDir));
		sonarParametersBuilder.append(ProgrammingLanguage.findSonarParameterByProgrammingLanguage(getProgrammingLanguage()));
		return sonarParametersBuilder.toString();
	}

}
