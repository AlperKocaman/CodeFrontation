package tr.com.obss.codefrontation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.Problem;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, UUID> {

	Optional<Problem> findByCode(String code);

	Optional<Problem> findById(UUID problemID);

	void deleteByName(String problemName);

	boolean existsByName(String problemName);
}
