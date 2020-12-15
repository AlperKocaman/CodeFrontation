package tr.com.obss.codefrontation.dto;

import lombok.Data;

import java.util.List;

@Data
public class SonarRegisterDTO {

    private String id;
    private String programmingLanguage;
    private int numberOfSubmittedFile;
    private List<String> codes ;
    private List<String> fileNames;

}
