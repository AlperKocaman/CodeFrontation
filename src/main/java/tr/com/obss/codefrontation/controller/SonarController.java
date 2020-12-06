package tr.com.obss.codefrontation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import tr.com.obss.codefrontation.dto.SonarRegisterDTO;
import tr.com.obss.codefrontation.sonar.SonarScannerApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
public class SonarController {

    private RestTemplate restTemplate = new RestTemplate();

    @GetMapping(path = "/getSonarMetrics/{projectName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public HttpEntity getSonarMetrics(@PathVariable String projectName) {
        String url = "http://localhost:9000/api/measures/component";
        List<String> metrics = new ArrayList<String>(
                Arrays.asList( "complexity","cognitive_complexity")
        );
        metrics.toString();
//        http://localhost:8080/getSonarMetrics/deneme
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(url);
        uriComponentsBuilder.queryParam("metricKeys", metrics);
        uriComponentsBuilder.queryParam("component", projectName);
        UriComponents uriComponent = uriComponentsBuilder.build();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");

        HttpEntity<String> response = restTemplate.exchange(uriComponent.toUriString(), HttpMethod.GET, new HttpEntity(headers), String.class);
        System.out.println(response);
        return response;
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
