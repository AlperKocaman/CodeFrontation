package tr.com.obss.codefrontation.runner.handlers;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import tr.com.obss.codefrontation.entity.JavaTestEntity;
import tr.com.obss.codefrontation.utils.CommadLineExecutorUtils;

public class TestRunnerHandler extends RunnerHandler {

	public TestRunnerHandler(RunnerHandler next) {
		super(next);
	}

	// two parameters : file folder path and testEntity
	@Override
	public String[] handle(Object... objects) {
		String folderName = (String) objects[0];
		JavaTestEntity[] testEntities = (JavaTestEntity[]) objects[1];
		try {
			String[] results = new String[testEntities.length];
			for (int i = 0; i < testEntities.length; i++) {
				// FIXME + TODO kaan.uyar: must loop add for testing
				Process p = CommadLineExecutorUtils.executeJavaClassMethod(folderName, testEntities[i]);
				// wait for the process to synchronize
				p.waitFor(1000, TimeUnit.MILLISECONDS);
				results[i] = CommadLineExecutorUtils.generateString(p.getInputStream());
				notifyOutputListeners(p.getInputStream(), p.getErrorStream());
			}

			return results;
		} catch (IOException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
