package tr.com.obss.codefrontation.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import tr.com.obss.codefrontation.dto.AuthDto;
import tr.com.obss.codefrontation.dto.TestDto;
//import tr.com.obss.codefrontation.service.IAppService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/main")
public class AppController {

    //private IAppService appService;
//
    //@Autowired
    //public AppController(IAppService appService) {
    //    this.appService = appService;
    //}

    @ResponseBody
    @PostMapping(path = "/checkToken",produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public TestDto checkToken(@RequestBody AuthDto authDto) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authDto.getToken());
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        return null;
    }

    @ResponseBody
    @GetMapping()
    public String test() {
        return "Code Frontation 2020";
    }

}
