package tr.com.obss.codefrontation.websocket;
/*
import java.io.*;
import java.lang.ClassNotFoundException;
import java.net.ServerSocket;
import java.net.Socket;
*/
/**
 * This class implements java Socket server
 * @author pankaj
 *
 */
/*
public class SocketServerExample {
    
    //static ServerSocket variable
    private static ServerSocket server;
    //socket server port on which it will listen
    private static int port = 9999;
    
    public static void main(String args[]) throws IOException, ClassNotFoundException{
        //create the socket server object
        server = new ServerSocket(port);
        //keep listens indefinitely until receives 'exit' call or program terminates

        while(true){
            System.out.println("Waiting for the client request");
            Socket socket = server.accept();
            //creating socket and waiting for client connection

            //read from socket to ObjectInputStream object
            //ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
            //convert ObjectInputStream object to String
            String line, message = "";
            //BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream(), "UTF-8"));

            //b'{"name":"handshake-success"'     27
            DataInputStream din=new DataInputStream(socket.getInputStream());
            DataOutputStream dout=new DataOutputStream(socket.getOutputStream());
            String str="",str2="{\"name\":\"handshake-success\"}";
            while(din.available()>0){
                str=din.readUTF();
                System.out.println("client says: "+str);
                //str2=br.readLine();
                //dout.writeUTF(str2);

            }
            dout.writeBytes(str2);
            dout.flush();
            //socket.close();
            //din.close();
            //socket.close();
            //server.close();

            //String res=readLine(socket.getInputStream());
            //System.out.println(res);




            //ystem.out.println("Reading Metadata");
            //hile((line = br.readLine())!= null) {
            //   if(!line.equals("over")) {
            //       System.out.println(line);
            //       message += line+"\n";
            //   } else {
            //       System.out.println("OVER");
            //       break;
            //   }
            //
            //ystem.out.println("Metadata Done:");
            //ystem.out.println(message);

            //decompress yap al, compress yap gönder
//
            //public static void main(String argv[]) throws Exception {
            //    String sentence = "hello";
            //    String modifiedSentence;
            //    //BufferedReader inFromUser = new BufferedReader(new InputStreamReader(System.in));
            //    Socket clientSocket = new Socket("localhost", 6789);
            //    DataOutputStream outToServer = new DataOutputStream(
            //            clientSocket.getOutputStream());
            //    BufferedReader inFromServer = new BufferedReader(new InputStreamReader(
            //            clientSocket.getInputStream()));
            //    //sentence = inFromUser.readLine();
            //    outToServer.writeBytes(sentence + '\n');
            //    modifiedSentence = inFromServer.readLine();
            //    System.out.println("FROM SERVER: " + modifiedSentence);
            //    clientSocket.close();
            //}



            //String message = (String) ois.readObject();
            //System.out.println("Message Received: " + message);
            ////create ObjectOutputStream object
            //ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
            ////write object to Socket
            //oos.writeObject("Hi Client "+message);
            ////close resources
            //ois.close();
            //oos.close();
            //socket.close();
            //terminate the server if client sends exit request
            if(message.equalsIgnoreCase("exit")) break;
        }
        System.out.println("Shutting down Socket server!!");
        //close the ServerSocket object
        server.close();
    }
    public static String readLine(InputStream in) throws IOException {
        StringBuilder sb = new StringBuilder();
        int readByte = in.read();
        while (readByte>-1 && readByte!= '\n')
        {
            sb.append((char) readByte);
            readByte = in.read();
        }
        return sb.length()==0?null:sb.toString();
    }
}*/