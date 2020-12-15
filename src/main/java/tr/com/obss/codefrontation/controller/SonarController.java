package tr.com.obss.codefrontation.controller;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import tr.com.obss.codefrontation.dto.SonarRegisterDTO;
import tr.com.obss.codefrontation.sonar.SonarScannerApplication;
import tr.com.obss.codefrontation.sonar.SonarScannerRequestService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
public class SonarController {

    private RestTemplate restTemplate = new RestTemplate();

    @GetMapping(path = "/getSonarMetrics/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public HttpEntity getSonarMetrics(@PathVariable String projectId) {
        /**
         *  metricsOfProject contains 2 Json objects.
         *      First one is the metrics of project
         *      Second one is the issues(bugs/code smell/vulnerability) of the project.
         */
        List<JSONObject> metricsOfProject = SonarScannerRequestService.makeBulkRequests(projectId);
        System.out.println(metricsOfProject);
        return null;
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
