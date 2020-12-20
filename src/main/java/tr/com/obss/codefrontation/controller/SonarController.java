package tr.com.obss.codefrontation.controller;

import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import tr.com.obss.codefrontation.dto.SonarRegisterDTO;
import tr.com.obss.codefrontation.sonar.SonarScannerApplication;
import tr.com.obss.codefrontation.sonar.SonarScannerRequestService;

import java.util.List;

@RestController
public class SonarController {

    /**
     *  metricsOfProject contains 2 Json objects.
     *      First one is the metrics of project
     *      Second one is the issues(bugs/code smell/vulnerability) of the project.
     */
    @GetMapping(path = "/getSonarMetrics/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<JSONObject> getSonarMetrics(@PathVariable String projectId) {
        return SonarScannerRequestService.makeBulkRequests(projectId);
    }

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
