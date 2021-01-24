package tr.com.obss.codefrontation.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.codefrontation.dto.SonarRegisterDTO;
import tr.com.obss.codefrontation.sonar.SonarConstants;
import tr.com.obss.codefrontation.sonar.SonarScannerApplication;
import tr.com.obss.codefrontation.sonar.SonarScannerRequestService;

@RestController
public class SonarController {

    /**
     *  metricsOfProject contains 2 Json objects.
     *      First one is the metrics of project
     *      Second one is the issues(bugs/code smell/vulnerability) of the project.
     * @return
     */

    @GetMapping(path = "/getSonarMetrics/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getSonarMetrics(@PathVariable String projectId) {
        return SonarScannerRequestService.getMetrics(projectId);
    }

    @GetMapping(path = "/getSonarComplexityMetrics/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getSonarComplexityMetrics(@PathVariable String projectId) {
        String requestURL = SonarConstants.BACKEND_BASE_URL + SonarConstants.FIRST_URL_PARAMETER + SonarConstants.COMPLEXITY_METRICS
                + SonarConstants.LAST_URL_PARAMETER + projectId;
        return SonarScannerRequestService.getGroupOfMetricsByUrl(requestURL);
    }

    @GetMapping(path = "/getSonarDuplicationMetrics/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getSonarDuplicationMetrics(@PathVariable String projectId) {
        String requestURL = SonarConstants.BACKEND_BASE_URL + SonarConstants.FIRST_URL_PARAMETER + SonarConstants.DUPLICATION_METRICS
                + SonarConstants.LAST_URL_PARAMETER + projectId;
        return SonarScannerRequestService.getGroupOfMetricsByUrl(requestURL);
    }

    @GetMapping(path = "/getSonarMaintainabilityMetrics/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getSonarMaintainabilityMetrics(@PathVariable String projectId) {
        String requestURL = SonarConstants.BACKEND_BASE_URL + SonarConstants.FIRST_URL_PARAMETER + SonarConstants.MAINTAINABILITY_METRICS
                + SonarConstants.LAST_URL_PARAMETER + projectId;
        return SonarScannerRequestService.getGroupOfMetricsByUrl(requestURL);
    }

    @GetMapping(path = "/getSonarReliabilityMetrics/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getSonarReliabilityMetrics(@PathVariable String projectId) {
        String requestURL = SonarConstants.BACKEND_BASE_URL + SonarConstants.FIRST_URL_PARAMETER + SonarConstants.RELIABILITY_METRICS
                + SonarConstants.LAST_URL_PARAMETER + projectId;
        return SonarScannerRequestService.getGroupOfMetricsByUrl(requestURL);
    }

    @GetMapping(path = "/getSonarSecurityMetrics/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getSonarSecurityMetrics(@PathVariable String projectId) {
        String requestURL = SonarConstants.BACKEND_BASE_URL + SonarConstants.FIRST_URL_PARAMETER + SonarConstants.SECURITY_METRICS
                + SonarConstants.LAST_URL_PARAMETER + projectId;
        return SonarScannerRequestService.getGroupOfMetricsByUrl(requestURL);
    }

    @GetMapping(path = "/getSonarSizeMetrics/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getSonarSizeMetrics(@PathVariable String projectId) {
        String requestURL = SonarConstants.BACKEND_BASE_URL + SonarConstants.FIRST_URL_PARAMETER + SonarConstants.SIZE_METRICS
                + SonarConstants.LAST_URL_PARAMETER + projectId;
        return SonarScannerRequestService.getGroupOfMetricsByUrl(requestURL);
    }

    @PostMapping(path = "/registerSonar", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity registerSonar(@RequestBody SonarRegisterDTO sonarRegisterDTO) {
        SonarScannerApplication sonarScannerApplication = SonarScannerApplication.builder()
                .id(sonarRegisterDTO.getId())
                .programmingLanguage(sonarRegisterDTO.getProgrammingLanguage().getExtension())
                .numberOfSubmittedFile(sonarRegisterDTO.getNumberOfSubmittedFile())
                .codes(sonarRegisterDTO.getCodes())
                .fileNames(sonarRegisterDTO.getFileNames())
                .build();
        sonarScannerApplication.execute();
        return null;
    }
}
