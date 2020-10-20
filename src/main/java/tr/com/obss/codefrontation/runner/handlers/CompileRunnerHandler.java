package tr.com.obss.codefrontation.runner.handlers;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

import tr.com.obss.codefrontation.entity.JavaTestEntity;
import tr.com.obss.codefrontation.utils.CommadLineExecutorUtils;

public class CompileRunnerHandler extends RunnerHandler {

	// TODO kaan.uyar : can be change, later!
	// FIXME kaan.uyar :Here change your local folder path {for me: khan}
	private static final String CODE_BINARY_PATH = "java_binary_folder";
	// TODO kaan.uyar : can provide dynamic naming!
	private static final String CODE_CLASS_NAME = "Solution.java";
	private static final String BINARY_CODE_CLASS_NAME = "Solution.class";

	public CompileRunnerHandler(RunnerHandler next) {
		super(next);
		try {
			if (!Paths.get(CODE_BINARY_PATH).toFile().exists()) {
				Path pp = Files.createDirectories(Paths.get(CODE_BINARY_PATH));
			}
		} catch (Exception e) {
			// TODO kaan.uyar: handle exception
			e.printStackTrace();
		}

	}

	// Expected only three parameters : code string and folder name and test Entity
	@Override
	public String[] handle(Object... objects) {
		if (objects.length < 2) {
			// TODO kaan.uyar : ERROR
			return null;
		}

		String codeString = (String) objects[0];
		String folderName = (String) objects[1];
		JavaTestEntity[] javaTestEntities = (JavaTestEntity[]) objects[2];
		try {
			if (!Paths.get(CODE_BINARY_PATH + "/" + folderName).toFile().exists()) {
				Files.createDirectories(Paths.get(CODE_BINARY_PATH + "/" + folderName));
			}
			File file = new File(CODE_BINARY_PATH + "/" + folderName + "/" + CODE_CLASS_NAME);
			try {
				FileWriter fw = new FileWriter(file.getAbsoluteFile());
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write(codeString);
				bw.close();
			} catch (IOException e) {
				e.printStackTrace();
				System.exit(-1);
			}

			Process p = CommadLineExecutorUtils.compileJavaProcess(CODE_BINARY_PATH + "/" + folderName,
					CODE_CLASS_NAME);
			// wait for the process to synchronize
			p.waitFor(1000, TimeUnit.MILLISECONDS);

			notifyOutputListeners(p.getInputStream(), p.getErrorStream());

			return this.next.handle(CODE_BINARY_PATH + "/" + folderName, javaTestEntities);

		} catch (IOException | InterruptedException e) {
			// TODO kaan.uyar : LOGGER
			e.printStackTrace();
		}
		return null;

	}

}
