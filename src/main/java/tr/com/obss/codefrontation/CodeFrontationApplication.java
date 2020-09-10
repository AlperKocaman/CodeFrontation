package tr.com.obss.codefrontation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@SpringBootApplication
@EnableAsync
public class CodeFrontationApplication {

    private static final int PARALLEL_JOB_COUNT = 50;

    @Bean(name = "processExecutor")
    public ThreadPoolTaskScheduler threadPoolTaskScheduler() {
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(PARALLEL_JOB_COUNT);
        return threadPoolTaskScheduler;
    }

    public static void main(String[] args) {
        SpringApplication.run(CodeFrontationApplication.class, args);
    }

}