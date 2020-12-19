package tr.com.obss.codefrontation.sonar;

public enum ProgrammingLanguage {

	/* Compiled Languages */
	JAVA("java", SonarConstants.JAVA_COMPILE_COMMAND, SonarConstants.JAVA_PARAMETER),
	CPP("cpp", SonarConstants.CPP_COMPILE_COMMAND, SonarConstants.CPP_PARAMETER),
	C("c", SonarConstants.C_COMPILE_COMMAND, SonarConstants.C_PARAMETER),
	C_SHARP("cs", SonarConstants.C_SHARP_COMPILE_COMMAND, SonarConstants.C_SHARP_PARAMETER),
	GO("go", SonarConstants.GO_COMPILE_COMMAND, SonarConstants.GO_PARAMETER),
	HASKELL("hs", SonarConstants.HASKELL_COMPILE_COMMAND, SonarConstants.HASKELL_PARAMETER),
	SCALA("scala", SonarConstants.SCALA_COMPILE_COMMAND, SonarConstants.SCALA_PARAMETER),
	KOTLIN("kt", SonarConstants.KOTLIN_COMPILE_COMMAND, SonarConstants.KOTLIN_PARAMETER),
	SWIFT("swift", SonarConstants.SWIFT_COMPILE_COMMAND, SonarConstants.SWIFT_PARAMETER),
	OBJECTIVE_C("m", SonarConstants.OBJECTIVE_C_COMPILE_COMMAND, SonarConstants.OBJECTIVE_C_PARAMETER),

	/* Uncompiled Languages */
	PYTHON("py", null, SonarConstants.PYTHON_PARAMETER),
	JAVASCRIPT("js", null, SonarConstants.JAVASCRIPT_PARAMETER),
	TYPESCRIPT("ts", null, SonarConstants.TYPESCRIPT_PARAMETER),
	PHP("php", null, SonarConstants.PHP_PARAMETER),
	RUBY("rb", null, SonarConstants.RUBY_PARAMETER),
	HTML("html", null, SonarConstants.HTML_PARAMETER),
	CSS("css", null, SonarConstants.CSS_PARAMETER);

	private final String programmingLang; // programming language value should be given in the file extension form
	private final String compileCommand;
	private final String sonarParameter;

	ProgrammingLanguage(String programmingLang, String compileCommand, String sonarParameter) {
		this.programmingLang = programmingLang;
		this.compileCommand = compileCommand;
		this.sonarParameter = sonarParameter;
	}

	public String getProgrammingLang(){
		return this.programmingLang;
	}

	public String getCompileCommand(){
		return this.compileCommand;
	}

	public String getSonarParameter(){
		return this.sonarParameter;
	}

	public static String findCompileCommandByProgrammingLanguage(String programmingLang){
		for(ProgrammingLanguage programmingLanguage:ProgrammingLanguage.values()){
			if(programmingLanguage.getProgrammingLang().equals(programmingLang)){
				return programmingLanguage.getCompileCommand();
			}
		}
		return null;
	}

	public static String findSonarParameterByProgrammingLanguage(String sonarParameter){
		for(ProgrammingLanguage programmingLanguage:ProgrammingLanguage.values()){
			if(programmingLanguage.getProgrammingLang().equals(sonarParameter)){
				return programmingLanguage.getSonarParameter();
			}
		}
		return null;
	}
}
