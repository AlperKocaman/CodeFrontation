package tr.com.obss.codefrontation.controller;

import java.util.Arrays;
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

//import tr.com.obss.codefrontation.service.IAppService;
import lombok.extern.slf4j.Slf4j;
import tr.com.obss.codefrontation.dto.AuthDto;
import tr.com.obss.codefrontation.dto.TestDto;
import tr.com.obss.codefrontation.dto.problem.ProblemEveluationDto;
import tr.com.obss.codefrontation.dto.problem.ProblemTestCaseDto;
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
	@PostMapping(path = "/checkToken", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
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

		ProblemEveluationDto problemEvaluation = new ProblemEveluationDto();
		problemEvaluation.setName("factorial");

		ProblemTestCaseDto t1 = new ProblemTestCaseDto();
		ProblemTestCaseDto t2 = new ProblemTestCaseDto();
		ProblemTestCaseDto t3 = new ProblemTestCaseDto();
		ProblemTestCaseDto t4 = new ProblemTestCaseDto();

		t1.setInput("1");
		t1.setOutput("1");
		t1.setPoint(12.0);

		t2.setInput("7");
		t2.setOutput("5040");
		t2.setPoint(35.0);

		t3.setInput("5");
		t3.setOutput("120");
		t3.setPoint(13.0);

		t4.setInput("3");
		t4.setOutput("6");
		t4.setPoint(40.0);

		problemEvaluation.setTestCases(Arrays.asList(t1, t2, t3, t4));
		problemService.createNewProblem(problemEvaluation);

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