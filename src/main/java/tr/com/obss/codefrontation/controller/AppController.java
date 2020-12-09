package tr.com.obss.codefrontation.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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

import lombok.extern.slf4j.Slf4j;
import tr.com.obss.codefrontation.dto.AuthDTO;
import tr.com.obss.codefrontation.dto.UserDTO;
import tr.com.obss.codefrontation.service.CompilerService;
//import tr.com.obss.codefrontation.service.UserService;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/main")
public class AppController {

    private CompilerService compilerService;
    //private UserService userService;

    private static final Gson gson = new GsonBuilder().create();

    @Autowired
    public AppController(CompilerService compilerService
                         //,UserService userService
    ) {
        this.compilerService = compilerService;
        //this.userService = userService;
    }

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
    public List<UserDTO> userList() {
        UserDTO dto= new UserDTO();
        dto.setId(UUID.randomUUID());
        dto.setUsername("mduzgun");
        dto.setFirstName("Mehmet");
        dto.setLastName("Düzgün");
        dto.setEmail("memetduzgun@gmail.com");
        dto.setIsAdmin(false);
        dto.setTargetRole("junior developer");
        dto.setTargetProject("IHTAR");
        dto.setSkills("java, python");
        List<UserDTO> userList=new ArrayList<>();
        userList.add(dto);
        return userList;
        //return userService.getAllUser();
    }


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

}