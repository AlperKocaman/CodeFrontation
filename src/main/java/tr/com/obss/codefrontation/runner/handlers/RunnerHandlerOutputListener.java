package tr.com.obss.codefrontation.runner.handlers;

public interface RunnerHandlerOutputListener {

	void handlerError(String error);

	void handlerOutput(String output);

}
