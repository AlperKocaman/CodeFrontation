package tr.com.obss.codefrontation.sonar;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author Alper Kocaman
 */
public class SonarScannerFileOperationsController {
	/**
	 * This class is the responsible class for the file operations which are:
	 * 		saving string version of code to a file,
	 * 		compile *.{$programming_language} file,
	 * 		create the target folder and move compiled files to it.
	 */
	private static final Logger LOGGER = Logger.getLogger( SonarScannerFileOperationsController.class.getName() );

	private SonarScannerApplication sonarScannerApplication;

	private final String folderPath;

	public SonarScannerFileOperationsController(SonarScannerApplication sonarScannerApplication) {
		this.sonarScannerApplication = sonarScannerApplication;
		folderPath = System.getProperty("user.dir") + "/Submissions/" + sonarScannerApplication.getId();
	}

	public String getFolderPath(){
		return this.folderPath;
	}

	public void performFileOperations(){
		createFolder();
		createCodeFiles();
		compileCodeFiles();
	}

	/**
	 * Creates folder in the specified path
	 * @return if folder can be created at specified path return true, else return false.
	 */
	public void createFolder(){
		try {
			Path path = Paths.get(folderPath);
			Files.createDirectories(path);
		}
		catch (IOException ioException){
			LOGGER.log(Level.SEVERE, String.format("Directory cannot be created at path %s", folderPath));
		}
	}

	public void createCodeFiles(){
		FileWriter fileWriter = null;
		List<String> codes = sonarScannerApplication.getCodes();
		List<String> fileNames = sonarScannerApplication.getFileNames();
		for(int i=0 ; i<sonarScannerApplication.getNumberOfSubmittedFile() ; ++i){
			try {
				fileWriter = new FileWriter(folderPath + "/" + fileNames.get(i) + "."+ sonarScannerApplication.getProgrammingLanguage());
				fileWriter.write(codes.get(i));
				fileWriter.close();
			} catch (IOException ioException) {
				LOGGER.log(Level.SEVERE, String.format("File with name %s cannot be created at path %s",
						fileNames.get(i), folderPath));
			}
		}
	}

	public void compileCodeFiles(){
		String compileCommand =
				ProgrammingLanguage.findCompileCommandByProgrammingLanguage(sonarScannerApplication.getProgrammingLanguage());
		if(compileCommand != null){
			SonarUtils.runProcess(String.format(compileCommand, folderPath));

		}
	}
}
