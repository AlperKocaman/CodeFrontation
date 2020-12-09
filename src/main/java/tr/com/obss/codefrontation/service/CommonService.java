package tr.com.obss.codefrontation.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
//import tr.com.obss.codefrontation.repository.AppRepository;

public abstract class CommonService {

    //private AppRepository appRepository;
    private static final Gson gson = new GsonBuilder().create();

    public CommonService() {
    }
}