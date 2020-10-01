package tr.com.obss.codefrontation.controller;

import java.util.Map;

import org.joor.Reflect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/main")
public class AppController {
	private Logger logger = LoggerFactory.getLogger(AppController.class);

	// private IAppService appService;
//
	// @Autowired
	// public AppController(IAppService appService) {
	// this.appService = appService;
	// }

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
		return "Code Frontation 2020";
	}

	@PostMapping("/evaluate")
	public String compileAndRun(@RequestBody Object codeMap) {
		@SuppressWarnings("rawtypes")
		Map map = (Map) codeMap;
		String codeString = (String) map.get("code");
		try {
			Reflect supp = Reflect.compile("Solution", codeString).create();
			return "" + supp.call("solution");
		} catch (Exception e) {
			logger.error(e.getLocalizedMessage(), e);
			return "Error Occured When tring to run code!";
		}

	}

}
