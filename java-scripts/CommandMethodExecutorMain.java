import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.function.Function;

public class CommandMethodExecutorMain {
	// TODO kaan.uyar : can be dynamic later!
	private static final String CLASS_NAME = "Solution";

	private static HashMap<Class<?>, Function<String, ?>> parser = new HashMap<>();
	static {
		parser.put(boolean.class, Boolean::parseBoolean);
		parser.put(int.class, Integer::parseInt);
		parser.put(long.class, Long::parseLong);
		parser.put(Boolean.class, Boolean::valueOf);
		parser.put(Integer.class, Integer::valueOf);
		parser.put(Long.class, Long::valueOf);
		parser.put(Double.class, Double::valueOf);
		parser.put(Float.class, Float::valueOf);
		parser.put(String.class, String::valueOf);
		parser.put(BigDecimal.class, BigDecimal::new);
		parser.put(BigInteger.class, BigInteger::new);
		parser.put(LocalDate.class, LocalDate::parse);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private static Object parse(String argString, Class param) {
		Function<String, ?> func = parser.get(param);
		if (func != null)
			return func.apply(argString);
		if (param.isEnum())
			return Enum.valueOf(param, argString);
		throw new UnsupportedOperationException("Cannot parse string to " + param.getName());
	}

	private static HashMap<String, Class<?>> type = new HashMap<>();
	static {
		type.put("boolean", boolean.class);
		type.put("int", int.class);
		type.put("long", long.class);
		type.put("java.lang.Boolean", Boolean.class);
		type.put("java.lang.Integer", Integer.class);
		type.put("java.lang.Long", Long.class);
		type.put("java.lang.Double", Double.class);
		type.put("java.lang.Float", Float.class);
		type.put("java.math.BigDecimal", String.class);
		type.put("java.lang.String", BigDecimal.class);
		type.put("java.math.BigInteger", BigInteger.class);
		type.put("java.time.LocalDate", LocalDate.class);
	}

	private Class<?> type(String typeName) {
		return type.get(typeName);
	}

	public static void main(String[] args) {
		if (args.length < 1) {
			System.err.println("USAGE:java CommandMethodExecutorMain methodName [parameterType parameter]*");
			System.exit(-1);
		}
		String methodName = args[0];

		List<Class<?>> paramTypes = new ArrayList<>();
		List<Object> params = new ArrayList<>();

		for (int i = 1; i < args.length; i++) {
			if (i % 2 == 1) {
				paramTypes.add(type.get(args[i]));
			} else {
				params.add(parse(args[i], paramTypes.get(paramTypes.size() - 1)));
			}
		}

		if (paramTypes.size() != params.size()) {
			System.err.println("method types and params size not equal. ");
			System.exit(-1);
		}

		try {

//			For URL based class loader @see URLClassLoader
			ClassLoader classLoader = CommandMethodExecutorMain.class.getClassLoader();
			Class<?> aClass = classLoader.loadClass(CLASS_NAME);
			@SuppressWarnings("unchecked")
			Object obj = aClass.getConstructor().newInstance();
			@SuppressWarnings("unchecked")
			Method method = aClass.getMethod(methodName, paramTypes.toArray(new Class<?>[] {}));
			Object result = method.invoke(obj, params.toArray());
			if (result != null) {
				System.out.println(result.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
