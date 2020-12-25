package tr.com.obss.codefrontation.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.TestRun;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TestRunRepository extends JpaRepository<TestRun, UUID> {

    Optional<TestRun> findById(UUID id);

    void deleteById(UUID id);

    boolean existsById(UUID id);

}