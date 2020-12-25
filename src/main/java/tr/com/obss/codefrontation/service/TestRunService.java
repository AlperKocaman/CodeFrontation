package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.TestRunDTO;
import tr.com.obss.codefrontation.entity.Assignment;
import tr.com.obss.codefrontation.entity.TestRun;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.repository.TestRunRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceProperty;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TestRunService {
    private final Mapper mapper;
    private final TestRunRepository repository;
    @PersistenceContext(properties = {@PersistenceProperty(name = "hibernate.max_fetch_depth", value = "1"), @PersistenceProperty(name = "hibernate.enable_lazy_load_no_trans", value = "true")})
    public EntityManager entityManager;

    public List<TestRunDTO> getAllTestRuns() {
        List<TestRun> testRunList = repository.findAll();
        log.info("TestRun list retrieved: {}", testRunList.toString());
        return mapper.toTestRunDTOList(testRunList);
    }

    public TestRunDTO addTestRun(TestRunDTO testRunDTO) {
        TestRun testRun = mapper.toTestRunEntity(testRunDTO);
        testRun.setAssignment(entityManager.getReference(Assignment.class, testRunDTO.getAssignmentId()));
        TestRun entity = repository.save(testRun);
        log.info("TestRun created: {}", entity.toString());

        return mapper.toTestRunDTO(entity);
    }

    public TestRunDTO updateTestRun(TestRunDTO testRunDTO) throws Exception{
        TestRun origEntity = repository.findById(testRunDTO.getId()).orElseThrow(Exception::new);
        mapper.updateTestRunEntity(testRunDTO, origEntity);
        TestRun entity = repository.save(origEntity);
        log.info("TestRun updated: {}", origEntity.getId());

        return mapper.toTestRunDTO(entity);
    }
}
