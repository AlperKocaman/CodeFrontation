package tr.com.obss.codefrontation.runner;

import org.springframework.stereotype.Component;

import tr.com.obss.codefrontation.entity.JavaTestEntity;
import tr.com.obss.codefrontation.runner.handlers.CompileRunnerHandler;
import tr.com.obss.codefrontation.runner.handlers.RunnerHandler;
import tr.com.obss.codefrontation.runner.handlers.RunnerHandlerOutputListener;
import tr.com.obss.codefrontation.runner.handlers.TestRunnerHandler;

@Component
public class JavaCodeRunnerHandlerClient implements RunnerHandlerOutputListener {

	private RunnerHandler handlerFirst;

	public JavaCodeRunnerHandlerClient() {
		super();
		TestRunnerHandler testHandler = new TestRunnerHandler(null);
		testHandler.addOutputListener(this);
		CompileRunnerHandler compileHandler = new CompileRunnerHandler(testHandler);
		compileHandler.addOutputListener(this);
		this.handlerFirst = compileHandler;
	}

	// Code id is also folder name
	public String[] handleCode(String codeString, String codeId, JavaTestEntity[] testEntities) {
		return handlerFirst.handle(codeString, codeId, testEntities);
	}

	@Override
	public void handlerError(String error) {
		// FIXME + TODO kaan.uyar : Handle
//		System.out.println(error);
	}

	@Override
	public void handlerOutput(String output) {
		// FIXME + TODO kaan.uyar : Handle
//		System.out.println(output);

	}

}
