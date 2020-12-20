package tr.com.obss.codefrontation.security.models;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
@ConfigurationProperties("dmoj")
public class DmojProperties {
  private String problemsPath;
}
