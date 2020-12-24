package tr.com.obss.codefrontation.repository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.com.obss.codefrontation.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {

    Optional<Comment> findById(UUID id);

    void deleteById(UUID id);

    boolean existsById(UUID id);

//    @Query(nativeQuery = true, value = "SELECT * FROM comments_submission WHERE comments_submission.submission_id = " +
//        "(SELECT id FROM assignments WHERE assignments.user_id =" +
//        "(SELECT id FROM users WHERE users.username = :name))")
    @Query("SELECT c FROM Comment c where c.submission.assignment.user.username = ?1")
    List<Comment> getAllCommentss(String name);

    @Query("SELECT c FROM Comment c" )
    List<Comment> getAllComments();



//    @Query(nativeQuery = true, value = "SELECT * FROM comments_submission WHERE comments_submission.submission_id =" +
//        "            (SELECT id FROM assignments WHERE assignments.user_id =" +
//        "            (SELECT id FROM users WHERE users.username = :name) AND" +
//        "            assignments.problem_id = (SELECT id FROM problems WHERE problems.code = :code))")

    @Query("SELECT c FROM Comment c where c.submission.assignment.user.username = :name "
        + "AND c.submission.assignment.problem.code = :code")
    List<Comment> getCommentsUsernameAndProblemCode(@Param("name") String name,
        @Param("code") String code);
}