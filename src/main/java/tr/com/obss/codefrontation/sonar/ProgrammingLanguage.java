package tr.com.obss.codefrontation.sonar;

public enum ProgrammingLanguage {
	JAVA("java", SonarConstants.JAVA_COMPILE_COMMAND),
	CPP("Cpp", SonarConstants.CPP_COMPILE_COMMAND),
	C("C", SonarConstants.C_COMPILE_COMMAND),
	C_SHARP("C#", SonarConstants.C_SHARP_COMPILE_COMMAND),
	GO("Go", SonarConstants.GO_COMPILE_COMMAND),
	HASKELL("Haskell", SonarConstants.HASKELL_COMPILE_COMMAND),
	SCALA("Scala", SonarConstants.SCALA_COMPILE_COMMAND),
	KOTLIN("Kotlin", SonarConstants.KOTLIN_COMPILE_COMMAND);

	private final String programmingLang;
	private final String compileCommand;

	ProgrammingLanguage(String programmingLang, String compileCommand) {
		this.programmingLang = programmingLang;
		this.compileCommand = compileCommand;
	}

	public String getProgrammingLang(){
		return this.programmingLang;
	}

	public String getCompileCommand(){
		return this.compileCommand;
	}

	public static String findCompileCommandByProgrammingLanguage(String programmingLang){
		for(ProgrammingLanguage programmingLanguage:ProgrammingLanguage.values()){
			if(programmingLanguage.getProgrammingLang().equals(programmingLang)){
				return programmingLanguage.getCompileCommand();
			}
		}
		return null;
	}
}
