package tr.com.obss.codefrontation.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

import lombok.extern.slf4j.Slf4j;
import tr.com.obss.codefrontation.dto.problem.ProblemEveluationDto;
import tr.com.obss.codefrontation.dto.problem.ProblemInfoDto;
import tr.com.obss.codefrontation.dto.problem.ProblemTestCaseDto;
import tr.com.obss.codefrontation.dto.problem.ProblemTestCaseInfoDto;

@Slf4j
@Service
public class ProblemService {

	// TODO kaan.uyar : will be read from .yml later
	private static final String USER_NAME = System.getProperty("user.name");
	// for Linux systems
	private static final String PROBLEM_DIRECTORY = "/home/" + USER_NAME + "/sync/problems";

	private static final Path PROBLEMS_PATH = Paths.get(PROBLEM_DIRECTORY);

	public ProblemService() {

		boolean isDirectoryCreated = PROBLEMS_PATH.toFile().isDirectory();
		if (!isDirectoryCreated) {
			try {
				Files.createDirectory(PROBLEMS_PATH);
			} catch (IOException e) {
				log.error(e.getLocalizedMessage(), e);
			}
		}
	}

	public void createNewProblem(ProblemEveluationDto problemEvaluation) {
		try {
			Path problemDir = PROBLEMS_PATH.resolve(problemEvaluation.getName());
			if (!problemDir.toFile().isDirectory()) {
				Files.createDirectory(problemDir);
			}
			String zipName = problemEvaluation.getName() + ".zip";
			File zipFile = problemDir.resolve(zipName).toFile();
			FileOutputStream fos = new FileOutputStream(zipFile);
			ZipOutputStream zipOut = new ZipOutputStream(fos);

			ProblemInfoDto problemInfo = new ProblemInfoDto();
			problemInfo.setArchive(zipName);
			List<ProblemTestCaseInfoDto> testCaseInfos = new ArrayList<>();

			List<ProblemTestCaseDto> testCases = problemEvaluation.getTestCases();
			for (int i = 0; i < testCases.size(); i++) {
				ProblemTestCaseDto testCase = testCases.get(i);
				if (testCase.getInput() == null || testCase.getOutput() == null) {
					log.warn("Test case's input or output is null, check this!!!");
					continue;
				}
				Path inputTempFilePath = Files.createTempFile(null, null);
				Path outputTempFilePath = Files.createTempFile(null, null);
				Files.write(inputTempFilePath, testCase.getInput().getBytes(StandardCharsets.UTF_8));
				Files.write(outputTempFilePath, testCase.getOutput().getBytes(StandardCharsets.UTF_8));

				String inName = problemEvaluation.getName() + "." + (i + 1) + ".in";
				String outName = problemEvaluation.getName() + "." + (i + 1) + ".out";
				addFileIntoZipFile(zipOut, inputTempFilePath, inName);
				addFileIntoZipFile(zipOut, outputTempFilePath, outName);

				testCaseInfos.add(new ProblemTestCaseInfoDto(inName, outName, testCase.getPoint()));

				Files.delete(inputTempFilePath);
				Files.delete(outputTempFilePath);
			}
			zipOut.close();
			fos.close();

			problemInfo.setTest_cases(testCaseInfos);

			creatYmlFile(problemDir, problemInfo);

		} catch (IOException e) {
			log.error(e.getLocalizedMessage(), e);
		}
	}

	private void addFileIntoZipFile(ZipOutputStream zipOut, Path filePath, String zipFileName) throws IOException {
		FileInputStream fis = new FileInputStream(filePath.toFile());
		ZipEntry zipEntry = new ZipEntry(zipFileName);
		zipOut.putNextEntry(zipEntry);

		byte[] bytes = new byte[1024];
		int length;
		while ((length = fis.read(bytes)) >= 0) {
			zipOut.write(bytes, 0, length);
		}
		fis.close();
	}

	private void creatYmlFile(Path problemDir, ProblemInfoDto problemInfo)
			throws JsonGenerationException, JsonMappingException, IOException {
		Path ymlFile = problemDir.resolve("init.yml");
		ObjectMapper om = new ObjectMapper(new YAMLFactory());
		om.writeValue(ymlFile.toFile(), problemInfo);
	}

}
