package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.TestCaseDTO;
import tr.com.obss.codefrontation.entity.Submission;
import tr.com.obss.codefrontation.entity.TestCase;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.repository.TestCaseRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceProperty;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class TestCaseService {
    private final Mapper mapper;
    private final TestCaseRepository repository;
    @PersistenceContext(properties = {@PersistenceProperty(name = "hibernate.max_fetch_depth", value = "1"), @PersistenceProperty(name = "hibernate.enable_lazy_load_no_trans", value = "true")})
    public EntityManager entityManager;

    public List<TestCaseDTO> getAllTestCases() {
        List<TestCase> testCaseList = repository.findAll();
        log.info("TestCase list retrieved: {}", testCaseList.toString());
        return mapper.toTestCaseDTOList(testCaseList);
    }

    public TestCaseDTO addTestCase(TestCaseDTO testCaseDTO) {
        TestCase testCase = mapper.toTestCaseEntity(testCaseDTO);
        testCase.setSubmission(entityManager.getReference(Submission.class, testCaseDTO.getSubmissionId()));
        TestCase entity = repository.save(testCase);
        log.info("TestCase created: {}", entity.getId());

        return mapper.toTestCaseDTO(entity);
    }

    public List<TestCaseDTO> getTestCasesBySubmissionId(UUID submissionId) {
        List<TestCase> testCaseList = repository.findTestCaseBySubmissionId(submissionId);
        log.info("TestCase list retrieved: {}", testCaseList.toString());
        return mapper.toTestCaseDTOList(testCaseList);
    }

}
