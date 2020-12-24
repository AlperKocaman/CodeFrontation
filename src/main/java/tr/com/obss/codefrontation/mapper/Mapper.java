package tr.com.obss.codefrontation.mapper;

import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import tr.com.obss.codefrontation.dto.SubmissionCommentDTO;
import tr.com.obss.codefrontation.dto.SubmissionDTO;
import tr.com.obss.codefrontation.dto.TestCaseDTO;
import tr.com.obss.codefrontation.dto.UserDTO;
import tr.com.obss.codefrontation.entity.Submission;
import tr.com.obss.codefrontation.entity.SubmissionComment;
import tr.com.obss.codefrontation.entity.TestCase;
import tr.com.obss.codefrontation.entity.User;

import java.util.List;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {
    UserDTO toUserDTO(User user);

    User toUserEntity(UserDTO dto);

    void updateEntity(UserDTO dto, @MappingTarget User entity);

    List<UserDTO> toDTOList(List<User> entity);

    /** Submission **/
    List<SubmissionDTO> toSubmissionDTOList(List<Submission> entity);

    @Mapping(target = "problemCode", source = "assignment.problem.code")
    @Mapping(target = "username", source = "assignment.user.username")
    @Mapping(target = "assignmentId", source = "assignment.id")
    SubmissionDTO toSubmissionDTO(Submission entity);

    @Mapping(target = "assignment.problem.code", source = "problemCode")
    @Mapping(target = "assignment.user.username", source = "username")
    @Mapping(target = "assignment.id", source = "assignmentId")
    Submission toSubmissionEntity(SubmissionDTO dto);

    @Mapping(target = "body", ignore = true)
    @Mapping(target = "language", ignore = true)
    void updateSubmissionEntity(SubmissionDTO dto, @MappingTarget Submission entity);


    /** Comments **/

    List<SubmissionCommentDTO> toSubmissionCommentDTOList(List<SubmissionComment> entity);

    @Mapping(target = "submissionId", source = "submission.id")
    @Mapping(target = "commenterUserName", source = "commenter.username")
    @Mapping(target = "commenterUserId", source = "commenter.id")
    @Mapping(target = "userName", source = "submission.assignment.user.username")
    @Mapping(target = "problemName", source = "submission.assignment.problem.name")
    @Mapping(target = "targetRole", source = "submission.assignment.user.targetRole")
    @Mapping(target = "targetProject", source = "submission.assignment.user.targetProject")
    SubmissionCommentDTO toSubmissionCommentDTO(SubmissionComment entity);

    @Mapping(target = "submission.id", source = "submissionId")
    @Mapping(target = "commenter.username", source = "commenterUserName")
    @Mapping(target = "commenter.id", source = "commenterUserId")
    @Mapping(target = "submission.assignment.user.username", source = "userName")
    @Mapping(target = "submission.assignment.problem.name", source = "problemName")
    @Mapping(target = "submission.assignment.user.targetRole", source = "targetRole")
    @Mapping(target = "submission.assignment.user.targetProject", source = "targetProject")
    SubmissionComment toSubmissionCommentEntity(SubmissionCommentDTO dto);

    void updateSubmissionCommentEntity(SubmissionCommentDTO dto, @MappingTarget SubmissionComment entity);

    List<TestCaseDTO> toTestCaseDTOList(List<TestCase> entity);

    @Mapping(target = "submissionId", source = "submission.id")
    TestCaseDTO toTestCaseDTO(TestCase entity);

    @Mapping(target = "submission.id", source = "submissionId")
    TestCase toTestCaseEntity(TestCaseDTO dto);

    void updateTestCaseEntity(TestCaseDTO dto, @MappingTarget TestCase entity);

    List<User> toEntityList(List<UserDTO> entity);

}