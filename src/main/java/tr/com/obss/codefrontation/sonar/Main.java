package tr.com.obss.codefrontation.sonar;

import java.util.ArrayList;
import java.util.List;

public class Main {
	/**
	 * This method is the starting point of the Sonar analyzing process
	 * @param args
	 * args[0] = Id of the candidate
	 * args[1] = Used programming language by the candidate
	 * args[2] = # of submitted files
	 * args[3,4,...n] = Submitted code by the candidate for each file
	 * args[n+1, n+2, ...] = name of the files
	 */

	public static void main(String args[]){
		String id = args[0];
		String programmingLanguage = args[1];
		int numberOfFiles = Integer.valueOf(args[2]);
		List<String> codes = new ArrayList<>();
		List<String> fileNames = new ArrayList<>();
		for(int i=0; i<numberOfFiles ; ++i){
			codes.add(args[i+3]);
			fileNames.add(args[i+numberOfFiles+3]);
		}
		SonarScannerApplication sonarScannerApplication = SonarScannerApplication.builder()
				.id(id)
				.programmingLanguage(programmingLanguage)
				.numberOfSubmittedFile(numberOfFiles)
				.codes(codes)
				.fileNames(fileNames)
				.build();

		sonarScannerApplication.execute();
	}
}
