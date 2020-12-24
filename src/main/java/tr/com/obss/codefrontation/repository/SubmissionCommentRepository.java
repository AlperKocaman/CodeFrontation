package tr.com.obss.codefrontation.repository;


import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.SubmissionComment;

@Repository
public interface SubmissionCommentRepository extends JpaRepository<SubmissionComment, UUID> {

    Optional<SubmissionComment> findById(UUID id);

    void deleteById(UUID id);

    boolean existsById(UUID id);

}