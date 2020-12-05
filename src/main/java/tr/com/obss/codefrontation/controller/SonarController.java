package tr.com.obss.codefrontation.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tr.com.obss.codefrontation.dto.SonarRegisterDTO;
import tr.com.obss.codefrontation.sonar.SonarScannerApplication;

@RestController
public class SonarController {

  /*  @GetMapping(path = "/getSonarMetrics", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getSonarMetrics() {
        return null;
    }

    */

    @PostMapping(path = "/registerSonar", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity registerSonar(@RequestBody SonarRegisterDTO sonarRegisterDTO) {
        SonarScannerApplication sonarScannerApplication = SonarScannerApplication.builder()
                .id(sonarRegisterDTO.getId())
                .programmingLanguage(sonarRegisterDTO.getProgrammingLanguage())
                .numberOfSubmittedFile(sonarRegisterDTO.getNumberOfSubmittedFile())
                .codes(sonarRegisterDTO.getCodes())
                .fileNames(sonarRegisterDTO.getFileNames())
                .build();
        sonarScannerApplication.execute();
        return null;
    }
}
