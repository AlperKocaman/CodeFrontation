package tr.com.obss.codefrontation.enums;

public enum Language {
    JAVA(1),
    PYTHON(2),
    JAVASCRIPT(3),
    C(4),
    RUBY(5),
    PY3(6);

    private int value;

    Language(int value) {
        this.value = value;
    }
}
