package tr.com.obss.codefrontation.websocket;
/*
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import java.net.*;
import java.io.*;
import java.time.Instant;
import java.util.Date;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class SocketServerExample1 extends Thread {
    public static ServerSocket serverSocket;
    private static final Gson gson = new GsonBuilder().create();
    public static  Socket server;
    public SocketServerExample1(int port) throws IOException {
        serverSocket = new ServerSocket(port);
        //serverSocket.setSoTimeout(10000);
    }

    public void run() {
        Boolean check= true;
        while(true) {
            try {
                DataInputStream in = new DataInputStream(server.getInputStream());
                String str="";
                while(in.available()>0){
                    str=in.readUTF();
                    System.out.println("client says: "+str);
                }

                JSONObject res= (JSONObject) JSONValue.parse(str);
                if(check){
                    sendMessage();
                    check=false;
                    Thread.sleep(1000);
                    sendEvaluateMessage();
                }
                //.out.println(in.readUTF());

            } catch (SocketTimeoutException s) {
                System.out.println("Socket timed out!");
                break;
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
                break;
            }
        }
    }

    public static void main(String [] args) {
        int port = 9999;
        try {
            Thread t = new SocketServerExample1(port);
            System.out.println("Waiting for client on port " +
                    serverSocket.getLocalPort() + "...");
            server = serverSocket.accept();
            System.out.println("Just connected to " + server.getRemoteSocketAddress());
            t.start();
            Thread t1 = new Thread(new Runnable() {
                @Override
                public void run() {
                    Socket client = null;
                    try {
                        client = new Socket("localhost", port);


                    System.out.println("For ping Just connected to " + client.getRemoteSocketAddress());
                    OutputStream outToServer = client.getOutputStream();
                    DataOutputStream out = new DataOutputStream(outToServer);
                        long time= Instant.now().getEpochSecond();

                                JSONObject obj=new JSONObject();
                                obj.put("name","ping");
                                obj.put("'when'",time);


                        //String timeStr=Long.toString(time);;
                        //{'name': 'ping', 'when': 1608427743.1646569}
                    String str2=obj.toJSONString();//"{\"name\":\"ping\",\"'when'\":\"ping\"}";
                    out.writeBytes(str2);
                    out.flush();
                        Thread.sleep(1000);
                    //out.writeUTF("Hello from " + client.getLocalSocketAddress());
                    } catch (IOException | InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            });
            //t1.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendMessage() throws IOException {
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

    public static void sendEvaluateMessage() throws IOException {
        DataOutputStream out = new DataOutputStream(server.getOutputStream());
        //out.writeBytes("1");
        //out.flush();

        //{'name': 'submission-request', 'submission-id': 28, 'problem-id': 'aplusb', 'language': 'PY3',
        //        'source': 'N = int(input())\r\n\r\nfor _ in range(N):\r\n    a, b = map(int, input().split())\r\n    print(a + b)', 'time-limit': 2.0,
        //        'memory-limit': 65536, 'short-circuit': False,
        //        'meta': {'pretests-only': False, 'in-contest': None, 'attempt-no': 1, 'user': 1}}
        JSONObject obj=new JSONObject();
        obj.put("name","submission-request");
        obj.put("submission-id",1);
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
}*/