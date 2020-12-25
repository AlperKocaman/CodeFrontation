package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.TestCaseDTO;
import tr.com.obss.codefrontation.dto.TestRunCaseDTO;
import tr.com.obss.codefrontation.entity.Submission;
import tr.com.obss.codefrontation.entity.TestCase;
import tr.com.obss.codefrontation.entity.TestRun;
import tr.com.obss.codefrontation.entity.TestRunCase;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.repository.TestCaseRepository;
import tr.com.obss.codefrontation.repository.TestRunCaseRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceProperty;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class TestRunCaseService {
    private final Mapper mapper;
    private final TestRunCaseRepository repository;
    @PersistenceContext(properties = {@PersistenceProperty(name = "hibernate.max_fetch_depth", value = "1"), @PersistenceProperty(name = "hibernate.enable_lazy_load_no_trans", value = "true")})
    public EntityManager entityManager;

    public List<TestRunCaseDTO> getAllTestRunCases() {
        List<TestRunCase> testRunCaseList = repository.findAll();
        log.info("TestRunCase list retrieved: {}", testRunCaseList.toString());
        return mapper.toTestRunCaseDTOList(testRunCaseList);
    }

    public TestRunCaseDTO addTestRunCase(TestRunCaseDTO testRunCaseDTO) {
        TestRunCase testRunCase = mapper.toTestRunCaseEntity(testRunCaseDTO);
        testRunCase.setTestRun(entityManager.getReference(TestRun.class, testRunCaseDTO.getTestRunId()));
        TestRunCase entity = repository.save(testRunCase);
        log.info("TestRunCase created: {}", entity.getId());

        return mapper.toTestRunCaseDTO(entity);
    }

    public List<TestRunCaseDTO> getTestRunCasesByTestRunId(UUID submissionId) {
        List<TestRunCase> testRunCaseList = repository.findTestRunCaseByTestRunId(submissionId);
        log.info("TestRunCase list retrieved: {}", testRunCaseList.toString());
        return mapper.toTestRunCaseDTOList(testRunCaseList);
    }

}
