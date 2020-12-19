package tr.com.obss.codefrontation.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.Submission;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, UUID> {

    Optional<Submission> findById(UUID id);

    void deleteById(UUID id);

    boolean existsById(UUID id);

}