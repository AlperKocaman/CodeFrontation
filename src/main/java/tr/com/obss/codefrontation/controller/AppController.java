package tr.com.obss.codefrontation.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.codefrontation.dto.*;
import tr.com.obss.codefrontation.dto.problem.ProblemEveluationDto;
import tr.com.obss.codefrontation.service.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/main")
public class AppController {

    private final CompilerService compilerService;
    private final UserService userService;
    private final ProblemService problemService;
    private final TemplateService templateService;
    private final AssignmentService assignmentService;
    private final RoleService roleService;
    private final SubmissionService submissionService;
    private final DmojProblemService dmojProblemService;
    private final CommentService commentService;
    

    private static final Gson gson = new GsonBuilder().create();

    @ResponseBody
    @PostMapping(path = "/checkToken", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO checkToken(@RequestBody AuthDTO authDto) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authDto.getToken());
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping()
    public String test() {
        return "Code Frontation 2020";
    }

    @GetMapping("/users")
    public List<UserDTO> getUserList() {
        return userService.getAllUser();
    }

    @GetMapping("/users/{username}")
    public UserDTO getUserListByUsername(@PathVariable String username) throws Exception {
        return userService.getUserByUsername(username);
    }

    /*
    Submission Controller Methods
     */

    @GetMapping("/submissions")
    public List<SubmissionDTO> getSubmissionList() {
        List<SubmissionDTO> list = submissionService.getAllSubmissions();
        return list;
    }

    @GetMapping("/submissions/{username}")
    public List<SubmissionDTO> getSubmissionListByUserName(@PathVariable String username) {
        return submissionService.getSubmissionsByUsername(username);
    }

    @GetMapping("/submissions/{username}/{problemCode}")
    public List<SubmissionDTO> getSubmissionListByUserNameAndProblemCode(
            @PathVariable String username, @PathVariable String problemCode) {
        return submissionService.getSubmissionsByUsernameAndProblemCode(username, problemCode);
    }

    @PostMapping("/users/delete-users")
    public List<UserDTO> deleteUserList(@RequestBody List<UserDTO> users) {
        return userService.deleteUsers(users);
    }

    @DeleteMapping("/users/{id}")
    public UUID deleteUser(@PathVariable UUID id) throws Exception {
        return userService.deleteUser(id);
    }

    @PostMapping("/user")
    public UserDTO addUser(@RequestBody UserDTO user) throws Exception {
        return userService.addUser(user);
    }


    @PutMapping("/users/{id}")
    public UserDTO updateUser(@PathVariable UUID id, @RequestBody UserDTO user) throws Exception {
        return userService.updateUser(user);
    }

    @PostMapping("/comments")
    public CommentDTO addComment (@RequestBody CommentDTO commentDTO) throws Exception {
        return commentService.addSubmissionComment(commentDTO);
    }

   @GetMapping("/comments")
    public List<CommentDTO> getSubmissionCommentList() {
        List<CommentDTO> list =  commentService.getAllSubmissionComments();
        return list;
    }

    @GetMapping("/comments/{username}")
    public List<CommentDTO> getCommentListByUserName(@PathVariable String username) {
        return commentService.getCommentsByUsername(username);
    }

    @GetMapping("/commentsBySubmissionId/{submissionId}")
    public List<CommentDTO> getCommentListBySubmissionId(
            @PathVariable UUID submissionId) {
        return commentService.getCommentsBySubmissionId(submissionId);
    }
    
    /* End of controller methods for Users */

    /* Controller methods for problems page */

    @GetMapping("/problems")
    public List<ProblemDTO> getProblemList() {
        return problemService.getAllProblems();
    }

    @GetMapping({"/problems/addProblem/{problemCode}", "/problems/problemKey/{problemCode}"})
    public ProblemDTO getProblemByProblemCode(@PathVariable String problemCode) {
        return problemService.getProblemsDetailsByProblemCode(problemCode);
    }

    @GetMapping("/problems/{username}")
    public List<ProblemDTO> getProblemListByUserName(@PathVariable String username) {
        return problemService.getAllProblemsAssignedToUserByUsername(username);
    }

    // FIXME : Delete mapping olmalı ?
    @PostMapping("/problems/delete-problems")
    public List<ProblemDTO> deleteProblemList(@RequestBody List<ProblemDTO> problems) {
        return problemService.deleteProblems(problems);
    }

    @DeleteMapping("/problems/{id}")
    public UUID deleteProblem(@PathVariable UUID id) throws Exception {
        return problemService.deleteProblem(id);
    }

    @PostMapping("/problem")
    public ProblemDTO addProblem(@RequestBody ProblemDTO problem) throws Exception {
        return problemService.addProblem(problem);
    }

    @PutMapping("/problems/{id}")
    public ProblemDTO updateProblem(@PathVariable UUID id, @RequestBody ProblemDTO problem) throws Exception {
        return problemService.updateProblem(problem);
    }

    /* End of controller methods for Problems */
    
    @GetMapping("/roles")
    public List<RoleDTO> getRoleList() {
        return roleService.getAllRoles();
    }
    
    /* Controller methods for templates page */

    @GetMapping("/templates")
    public List<TemplateDTO> getTemplateList() {
        return templateService.getAllTemplates();
    }

    @PostMapping("/templates/delete-templates")
    public List<TemplateDTO> deleteTemplateList(@RequestBody List<TemplateDTO> templates) {
        return templateService.deleteTemplates(templates);
    }

    @DeleteMapping("/templates/{id}")
    public UUID deleteTemplate(@PathVariable UUID id) throws Exception {
        return templateService.deleteTemplate(id);
    }

    @PostMapping("/template")
    public TemplateDTO addTemplate(@RequestBody TemplateDTO template) throws Exception {
        return templateService.addTemplate(template);
    }

    @PutMapping("/templates/{id}")
    public TemplateDTO updateTemplate(@PathVariable UUID id, @RequestBody TemplateDTO template) throws Exception {
        return templateService.updateTemplate(template);
    }

    @PostMapping("/assignments")
    public AssignmentDTO addAssigment(@RequestBody AssignmentDTO assignmentDTO) throws Exception {
        return assignmentService.addAssignment(assignmentDTO);
    }

    /* End of controller methods for Templates */

    //@PostMapping("/evaluate")
    //public String compileAndRun(@RequestBody Object codeMap) {
    //    @SuppressWarnings("rawtypes")
    //    Map map = (Map) codeMap;
    //    String code = (String) map.get("code");
    //    String lang = (String) map.get("lang");
    //    //TODO will take lang parameter as Java, Python etc.
    //    String result = "";
    //    if (lang.equals("java")) {
    //        result = compilerService.javaCompileAndRun(code);
    //    } else {
    //        result = "Please select Java theme, other themes are not supported yet";
    //    }
//
    //    return result;
    //}

    @PostMapping("/createProblem")
    public String createProblem(@RequestBody ProblemEveluationDto problem) {
      dmojProblemService.createNewProblem(problem);
      return "successfully created!!";
    }


}
