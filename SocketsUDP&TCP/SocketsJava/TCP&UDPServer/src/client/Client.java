package client;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class Client implements Runnable{

    private Socket client;
    private BufferedReader in;
    private PrintWriter out;
    private boolean done;

    @Override
    public void run(){
        try{
            client = new Socket("127.0.0.1", 9999);
            out =  new PrintWriter(client.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(client.getInputStream()));

            InputHandler input = new InputHandler();
            Thread t = new Thread(input);
            t.start();

            String inMessage;
            while((inMessage = in.readLine()) != null){
                System.out.println(inMessage);
            }

        } catch (IOException e){
            shutdown();
        }
    }

    public void shutdown(){
        done = true;
        if(!client.isClosed()){
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            out.close();
            try{

                client.close();
            }catch(IOException e){
            }
        }
    }

    class InputHandler implements Runnable{

        @Override
        public void run(){
            try{
                BufferedReader inRe = new BufferedReader(new InputStreamReader(System.in));
                while(!done){
                    String message = inRe.readLine();
                    if (message.equals("/quit")){
                        out.println(message);
                        inRe.close();
                        shutdown();
                    } else {

                        out.println(message);

                    }
                }
            }catch(IOException e){
                shutdown();

            }
        }

    }

    public static void main(String[] args){
        Client client = new Client();
        client.run();

    }
    
}
