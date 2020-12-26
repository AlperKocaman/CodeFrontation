package tr.com.obss.codefrontation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import tr.com.obss.codefrontation.enums.Language;

import java.util.List;

@Data
@AllArgsConstructor
public class SonarRegisterDTO {

    private String id;
    private Language programmingLanguage;
    private int numberOfSubmittedFile;
    private List<String> codes ;
    private List<String> fileNames;

}
