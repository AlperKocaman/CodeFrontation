package tr.com.obss.codefrontation.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.com.obss.codefrontation.dto.CommentDTO;
import tr.com.obss.codefrontation.entity.Comment;
import tr.com.obss.codefrontation.entity.Submission;
import tr.com.obss.codefrontation.entity.User;
import tr.com.obss.codefrontation.mapper.Mapper;
import tr.com.obss.codefrontation.repository.CommentRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentService {
    private final Mapper mapper;
    private final CommentRepository repository;
    @PersistenceContext(properties = {@PersistenceProperty(name = "hibernate.max_fetch_depth", value = "1"), @PersistenceProperty(name = "hibernate.enable_lazy_load_no_trans", value = "true")})
    public EntityManager entityManager;

    public List<CommentDTO> getAllSubmissionComments() {
        List<Comment> commentList = repository.findAll();
        log.info("Submission Comment list retrieved: {}", commentList.toString());
        return mapper.toCommentDTOList(commentList);
    }

    public List<CommentDTO> getCommentsByUsername(String username) {
        return mapper.toCommentDTOList(repository.getAllCommentss(username));
    }

    public List<CommentDTO> getCommentsByUsernameAndProblemCode(String username, String problemCode) {
        return mapper.toCommentDTOList(
            repository.getCommentsUsernameAndProblemCode(username, problemCode));
    }
    public CommentDTO addSubmissionComment(CommentDTO commentDTO) {
        Comment comment = mapper.toCommentEntity(commentDTO);
        comment.setSubmission(entityManager.getReference(Submission.class, commentDTO.getSubmissionId()));
        comment.setCommenter(entityManager.getReference(User.class,
            commentDTO.getCommenterUserId()));

        Comment entity = repository.save(comment);
        log.info("Submission Comment created: {}", entity.toString());

        return mapper.toCommentDTO(entity);
    }

    public CommentDTO updateSubmissionComment(CommentDTO commentDTO) throws Exception{
        Comment origEntity = repository.findById(commentDTO.getId()).orElseThrow(Exception::new);
        mapper.updateCommentEntity(commentDTO, origEntity);
        Comment entity = repository.save(origEntity);
        log.info("Submission Comment updated: {}", origEntity.getId());

        return mapper.toCommentDTO(entity);
    }
}
