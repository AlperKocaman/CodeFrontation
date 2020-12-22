package tr.com.obss.codefrontation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.Assignment;
import tr.com.obss.codefrontation.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, UUID> {

	List<Assignment> findByUserId(User user);

	List<Assignment> findByProblemId(UUID problemId);

	boolean existsById(UUID assignmentId);
}