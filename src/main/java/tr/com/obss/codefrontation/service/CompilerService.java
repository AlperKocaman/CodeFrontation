package tr.com.obss.codefrontation.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.extern.slf4j.Slf4j;
import org.joor.Reflect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CompilerService implements ICompilerService {

    private static final Gson gson = new GsonBuilder().create();

    @Autowired
    private CompilerService() {
    }

    public String javaCompileAndRun(String code) {
        try {
            Reflect supp = Reflect.compile("Solution", code).create();
            return "" + supp.call("solution");
        } catch (Exception e) {
            log.error(e.getLocalizedMessage(), e);
            return "Error Occured When tring to run java code!";
        }

    }

}
