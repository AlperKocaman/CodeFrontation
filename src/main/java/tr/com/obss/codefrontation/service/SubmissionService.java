package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.SubmissionDTO;
import tr.com.obss.codefrontation.dto.TestCaseDTO;
import tr.com.obss.codefrontation.entity.Assignment;
import tr.com.obss.codefrontation.entity.Submission;
import tr.com.obss.codefrontation.enums.Status;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.repository.AssignmentRepository;
import tr.com.obss.codefrontation.repository.SubmissionRepository;
import tr.com.obss.codefrontation.sonar.SonarScannerRequestService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceProperty;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class SubmissionService {

    private final Mapper mapper;
    private final SubmissionRepository submissionRepository;
    @PersistenceContext(properties = {@PersistenceProperty(name = "hibernate.max_fetch_depth", value = "1"), @PersistenceProperty(name = "hibernate.enable_lazy_load_no_trans", value = "true")})
    public EntityManager entityManager;
    private final UserService userService;
    private final AssignmentRepository assignmentRepository;
    private final TestCaseService testCaseService;

    public List<SubmissionDTO> getAllSubmissions() {
        List<Submission> submissionList = submissionRepository.findAll();
        log.info("Submission list retrieved: {}", submissionList.toString());
        return mapper.toSubmissionDTOList(submissionList);
    }

    public List<SubmissionDTO> getSubmissionsByUsername(String username) {
        return mapper.toSubmissionDTOList(submissionRepository.findAllSubmissionsByUsername(username));
    }

    public List<SubmissionDTO> getSubmissionsByUsernameAndProblemCode(String username, String problemCode) {
        return mapper.toSubmissionDTOList(
                submissionRepository.findAllSubmissionsByUsernameAndProblemCode(username, problemCode));
    }


    public SubmissionDTO addSubmission(SubmissionDTO submissionDTO) throws Exception {
        Submission submission = mapper.toSubmissionEntity(submissionDTO);
        Optional<Assignment> assignment = assignmentRepository.getAssignmentByUsernameAndProblemCode(submissionDTO.getUsername(),
                submissionDTO.getProblemCode());
        if(!assignment.isPresent()){
            throw new Exception();
        }
        submission.setAssignment(assignment.get());
        Submission entity = submissionRepository.save(submission);
        log.info("Submission created: {}", entity.toString());

        return mapper.toSubmissionDTO(entity);
    }

    public SubmissionDTO updateSubmission(SubmissionDTO submissionDTO) throws Exception {
        Submission origEntity = submissionRepository.findById(submissionDTO.getId()).orElseThrow(Exception::new);
        mapper.updateSubmissionEntity(submissionDTO, origEntity);
        Submission entity = submissionRepository.save(origEntity);
        log.info("Submission updated: {}", origEntity.getId());

        return mapper.toSubmissionDTO(entity);
    }

    public SubmissionDTO updateSubmissionPointWithSonarData(SubmissionDTO submissionDTO) throws Exception {
        Submission origEntity = submissionRepository.findById(submissionDTO.getId()).orElseThrow(Exception::new);
        double sonarPoints = SonarScannerRequestService.calculateSonarPointBySubmission(submissionDTO.getUsername()+ "-" + submissionDTO.getProblemCode());
        double testCasePoints = 0;
        List<TestCaseDTO> testCases = testCaseService.getTestCasesBySubmissionId(submissionDTO.getId());
        if(testCases != null && !testCases.isEmpty()){
            for(TestCaseDTO testCaseDTO:testCases){
                if(testCaseDTO.getStatus() == Status.COMPLETED){
                    testCasePoints +=  testCaseDTO.getPoint();
                }
            }
        }
        submissionDTO.setPoint((long) (sonarPoints+testCasePoints));
        submissionDTO.setSonarUrl(submissionDTO.getSonarUrl());
        mapper.updateSubmissionEntity(submissionDTO, origEntity);
        Submission entity = submissionRepository.save(origEntity);
        log.info("Submission updated: {}", origEntity.getId());

        return mapper.toSubmissionDTO(entity);
    }
}
