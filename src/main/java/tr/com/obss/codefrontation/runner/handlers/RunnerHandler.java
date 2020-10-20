package tr.com.obss.codefrontation.runner.handlers;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import tr.com.obss.codefrontation.utils.CommadLineExecutorUtils;

public abstract class RunnerHandler {

	protected RunnerHandler next;

	private List<RunnerHandlerOutputListener> outputListeners = new ArrayList<RunnerHandlerOutputListener>();

	public RunnerHandler(RunnerHandler next) {
		super();
		this.next = next;
	}

	public void addOutputListener(RunnerHandlerOutputListener outputListener) {
		outputListeners.add(outputListener);
	}

	// returns results
	public abstract String[] handle(Object... objects);

	protected void notifyOutputListeners(String output, String error) {
		for (RunnerHandlerOutputListener outputListener : outputListeners) {
			if (error != null) {
				outputListener.handlerError(error);
			}
			if (output != null) {
				outputListener.handlerOutput(output);
			}
		}

	}

	protected void notifyOutputListeners(InputStream output, InputStream error) {
		try {
			String outputString = output != null ? CommadLineExecutorUtils.generateString(output) : null;
			String errorString = error != null ? CommadLineExecutorUtils.generateString(error) : null;
			notifyOutputListeners(outputString, errorString);
		} catch (IOException e) {
			// TODO kaan.uyar : add LOGGER!
			e.printStackTrace();
		}
	}

}
