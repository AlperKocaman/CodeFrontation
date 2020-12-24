package tr.com.obss.codefrontation.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.Submission;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, UUID> {

    Optional<Submission> findById(UUID id);

    void deleteById(UUID id);

    boolean existsById(UUID id);

    @Query(nativeQuery = true, value = "SELECT * FROM submissions WHERE submissions.assignment_id = " +
            "(SELECT id FROM assignments WHERE assignments.user_id =" +
            "(SELECT id FROM users WHERE users.username = :name))")
    List<Submission> findAllSubmissionsByUsername(@Param("name") String name);

    @Query(nativeQuery = true, value = "SELECT * FROM submissions WHERE submissions.assignment_id =" +
            "            (SELECT id FROM assignments WHERE assignments.user_id =" +
            "            (SELECT id FROM users WHERE users.username = :name) AND" +
            "            assignments.problem_id = (SELECT id FROM problems WHERE problems.code = :code))")
    List<Submission> findAllSubmissionsByUsernameAndProblemCode(@Param("name") String name, @Param("code") String code);
}