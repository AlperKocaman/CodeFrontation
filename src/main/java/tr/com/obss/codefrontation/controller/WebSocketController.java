package tr.com.obss.codefrontation.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.time.Instant;
import java.util.UUID;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/judge")
public class WebSocketController {

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
				boolean check= false;
				in = new DataInputStream(server.getInputStream());
				out = new DataOutputStream(server.getOutputStream());
				int a=0;
				while(true) {
					a++;
					try {
						Thread.sleep(100);
						//String str="";
						while(in.available()>0){
							String str=in.readUTF();
							if(!str.equals("")){
								JSONObject res= (JSONObject) JSONValue.parse(str);
								//{"name": "test-case-status", "submission-id": 1, "cases": [{"position": 1, "status": 0, "time": 0.13805162, "points": 5, "total-points": 5,
								// "memory": 9684, "output": "10\n2\n", "extended-feedback": "", "feedback": ""}]}
								if(res.get("name").equals("test-case-status")){
									String submissionId= (String) res.get("submission-id");
									JSONArray cases= (JSONArray) res.get("cases");
									for (Object obj:cases){
										JSONObject caseObj= (JSONObject) obj;
										Long casePosition=(Long) caseObj.get("position");
										Long caseStatus=(Long) caseObj.get("status");
										Double caseTime=(Double) caseObj.get("time");
										Long casePoints=(Long) caseObj.get("points");
										Long caseTotalPoints=(Long) caseObj.get("total-points");
										Long caseMemory=(Long) caseObj.get("memory");
										String caseOutput = (String) caseObj.get("output");
										String caseExtendedFeedback = (String) caseObj.get("extended-feedback");
										String caseFeedback = (String) caseObj.get("feedback");
									}
								}
								//client says: {"name": "handshake", "problems": [["aplusb", 1605472737.1798956], ["shortest1", 1604807687.554187]],
								// "executors": {"AWK": [["awk", [4, 1, 4]]], "BF": [["bf", [1, 33, 7]]], "C": [["gcc", [7]]], "CPP03": [["g++", [7]]],
								// "CPP11": [["g++11", [7]]], "PERL": [["perl", [5, 26, 1]]], "PY3": [["python3", [3, 7, 9]]], "SED": [["sed", [4, 4]]]},
								// "id": "ExampleJudge", "key": "4qQG!RG9WYAbIwMq2M!:L$/~zgLErzU,o|waRd:x{4jkKRpjD}ddU>M,I%hXK{Q,9o0;d}q+p^/<j]Yl#S+/9o8j+KFPxqP}w;k{"}
								else if(res.get("name").equals("handshake")){
									JSONArray problems= (JSONArray) res.get("problems");
									JSONObject executors= (JSONObject) res.get("executors");
									String id= (String) res.get("id");
									String key= (String) res.get("key");
									for (Object problemObj:problems){
										JSONArray problem= (JSONArray) problemObj;
										String problemName= (String) problem.get(0);
									}
									executors.keySet().forEach(keyStr ->
									{
										String longCode= (String) keyStr;
										Object value = executors.get(keyStr);
										JSONArray valueArr= (JSONArray) value;
										JSONArray valueArr1= (JSONArray) valueArr.get(0);
										String langName= (String) valueArr1.get(0);
										log.info("key: "+ longCode + " value: " + langName);
									});
								}
								//submissionService.updateSubmission(submissionReq);
								log.info("client says: "+str);
							}
						}


						//JSONObject res= (JSONObject) JSONValue.parse(str);
						if(check){
							sendMessage();
							check=false;
							Thread.sleep(1000);
							sendEvaluateMessage();
						}
						if (a==5){
							check= true;
						}else{
							check= false;
						}


					} catch (SocketTimeoutException s) {
						log.info("Socket timed out!");
						break;
					} catch (IOException | InterruptedException e) {
						e.printStackTrace();
						break;
					}
				}
			}
		});
		t.start();
	}

	public void sendMessage() throws IOException {
		DataOutputStream out = new DataOutputStream(server.getOutputStream());
		//out.writeBytes("1");
		//out.flush();


		JSONObject obj=new JSONObject();
		obj.put("name","handshake-success");
		String str2=obj.toJSONString();//"{\"name\":\"handshake-success\"}";
		int len=str2.length();
		String lenStr=""+len;
		int spaceReq= 3-lenStr.length();

		for (int i=0; i<spaceReq; i++){
			lenStr+=" ";
		}
		out.writeBytes(lenStr);
		out.writeBytes(str2);
		//out.flush();
		long time= Instant.now().getEpochSecond();

		JSONObject ping=new JSONObject();
		ping.put("name","ping");
		ping.put("when",time);


		//String timeStr=Long.toString(time);;
		//{'name': 'ping', 'when': 1608427743.1646569}
		String str3=ping.toJSONString();//"{\"name\":\"ping\",\"'when'\":\"ping\"}";
		//server.close();
		int len3=str3.length();
		String lenStr3=""+len3;
		int spaceReq3= 3-lenStr3.length();

		for (int i=0; i<spaceReq3; i++){
			lenStr3+=" ";
		}

		out.writeBytes(lenStr3);
		out.writeBytes(str3);

		//out.writeBytes(lenStr3);
		//out.writeBytes(str3);
		out.flush();
	}

	public void sendEvaluateMessage() throws IOException {
		DataOutputStream out = new DataOutputStream(server.getOutputStream());
		//out.writeBytes("1");
		//out.flush();

		//{'name': 'submission-request', 'submission-id': 28, 'problem-id': 'aplusb', 'language': 'PY3',
		//        'source': 'N = int(input())\r\n\r\nfor _ in range(N):\r\n    a, b = map(int, input().split())\r\n    print(a + b)', 'time-limit': 2.0,
		//        'memory-limit': 65536, 'short-circuit': False,
		//        'meta': {'pretests-only': False, 'in-contest': None, 'attempt-no': 1, 'user': 1}}
		JSONObject obj=new JSONObject();
		obj.put("name","submission-request");
		obj.put("submission-id", UUID.randomUUID().toString());
		obj.put("problem-id","aplusb");
		obj.put("language","PY3");
		obj.put("source","N = int(input())\r\n\r\nfor _ in range(N):\r\n    a, b = map(int, input().split())\r\n    print(a + b)");
		obj.put("time-limit",2.0);
		obj.put("memory-limit",65536);
		obj.put("short-circuit",false);

		JSONObject meta=new JSONObject();
		meta.put("pretests-only",false);
		meta.put("in-contest",null);
		meta.put("attempt-no",1);
		meta.put("user",1);

		obj.put("meta",meta);

		String str2=obj.toJSONString();//"{\"name\":\"handshake-success\"}";
		int len=str2.length();
		String lenStr=""+len;
		int spaceReq= 3-lenStr.length();

		for (int i=0; i<spaceReq; i++){
			lenStr+=" ";
		}
		out.writeBytes(lenStr);
		out.writeBytes(str2);
		//out.flush();
		long time= Instant.now().getEpochSecond();

		JSONObject ping=new JSONObject();
		ping.put("name","ping");
		ping.put("when",time);


		//String timeStr=Long.toString(time);;
		//{'name': 'ping', 'when': 1608427743.1646569}
		String str3=ping.toJSONString();//"{\"name\":\"ping\",\"'when'\":\"ping\"}";
		//server.close();
		int len3=str3.length();
		String lenStr3=""+len3;
		int spaceReq3= 3-lenStr3.length();

		for (int i=0; i<spaceReq3; i++){
			lenStr3+=" ";
		}

		out.writeBytes(lenStr3);
		out.writeBytes(str3);

		//out.writeBytes(lenStr3);
		//out.writeBytes(str3);
		out.flush();
	}

	@PostMapping("/submit")
	public void eval(@RequestBody JSONObject submissionReq) throws Exception {
		String submissionStr=submissionReq.toJSONString();
		int submissionLen=submissionStr.length();
		String lenStr=""+submissionLen;
		int spaceReq= 3-lenStr.length();

		for (int i=0; i<spaceReq; i++){
			lenStr+=" ";
		}
		out.writeBytes(lenStr);
		out.writeBytes(submissionStr);
		out.flush();
		//submissionService.addSubmission(submissionReq)
	}
	@GetMapping("/submit")
	public String getEvalResult(@RequestBody JSONObject submissionReq)  {
		//submissionService.getSubmissionMetrics(submissionReq);
		return "";
	}
}