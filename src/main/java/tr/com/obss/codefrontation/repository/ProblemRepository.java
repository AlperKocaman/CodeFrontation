package tr.com.obss.codefrontation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.Problem;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, UUID> {

	Optional<Problem> findByProblemName(String problemName);

	void deleteByProblemName(String problemName);

	boolean existsByProblemName(String problemName);
}
