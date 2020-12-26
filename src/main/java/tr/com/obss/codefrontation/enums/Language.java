package tr.com.obss.codefrontation.enums;

public enum Language {
    JAVA8(1, "java"),
    PYTHON(2, "py"),
    JAVASCRIPT(3, "js"),
    C(4, "c"),
    RUBY(5, "rb"),
    PY3(6, "py");

    private int value;
    private String extension;

    Language(int value, String extension) {
        this.value = value;
        this.extension = extension;
    }

    public String getExtension(){
        return this.extension;
    }
}
