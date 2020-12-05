package tr.com.obss.codefrontation.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
// import tr.com.obss.codefrontation.service.IAppService;
import lombok.extern.slf4j.Slf4j;
import tr.com.obss.codefrontation.dto.AuthDto;
import tr.com.obss.codefrontation.dto.TestDto;
import tr.com.obss.codefrontation.dto.problem.ProblemEveluationDto;
import tr.com.obss.codefrontation.service.ICompilerService;
import tr.com.obss.codefrontation.service.ProblemService;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/main")
public class AppController {

  private ICompilerService compilerService;

  private ProblemService problemService;

  @Autowired
  public AppController(ICompilerService compilerService, ProblemService problemService) {
    this.compilerService = compilerService;
    this.problemService = problemService;
  }

  @ResponseBody
  @PostMapping(path = "/checkToken", produces = MediaType.APPLICATION_JSON_VALUE,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public TestDto checkToken(@RequestBody AuthDto authDto) {
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

  @PostMapping("/createProblem")
  public String createProblem(@RequestBody ProblemEveluationDto problem) {
    problemService.createNewProblem(problem);
    return "successfully created!!";
  }

  @PostMapping("/evaluate")
  public String compileAndRun(@RequestBody Object codeMap) {
    @SuppressWarnings("rawtypes")
    Map map = (Map) codeMap;
    String code = (String) map.get("code");
    String lang = (String) map.get("lang");
    // TODO will take lang parameter as Java, Python etc.
    String result = "";
    if (lang.equals("java")) {
      result = compilerService.javaCompileAndRun(code);
    } else {
      result = "Please select Java theme, other themes are not supported yet";
    }

    return result;
  }

}
