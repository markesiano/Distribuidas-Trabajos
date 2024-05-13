import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ServerUDPRec {
    public static void main(String[] args) {
        final int PORT = 5000;
        byte[] buffer = new byte[1024];
        boolean done = false;
        try {
            System.out.println("El server esta escuchando en el puerto " + PORT);
            DatagramSocket server = new DatagramSocket(PORT);
            while(!done){
                DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
                try{
                    server.receive(packet);
                } catch (IOException e){
                    e.printStackTrace();
                }
                String message = new String(packet.getData());
                message = message.replaceAll("\u0000.*", "");
                System.out.println("El mensaje es: " + message);
                int clientPort = packet.getPort();
                System.out.println("El puerto del cliente es: " + clientPort);
                InetAddress clientAddress = packet.getAddress();
                if (message.contains("GET")){
                    // Obtenemos en String el contenido del archivo chat_history.txt 
                    String response = new String(Files.readAllBytes(Paths.get("src\\chat_history.txt")));
                    DatagramPacket packet2 = new DatagramPacket
                                    (response.getBytes(), response.getBytes().length, clientAddress, clientPort);

                    server.send(packet2);
                    System.out.println("El historial de mensajes ha sido enviado");
                }else if (message.contains("POST")){
                    // Agrega una nueva linea al archivo chat_history.txt
                    try {
                        File file = new File("src\\chat_history.txt");
                        BufferedReader br = new BufferedReader(new FileReader(file));
                        StringBuilder sb = new StringBuilder();
                        String linea;
                        // Leer el archivo línea por línea y guardar en un StringBuilder
                        while ((linea = br.readLine()) != null) {
                            sb.append(linea);
                            sb.append(System.lineSeparator());
                        }
                        br.close();
                        // Verificar si la cadena recibida cumple con el formato "POST/Jennifer: Hola"
                        if (message.startsWith("POST/") && message.contains(": ")) {
                            // Agregar la nueva línea al final del archivo
                            sb.append(message.substring(5)); // Ignorar "POST/"
                            System.out.println("Esto es lo que se va a agregar: " + "'" +message.substring(5)+ "'");
                            sb.append('\n');
                        }
                        // Sobrescribir el archivo con el contenido actualizado
                        FileWriter fw = new FileWriter(file);
                        fw.write(sb.toString());
                        fw.close();
                        System.out.println("Se ha actualizado el archivo exitosamente.");
                    } catch (IOException e) {
                        System.err.println("Error al procesar el archivo: " + e.getMessage());
                    }
                }else{
                    done = true;
                    System.out.println("El mensaje no es GET");
                }

            }
            server.close();
        } catch (SocketException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
    }


    public class FileDB{
        private String path;
        private String message;
        public FileDB(String path, String message){
            this.path = path;
            this.message = message;
        }

        public void write(){
            File file = new File(path);
            StringBuilder sb = this.read();
            if (message.startsWith("POST/") && message.contains(": ")) {
                // Agregar la nueva línea al final del archivo
                sb.append(message.substring(5)); // Ignorar "POST/"
                System.out.println("Esto es lo que se va a agregar: " + "'" +message.substring(5)+ "'");
                sb.append('\n');
            }
            // Sobrescribir el archivo con el contenido actualizado
            try{
                FileWriter fw = new FileWriter(file);
                fw.write(sb.toString());
                fw.close();
                System.out.println("Se ha actualizado el archivo exitosamente.");
            }catch (IOException e){
                System.err.println("Error al procesar el archivo: " + e.getMessage());
            }
        }

        public StringBuilder read(){
            StringBuilder sb = new StringBuilder();
            try{
                File file = new File(path);
                BufferedReader br = new BufferedReader(new FileReader(file));
                String linea;
                // Leer el archivo línea por línea y guardar en un StringBuilder
                while ((linea = br.readLine()) != null) {
                    sb.append(linea);
                    sb.append(System.lineSeparator());
                }
                br.close();
            }catch (IOException e){
                e.printStackTrace();
            }
            return sb;
        }
    }

    public class HistoryChatByTxt{
        private String path;
        public HistoryChatByTxt(String path){
            this.path = path;
        }

        public String readHistoryChat(){
            String historyChat = "";
            try {
                historyChat = new String(Files.readAllBytes(Paths.get(path)));
            } catch (IOException e) {
                e.printStackTrace();
            }
            return historyChat;
        }
    }
    
}

