package tr.com.obss.codefrontation.config;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {

    @Primary
    @Bean
    public void firebaseInit() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("src/main/resources/codefrontation-firebase-adminsdk-jxon9-dbcbb8336f.json");
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://codefrontation.firebaseio.com")
                .build();
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

    //@Bean
    //public Firestore getDatabase() throws IOException {
    //    FileInputStream serviceAccount =
    //            new FileInputStream("src/main/resources/codefrontation-firebase-adminsdk-jxon9-dbcbb8336f.json");
    //    FirestoreOptions firestoreOptions = FirestoreOptions.newBuilder()
    //            .setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();
    //    return firestoreOptions.getService();
    //}
}