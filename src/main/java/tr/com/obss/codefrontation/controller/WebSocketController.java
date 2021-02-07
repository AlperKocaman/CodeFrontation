package tr.com.obss.codefrontation.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.codefrontation.dto.*;
import tr.com.obss.codefrontation.enums.Result;
import tr.com.obss.codefrontation.enums.Status;
import tr.com.obss.codefrontation.service.SubmissionService;
import tr.com.obss.codefrontation.service.TestCaseService;
import tr.com.obss.codefrontation.service.TestRunCaseService;
import tr.com.obss.codefrontation.service.TestRunService;

import javax.annotation.PostConstruct;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/judge")
public class WebSocketController {
    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private TestRunService testRunService;

    @Autowired
    private TestCaseService testCaseService;

    @Autowired
    private TestRunCaseService testRunCaseService;

    @Autowired
    private SonarController sonarController;

    public ServerSocket serverSocket;
    private final Gson gson = new GsonBuilder().create();
    public Socket server;
    DataInputStream in;
    DataOutputStream out;

    @PostConstruct
    public void socketInit() throws IOException {
        int port = 9999;
        serverSocket = new ServerSocket(port);
        Thread t = new Thread(new Runnable() {
            @SneakyThrows
            @Override
            public void run() {
                log.info("Waiting for client on port " +
                        serverSocket.getLocalPort() + "...");
                server = serverSocket.accept();
                log.info("Just connected to " + server.getRemoteSocketAddress());
                in = new DataInputStream(server.getInputStream());
                out = new DataOutputStream(server.getOutputStream());
                while (true) {
                    try {
                        Thread.sleep(100);
                        if(!server.isConnected()){
                            throw new Exception();
                        }
                        while (in.available() > 0) {
                            String str = in.readUTF();
                            if (!str.equals("")) {
                                JSONObject res = (JSONObject) JSONValue.parse(str);
                                //{"name": "test-case-status", "submission-id": 1, "cases": [{"position": 1, "status": 0, "time": 0.13805162, "points": 5, "total-points": 5,
                                // "memory": 9684, "output": "10\n2\n", "extended-feedback": "", "feedback": ""}]}
                                if (res.get("name").equals("test-case-status")) {
                                    String submissionId = (String) res.get("submission-id");
                                    if (submissionId.startsWith("test_")) {

                                        submissionId = submissionId.replace("test_", "");
                                        Status status = Status.NOT_COMPLETED;

                                        JSONArray cases = (JSONArray) res.get("cases");
                                        for (Object obj : cases) {
                                            JSONObject caseObj = (JSONObject) obj;
                                            Long casePosition = (Long) caseObj.get("position");
                                            Long caseStatus = (Long) caseObj.get("status");
                                            if (caseStatus == 0) {
                                                status = Status.COMPLETED;
                                            } else {
                                                status = Status.NOT_COMPLETED;
                                            }

                                            Double caseTime = (Double) caseObj.get("time");
                                            Long casePoints = Long.valueOf(0);
                                            try {
                                                Double casePointsD = (Double) caseObj.get("points");
                                                casePoints = (new Double(casePointsD)).longValue();
                                            } catch (Exception e) {
                                                casePoints = (Long) caseObj.get("points");
                                            }

                                            Long caseTotalPoints = Long.valueOf(0);
                                            try {
                                                Double caseTotalPointsD = (Double) caseObj.get("total-points");
                                                caseTotalPoints = (new Double(caseTotalPointsD)).longValue();
                                            } catch (Exception e) {
                                                caseTotalPoints = (Long) caseObj.get("total-points");
                                            }
                                            Long caseMemory = (Long) caseObj.get("memory");
                                            String caseOutput = (String) caseObj.get("output");
                                            String caseExtendedFeedback = (String) caseObj.get("extended-feedback");
                                            String caseFeedback = (String) caseObj.get("feedback");

                                            TestRunCaseDTO testRunCaseDTO = new TestRunCaseDTO();
                                            testRunCaseDTO.setTestRunId(UUID.fromString(submissionId));
                                            testRunCaseDTO.setOutput(caseOutput);
                                            testRunCaseDTO.setPosition(casePosition);
                                            testRunCaseDTO.setTime(caseTime);
                                            testRunCaseDTO.setMemory(caseMemory);

                                            testRunCaseDTO.setPoint(casePoints);
                                            testRunCaseDTO.setTotalPoint(caseTotalPoints);
                                            testRunCaseDTO.setStatus(status);

                                            testRunCaseService.addTestRunCase(testRunCaseDTO);
                                        }
                                    } else {
                                        Status status;

                                        JSONArray cases = (JSONArray) res.get("cases");
                                        for (Object obj : cases) {
                                            JSONObject caseObj = (JSONObject) obj;
                                            Long casePosition = (Long) caseObj.get("position");
                                            Long caseStatus = (Long) caseObj.get("status");
                                            if (caseStatus == 0) {
                                                status = Status.COMPLETED;
                                            } else {
                                                status = Status.NOT_COMPLETED;
                                            }

                                            Double caseTime = (Double) caseObj.get("time");
                                            Long casePoints = Long.valueOf(0);
                                            try {
                                                Double casePointsD = (Double) caseObj.get("points");
                                                casePoints = (new Double(casePointsD)).longValue();
                                            } catch (Exception e) {
                                                casePoints = (Long) caseObj.get("points");
                                            }
                                            Long caseTotalPoints = Long.valueOf(0);
                                            try {
                                                Double caseTotalPointsD = (Double) caseObj.get("total-points");
                                                caseTotalPoints = (new Double(caseTotalPointsD)).longValue();
                                            } catch (Exception e) {
                                                caseTotalPoints = (Long) caseObj.get("total-points");
                                            }
                                            Long caseMemory = (Long) caseObj.get("memory");
                                            String caseOutput = (String) caseObj.get("output");
                                            String caseExtendedFeedback = (String) caseObj.get("extended-feedback");
                                            String caseFeedback = (String) caseObj.get("feedback");

                                            TestCaseDTO testCaseDTO = new TestCaseDTO();
                                            testCaseDTO.setSubmissionId(UUID.fromString(submissionId));
                                            testCaseDTO.setOutput(caseOutput);
                                            testCaseDTO.setPosition(casePosition);
                                            testCaseDTO.setTime(caseTime);
                                            testCaseDTO.setMemory(caseMemory);
                                            testCaseDTO.setPoint(casePoints);
                                            testCaseDTO.setTotalPoint(caseTotalPoints);
                                            testCaseDTO.setStatus(status);

                                            testCaseService.addTestCase(testCaseDTO);
                                        }
                                    }


                                } else if (res.get("name").equals("compile-error")) {
                                    String submissionId = (String) res.get("submission-id");
                                    if (submissionId.startsWith("test_")) {
                                        submissionId = submissionId.replace("test_", "");
                                        String log = (String) res.get("log");
                                        Status status = Status.NOT_COMPLETED;
                                        Double caseTime = Double.valueOf(0);
                                        Long casePoints = Long.valueOf(0);
                                        Long caseTotalPoints = Long.valueOf(0);
                                        Long caseMemory = Long.valueOf(0);
                                        String caseOutput = "Compile Error: "+log;
                                        Long casePosition = Long.valueOf(1);

                                        TestRunCaseDTO testRunCaseDTO = new TestRunCaseDTO();
                                        testRunCaseDTO.setTestRunId(UUID.fromString(submissionId));
                                        testRunCaseDTO.setOutput(caseOutput);
                                        testRunCaseDTO.setPosition(casePosition);
                                        testRunCaseDTO.setTime(caseTime);
                                        testRunCaseDTO.setMemory(caseMemory);

                                        testRunCaseDTO.setPoint(casePoints);
                                        testRunCaseDTO.setTotalPoint(caseTotalPoints);
                                        testRunCaseDTO.setStatus(status);

                                        testRunCaseService.addTestRunCase(testRunCaseDTO);
                                    } else {
                                        String log = (String) res.get("log");
                                        Status status = Status.NOT_COMPLETED;
                                        Double caseTime = Double.valueOf(0);
                                        Long casePoints = Long.valueOf(0);
                                        Long caseTotalPoints = Long.valueOf(0);
                                        Long caseMemory = Long.valueOf(0);
                                        String caseOutput = "Compile Error: "+log;
                                        Long casePosition = Long.valueOf(1);
                                        TestCaseDTO testCaseDTO = new TestCaseDTO();
                                        testCaseDTO.setSubmissionId(UUID.fromString(submissionId));
                                        testCaseDTO.setOutput(caseOutput);
                                        testCaseDTO.setPosition(casePosition);
                                        testCaseDTO.setTime(caseTime);
                                        testCaseDTO.setMemory(caseMemory);
                                        testCaseDTO.setPoint(casePoints);
                                        testCaseDTO.setTotalPoint(caseTotalPoints);
                                        testCaseDTO.setStatus(status);

                                        testCaseService.addTestCase(testCaseDTO);
                                    }
                                }
                                //client says: {"name": "handshake", "problems": [["aplusb", 1605472737.1798956], ["shortest1", 1604807687.554187]],
                                // "executors": {"AWK": [["awk", [4, 1, 4]]], "BF": [["bf", [1, 33, 7]]], "C": [["gcc", [7]]], "CPP03": [["g++", [7]]],
                                // "CPP11": [["g++11", [7]]], "PERL": [["perl", [5, 26, 1]]], "PY3": [["python3", [3, 7, 9]]], "SED": [["sed", [4, 4]]]},
                                // "id": "ExampleJudge", "key": "4qQG!RG9WYAbIwMq2M!:L$/~zgLErzU,o|waRd:x{4jkKRpjD}ddU>M,I%hXK{Q,9o0;d}q+p^/<j]Yl#S+/9o8j+KFPxqP}w;k{"}
                                else if (res.get("name").equals("handshake")) {
                                    JSONArray problems = (JSONArray) res.get("problems");
                                    JSONObject executors = (JSONObject) res.get("executors");
                                    String id = (String) res.get("id");
                                    String key = (String) res.get("key");
                                    for (Object problemObj : problems) {
                                        JSONArray problem = (JSONArray) problemObj;
                                        String problemName = (String) problem.get(0);
                                    }
                                    executors.keySet().forEach(keyStr ->
                                    {
                                        String longCode = (String) keyStr;
                                        Object value = executors.get(keyStr);
                                        JSONArray valueArr = (JSONArray) value;
                                        JSONArray valueArr1 = (JSONArray) valueArr.get(0);
                                        String langName = (String) valueArr1.get(0);
                                        log.info("key: " + longCode + " value: " + langName);
                                    });
                                    sendMessage();

                                }
                                //log.info("client says: " + str);
                            }
                        }
                    } catch (Exception s) {
                        log.error(s.getMessage());
                        server = serverSocket.accept();
                        log.info("Just connected to " + server.getRemoteSocketAddress());
                        in = new DataInputStream(server.getInputStream());
                        out = new DataOutputStream(server.getOutputStream());
                    }
                }
            }
        });
        t.start();
        Thread pingThread = new Thread(new Runnable() {
            @SneakyThrows
            @Override
            public void run() {
                while (true) {
                    try {
                        Thread.sleep(1 * 60 * 1000 );
                        sendPing();
                    } catch (Exception s) {
                        log.error(s.getMessage());
                        server = serverSocket.accept();
                        log.info("Just connected to " + server.getRemoteSocketAddress());
                        in = new DataInputStream(server.getInputStream());
                        out = new DataOutputStream(server.getOutputStream());
                    }
                }
            }
        });
        pingThread.start();
    }

    public void sendMessage() throws IOException {
        DataOutputStream out = new DataOutputStream(server.getOutputStream());
        JSONObject obj = new JSONObject();
        obj.put("name", "handshake-success");
        String str2 = obj.toJSONString();//"{\"name\":\"handshake-success\"}";
        int len = str2.length();
        String lenStr = "" + len;
        int spaceReq = 3 - lenStr.length();

        for (int i = 0; i < spaceReq; i++) {
            lenStr += " ";
        }
        out.writeBytes(lenStr);
        out.writeBytes(str2);
        //out.flush();
        long time = Instant.now().getEpochSecond();

        JSONObject ping = new JSONObject();
        ping.put("name", "ping");
        ping.put("when", time);


        //String timeStr=Long.toString(time);;
        //{'name': 'ping', 'when': 1608427743.1646569}
        String str3 = ping.toJSONString();//"{\"name\":\"ping\",\"'when'\":\"ping\"}";
        int len3 = str3.length();
        String lenStr3 = "" + len3;
        int spaceReq3 = 3 - lenStr3.length();

        for (int i = 0; i < spaceReq3; i++) {
            lenStr3 += " ";
        }

        out.writeBytes(lenStr3);
        out.writeBytes(str3);
        out.flush();
    }

    public void sendPing() throws IOException {
        long time = Instant.now().getEpochSecond();

        JSONObject ping = new JSONObject();
        ping.put("name", "ping");
        ping.put("when", time);

        //{'name': 'ping', 'when': 1608427743.1646569}
        String str3 = ping.toJSONString();//"{\"name\":\"ping\",\"'when'\":\"ping\"}";
        int len3 = str3.length();
        String lenStr3 = "" + len3;
        int spaceReq3 = 3 - lenStr3.length();

        for (int i = 0; i < spaceReq3; i++) {
            lenStr3 += " ";
        }

        out.writeBytes(lenStr3);
        out.writeBytes(str3);
        out.flush();
    }

    public void sendTestMessage() throws IOException {
        DataOutputStream out = new DataOutputStream(server.getOutputStream());

        //{'name': 'submission-request', 'submission-id': 28, 'problem-id': 'aplusb', 'language': 'PY3',
        //        'source': 'N = int(input())\r\n\r\nfor _ in range(N):\r\n    a, b = map(int, input().split())\r\n    print(a + b)', 'time-limit': 2.0,
        //        'memory-limit': 65536, 'short-circuit': False,
        //        'meta': {'pretests-only': False, 'in-contest': None, 'attempt-no': 1, 'user': 1}}
        JSONObject obj = new JSONObject();
        obj.put("name", "submission-request");
        obj.put("submission-id", UUID.randomUUID().toString());
        obj.put("problem-id", "aplusb");
        obj.put("language", "PY3");
        obj.put("source", "N = int(input())\r\n\r\nfor _ in range(N):\r\n    a, b = map(int, input().split())\r\n    print(a + b)");
        obj.put("time-limit", 2.0);
        obj.put("memory-limit", 65536);
        obj.put("short-circuit", false);

        JSONObject meta = new JSONObject();
        meta.put("pretests-only", false);
        meta.put("in-contest", null);
        meta.put("attempt-no", 1);
        meta.put("user", 1);

        obj.put("meta", meta);

        String str2 = obj.toJSONString();//"{\"name\":\"handshake-success\"}";
        int len = str2.length();
        String lenStr = "" + len;
        int spaceReq = 3 - lenStr.length();

        for (int i = 0; i < spaceReq; i++) {
            lenStr += " ";
        }
        out.writeBytes(lenStr);
        out.writeBytes(str2);
        //out.flush();
        long time = Instant.now().getEpochSecond();

        JSONObject ping = new JSONObject();
        ping.put("name", "ping");
        ping.put("when", time);


        //String timeStr=Long.toString(time);;
        //{'name': 'ping', 'when': 1608427743.1646569}
        String str3 = ping.toJSONString();//"{\"name\":\"ping\",\"'when'\":\"ping\"}";
        int len3 = str3.length();
        String lenStr3 = "" + len3;
        int spaceReq3 = 3 - lenStr3.length();

        for (int i = 0; i < spaceReq3; i++) {
            lenStr3 += " ";
        }

        out.writeBytes(lenStr3);
        out.writeBytes(str3);
        out.flush();
    }


    @PostMapping("/submit")
    public SubmissionDTO evaluate(@RequestBody SubmissionDTO dto) throws Exception {
        SubmissionDTO result = submissionService.addSubmission(dto);
        JSONObject submissionReq = convertSubmissionDtoToJsonObject(result);
        String submissionStr = submissionReq.toJSONString();
        int submissionLen = submissionStr.length();
        String lenStr = "" + submissionLen;
        int spaceReq = 3 - lenStr.length();

        for (int i = 0; i < spaceReq; i++) {
            lenStr += " ";
        }
        out.writeBytes(lenStr);
        out.writeBytes(submissionStr);
        out.flush();
        return result;
    }

    @PutMapping("/submit/{id}")
    public SubmissionDTO updateSubmissionWithSonarData(@PathVariable UUID id, @RequestBody SubmissionDTO dto) throws Exception {
        SubmissionDTO result = submissionService.updateSubmissionPointWithSonarData(dto);
        JSONObject submissionReq = convertSubmissionDtoToJsonObject(result);
        String submissionStr = submissionReq.toJSONString();
        int submissionLen = submissionStr.length();
        String lenStr = "" + submissionLen;
        int spaceReq = 3 - lenStr.length();

        for (int i = 0; i < spaceReq; i++) {
            lenStr += " ";
        }
        out.writeBytes(lenStr);
        out.writeBytes(submissionStr);
        out.flush();
        return result;
    }

    @PostMapping("/testRun")
    public TestRunDTO testRun(@RequestBody TestRunDTO dto) throws Exception {
        TestRunDTO result = testRunService.addTestRun(dto);
        JSONObject testRunReq = convertTestRunDtoToJsonObject(result);
        String testRunStr = testRunReq.toJSONString();
        int testRunLen = testRunStr.length();
        String lenStr = "" + testRunLen;
        int spaceReq = 3 - lenStr.length();

        for (int i = 0; i < spaceReq; i++) {
            lenStr += " ";
        }
        out.writeBytes(lenStr);
        out.writeBytes(testRunStr);
        out.flush();
        return result;
    }

    public JSONObject convertTestRunDtoToJsonObject(TestRunDTO dto) {
        JSONObject obj = new JSONObject();
        obj.put("name", "submission-request");
        obj.put("submission-id", "test_" + dto.getId().toString()); //test run için submission_id başına test koyacağız
        obj.put("problem-id", "test_" + dto.getProblemCode()); //test run için problem code başına test koyacağız
        obj.put("language", dto.getLanguage().name());
        obj.put("source", dto.getBody());
        obj.put("time-limit", 2.0);
        obj.put("memory-limit", 65536);
        obj.put("short-circuit", false);

        JSONObject meta = new JSONObject();
        meta.put("pretests-only", false);
        meta.put("in-contest", null);
        meta.put("attempt-no", 1);
        meta.put("user", 1);

        obj.put("meta", meta);
        return obj;
    }

    public JSONObject convertSubmissionDtoToJsonObject(SubmissionDTO dto) {
        JSONObject obj = new JSONObject();
        obj.put("name", "submission-request");
        obj.put("submission-id", dto.getId().toString());
        obj.put("problem-id", dto.getProblemCode());
        obj.put("language", dto.getLanguage().name());
        obj.put("source", dto.getBody());
        obj.put("time-limit", 2.0);
        obj.put("memory-limit", 65536);
        obj.put("short-circuit", false);

        JSONObject meta = new JSONObject();
        meta.put("pretests-only", false);
        meta.put("in-contest", null);
        meta.put("attempt-no", 1);
        meta.put("user", 1);

        obj.put("meta", meta);
        return obj;
    }

    @GetMapping("/testRun/{id}")
    public JSONObject getTestRun(@PathVariable UUID id) throws Exception {
        List<TestRunCaseDTO> testRunCaseList = testRunCaseService.getTestRunCasesByTestRunId(id);
        if (testRunCaseList.isEmpty()) {
            return null;
        }
        TestRunDTO dto = new TestRunDTO();
        Double time = Double.valueOf(0);
        Long memory = Long.valueOf(0);
        Long points = Long.valueOf(0);
        Result result = Result.ACCEPTED; //FIXME burayı dene reject durumu
        Status status = Status.COMPLETED;
        for (TestRunCaseDTO testRunCaseDTO : testRunCaseList) {
            if (testRunCaseDTO.getStatus() == Status.NOT_COMPLETED) {  //FIXME buryaı test et hata olunca ne oluyor
                status = Status.NOT_COMPLETED;
            }if (testRunCaseDTO.getOutput().startsWith("Compile Error")) {  //FIXME buryaı test et hata olunca ne oluyor
                result = Result.REJECTED;
            }
            Double caseTime = testRunCaseDTO.getTime();
            time += caseTime;
            Long casePoints = testRunCaseDTO.getPoint();
            points += casePoints;
            Long caseMemory = testRunCaseDTO.getMemory();
            if (memory < caseMemory) {
                memory = caseMemory;
            }
        }

        dto.setId(id);
        dto.setTime(time);
        dto.setMemory(memory);
        dto.setPoint(points);
        dto.setStatus(status);
        dto.setResult(result);
        TestRunDTO resDto = testRunService.updateTestRun(dto);
        JSONObject res = new JSONObject();
        res.put("testRunCaseList", testRunCaseList);
        res.put("testRun", resDto);
        return res;
    }

    @GetMapping("/submit/{id}")
    public JSONObject getEvalResult(@PathVariable UUID id) throws Exception {
        List<TestCaseDTO> testCaseList = testCaseService.getTestCasesBySubmissionId(id);
        if (testCaseList.isEmpty()) {
            return null;
        }
        SubmissionDTO dto = new SubmissionDTO();
        Double time = Double.valueOf(0);
        Long memory = Long.valueOf(0);
        Long points = Long.valueOf(0);
        Result result = Result.ACCEPTED; //FIXME burayı dene reject durumu
        Status status = Status.COMPLETED;
        for (TestCaseDTO testCaseDTO : testCaseList) {
            if (testCaseDTO.getStatus() == Status.NOT_COMPLETED) {  //FIXME buryaı test et hata olunca ne oluyor
                status = Status.NOT_COMPLETED;
            }
            if (testCaseDTO.getOutput().startsWith("Compile Error")) {  //FIXME buryaı test et hata olunca ne oluyor
                result = Result.REJECTED;
            }
            Double caseTime = testCaseDTO.getTime();
            time += caseTime;
            Long casePoints = testCaseDTO.getPoint();
            points += casePoints;
            Long caseMemory = testCaseDTO.getMemory();
            if (memory < caseMemory) {
                memory = caseMemory;
            }
        }

        dto.setId(id);
        dto.setTime(time);
        dto.setMemory(memory);
        dto.setPoint(points);
        dto.setStatus(status);
        dto.setResult(result);
        SubmissionDTO resDto = submissionService.updateSubmission(dto);
        JSONObject res = new JSONObject();
        res.put("testCaseList", testCaseList);
        res.put("submission", resDto);
        return res;
    }
}