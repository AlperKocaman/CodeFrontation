package tr.com.obss.codefrontation.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.TestCase;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TestCaseRepository extends JpaRepository<TestCase, UUID> {

    Optional<TestCase> findById(UUID id);

    void deleteById(UUID id);

    boolean existsById(UUID id);

    List<TestCase> findTestCaseBySubmissionId(UUID submissionId);

}