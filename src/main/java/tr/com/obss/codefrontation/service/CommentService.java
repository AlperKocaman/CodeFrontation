package tr.com.obss.codefrontation.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.SubmissionCommentDTO;
import tr.com.obss.codefrontation.dto.SubmissionDTO;
import tr.com.obss.codefrontation.entity.Assignment;
import tr.com.obss.codefrontation.entity.Submission;
import tr.com.obss.codefrontation.entity.SubmissionComment;
import tr.com.obss.codefrontation.entity.User;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.repository.SubmissionCommentRepository;
import tr.com.obss.codefrontation.repository.SubmissionRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentService {
    private final Mapper mapper;
    private final SubmissionCommentRepository repository;
    @PersistenceContext(properties = {@PersistenceProperty(name = "hibernate.max_fetch_depth", value = "1"), @PersistenceProperty(name = "hibernate.enable_lazy_load_no_trans", value = "true")})
    public EntityManager entityManager;

    public List<SubmissionCommentDTO> getAllSubmissionComments() {
        List<SubmissionComment> submissionList = repository.findAll();
        log.info("Submission Comment list retrieved: {}", submissionList.toString());
        return mapper.toSubmissionCommentDTOList(submissionList);
    }

    public SubmissionCommentDTO addSubmissionComment(SubmissionCommentDTO submissionCommentDTO) {
        SubmissionComment submissionComment = mapper.toSubmissionCommentEntity(submissionCommentDTO);
        submissionComment.setSubmission(entityManager.getReference(Submission.class, submissionCommentDTO.getSubmissionId()));
        submissionComment.setCommenter(entityManager.getReference(User.class,
            submissionCommentDTO.getCommenterUserId()));

        SubmissionComment entity = repository.save(submissionComment);
        log.info("Submission Comment created: {}", entity.toString());

        return mapper.toSubmissionCommentDTO(entity);
    }

    public SubmissionCommentDTO updateSubmissionComment(SubmissionCommentDTO submissionDTO) throws Exception{
        SubmissionComment origEntity = repository.findById(submissionDTO.getId()).orElseThrow(Exception::new);
        mapper.updateSubmissionCommentEntity(submissionDTO, origEntity);
        SubmissionComment entity = repository.save(origEntity);
        log.info("Submission Comment updated: {}", origEntity.getId());

        return mapper.toSubmissionCommentDTO(entity);
    }
}
