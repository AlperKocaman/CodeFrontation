package tr.com.obss.codefrontation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.SubmissionDTO;
import tr.com.obss.codefrontation.entity.Assignment;
import tr.com.obss.codefrontation.entity.Submission;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.repository.SubmissionRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceProperty;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SubmissionService {
    private final Mapper mapper;
    private final SubmissionRepository repository;
    @PersistenceContext(properties = {@PersistenceProperty(name = "hibernate.max_fetch_depth", value = "1"), @PersistenceProperty(name = "hibernate.enable_lazy_load_no_trans", value = "true")})
    public EntityManager entityManager;

    public List<SubmissionDTO> getAllSubmissions() {
        List<Submission> submissionList = repository.findAll();
        log.info("Submission list retrieved: {}", submissionList.toString());
        return mapper.toSubmissionDTOList(submissionList);
    }

    public SubmissionDTO addSubmission(SubmissionDTO submissionDTO) {
        Submission submission = mapper.toSubmissionEntity(submissionDTO);
        submission.setAssignment(entityManager.getReference(Assignment.class, submissionDTO.getAssignmentId()));
        Submission entity = repository.save(submission);
        log.info("Submission created: {}", entity.toString());

        return mapper.toSubmissionDTO(entity);
    }

    public SubmissionDTO updateSubmission(SubmissionDTO submissionDTO) throws Exception{
        Submission origEntity = repository.findById(submissionDTO.getId()).orElseThrow(Exception::new);
        mapper.updateSubmissionEntity(submissionDTO, origEntity);
        Submission entity = repository.save(origEntity);
        log.info("Submission updated: {}", origEntity.getId());

        return mapper.toSubmissionDTO(entity);
    }
}
