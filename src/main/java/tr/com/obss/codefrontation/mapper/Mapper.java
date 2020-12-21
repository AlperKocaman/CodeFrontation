package tr.com.obss.codefrontation.mapper;

import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import tr.com.obss.codefrontation.dto.SubmissionDTO;
import tr.com.obss.codefrontation.dto.TestCaseDTO;
import tr.com.obss.codefrontation.dto.UserDTO;
import tr.com.obss.codefrontation.entity.Submission;
import tr.com.obss.codefrontation.entity.TestCase;
import tr.com.obss.codefrontation.entity.User;

import java.util.List;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {
    UserDTO toUserDTO(User user);

    User toUserEntity(UserDTO dto);

    void updateEntity(UserDTO dto, @MappingTarget User entity);

    List<UserDTO> toDTOList(List<User> entity);

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

    List<TestCaseDTO> toTestCaseDTOList(List<TestCase> entity);

    @Mapping(target = "submissionId", source = "submission.id")
    TestCaseDTO toTestCaseDTO(TestCase entity);


    @Mapping(target = "submission.id", source = "submissionId")
    TestCase toTestCaseEntity(TestCaseDTO dto);

    void updateTestCaseEntity(TestCaseDTO dto, @MappingTarget TestCase entity);

    List<User> toEntityList(List<UserDTO> entity);

}