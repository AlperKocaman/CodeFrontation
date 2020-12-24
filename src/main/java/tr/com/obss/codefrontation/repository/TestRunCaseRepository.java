package tr.com.obss.codefrontation.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.TestCase;
import tr.com.obss.codefrontation.entity.TestRunCase;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TestRunCaseRepository extends JpaRepository<TestRunCase, UUID> {

    Optional<TestRunCase> findById(UUID id);

    void deleteById(UUID id);

    boolean existsById(UUID id);

    List<TestRunCase> findTestRunCaseByTestRunId(UUID testRunId);

}