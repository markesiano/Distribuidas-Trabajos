package server;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Server implements Runnable{


    private ArrayList<ConnectionHandler> connections;
    private ServerSocket server;
    private boolean done;
    private ExecutorService pool;

    public Server(){
        connections = new ArrayList<>();
        done = false;
    }

    @Override
    public void run() {
        try{

            server =  new ServerSocket(9999);
            pool = Executors.newCachedThreadPool();
            while (!done){
                Socket client = server.accept();
                ConnectionHandler handler = new ConnectionHandler(client);
                connections.add(handler);
                pool.execute(handler);
            }

            
        }catch(Exception e){
            shutdown();
        }
    }

    
    public void broadcast(String message){
        for(ConnectionHandler ch : connections){
            if(ch != null){
                ch.sendMessage(message);
            }
        }
    }

    public void shutdown(){
        done = true;
        if(!server.isClosed()){
            try{
                server.close();
            }catch(IOException e){
            }
        }
        for(ConnectionHandler ch : connections){
            if(ch != null){
                ch.sendMessage("El servidor se ha cerrado");
                ch.shutdown();
            }
        }
    }




    class ConnectionHandler implements Runnable{
        private Socket client;
        private BufferedReader in;
        private PrintWriter out;
        private String nickname;

        public ConnectionHandler(Socket client){
            this.client = client;
        }

        @Override
        public void run() {
            try{

                out = new PrintWriter(client.getOutputStream(), true);
                in = new BufferedReader(new InputStreamReader(client.getInputStream()));

                out.println("Ingresa tu nombre: ");
                nickname = in.readLine();
                System.out.println("El cliente " + nickname + " se ha conectado");

                out.println(getHistory());

                broadcast(nickname + " se ha conectado");

                String message;
                while((message = in.readLine()) != null){
                    System.out.println("Este es el mensaje: " + message);

                    if (message.startsWith("/nick")){
                        String[] messageSplit = message.split(" ",2);
                        if(messageSplit.length == 2){
                            broadcast(nickname + " cambió su nombre a " + messageSplit[1]);
                            System.out.println(nickname + " cambió su nombre a " + messageSplit[1]);
                            nickname = messageSplit[1];
                            out.println("Has cambiado tu nombre a " + messageSplit[1]);
                        }else{
                            out.println("No se dió ningun nombre para cambiar");
                        }
                        
                    }else if (message.startsWith("/quit")){
                        broadcast(nickname + " se ha desconectado");
                        shutdown();
                    }else{
                        broadcast(nickname + ": " + message);
                    }
                    
                }


            }catch(IOException e){
                shutdown();
            }
        }


        // Método para obtener el historial de mensajes
        public String getHistory(){
            final int PUERTO = 5000;
            byte[] buffer = new byte[1024];
            String history = "";
            try{
                InetAddress address = InetAddress.getByName("127.0.0.1");
                DatagramSocket server = new DatagramSocket();
                String message = "GET";
                DatagramPacket packet = new DatagramPacket(message.getBytes(), message.getBytes().length, address, PUERTO);
                server.send(packet);
                DatagramPacket packet2 = new DatagramPacket(buffer, buffer.length);
                server.receive(packet2);
                history = new String(packet2.getData());
                System.out.println("El historial de mensajes es: " + history);
                server.close();
            }catch(SocketException e){
                e.printStackTrace();
            }catch(IOException e){
                e.printStackTrace();
            }
            return history;
        }
        

        public void sendMessage(String message){
            out.println(message);
        }

        public void shutdown(){
            try{
                in.close();
                out.close();
                if (!client.isClosed()){
                    try{
                        client.close();
                    }catch(IOException e){
                    }
                }
            }catch(IOException e){
            }
                  
        }

    
    
    }
    public static void main(String[] args) {
        Server server = new Server();
        server.run();

    }
}
