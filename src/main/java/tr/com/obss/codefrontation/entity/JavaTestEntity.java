package tr.com.obss.codefrontation.entity;

import java.util.Arrays;
import java.util.List;

//TODO kaan.uyar : expected result will be added
public class JavaTestEntity {

	private String methodName;
	private List<Class<?>> parameterTypes;
	private List<Object> params;

	public JavaTestEntity(String methodName, Class<?>... parameterTypes) {
		super();
		this.methodName = methodName;
		this.parameterTypes = Arrays.asList(parameterTypes);
	}

	public String getMethodName() {
		return methodName;
	}

	public List<Class<?>> getParameterTypes() {
		return parameterTypes;
	}

	public List<Object> getParams() {
		return params;
	}

	public void setParams(Object... params) {
		this.params = Arrays.asList(params);
	}

}
