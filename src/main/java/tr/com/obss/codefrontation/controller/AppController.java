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

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import lombok.extern.slf4j.Slf4j;
import tr.com.obss.codefrontation.dto.AuthDTO;
import tr.com.obss.codefrontation.dto.ProblemDTO;
import tr.com.obss.codefrontation.dto.RoleDTO;
import tr.com.obss.codefrontation.dto.SubmissionDTO;
import tr.com.obss.codefrontation.dto.TemplateDTO;
import tr.com.obss.codefrontation.dto.UserDTO;
import tr.com.obss.codefrontation.dto.problem.ProblemEveluationDto;
import tr.com.obss.codefrontation.service.CompilerService;
import tr.com.obss.codefrontation.service.DmojProblemService;
import tr.com.obss.codefrontation.service.ProblemService;
import tr.com.obss.codefrontation.service.RoleService;
import tr.com.obss.codefrontation.service.SubmissionService;
import tr.com.obss.codefrontation.service.TemplateService;
import tr.com.obss.codefrontation.service.UserService;

import java.util.List;
import java.util.Map;
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
    private final RoleService roleService;
    private final SubmissionService submissionService;
    private final DmojProblemService dmojProblemService;
    

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

    @GetMapping("/submissions")
    public List<SubmissionDTO> getSubmissionList() {
        List<SubmissionDTO> list =  submissionService.getAllSubmissions();
        return list;
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

    /* End of controller methods for Users */

    /* Controller methods for problems page */

    @GetMapping("/problems")
    public List<ProblemDTO> getProblemList() {
        return problemService.getAllProblems();
    }

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

    /* End of controller methods for Templates */

    @PostMapping("/evaluate")
    public String compileAndRun(@RequestBody Object codeMap) {
        @SuppressWarnings("rawtypes")
        Map map = (Map) codeMap;
        String code = (String) map.get("code");
        String lang = (String) map.get("lang");
        //TODO will take lang parameter as Java, Python etc.
        String result = "";
        if (lang.equals("java")) {
            result = compilerService.javaCompileAndRun(code);
        } else {
            result = "Please select Java theme, other themes are not supported yet";
        }

        return result;
    }
    
    @PostMapping("/createProblem")
    public String createProblem(@RequestBody ProblemEveluationDto problem) {
      dmojProblemService.createNewProblem(problem);
      return "successfully created!!";
    }


}
