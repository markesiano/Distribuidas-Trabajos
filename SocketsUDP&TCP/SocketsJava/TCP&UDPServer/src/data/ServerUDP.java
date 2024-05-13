package data;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;

import data.sources.History.HistoryChatByDB;
import data.sources.savedata.FileDB;
import interfaces.IHistory;



public class ServerUDP {
    public static void main(String[] args) {
        final int PORT = 5000;
        byte[] buffer = new byte[1024];
        boolean done = false;
        IHistory history = new HistoryChatByDB(); // Use the instance to instantiate HistoryChatByTxt
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
                    try{
                        String response = history.readHistoryChat();   // Use the instance to call the method readHistoryChat
                        DatagramPacket packet2 = new DatagramPacket
                        (response.getBytes(), response.getBytes().length, clientAddress, clientPort);
                        server.send(packet2);
                        System.out.println("El historial de mensajes ha sido enviado");
                    } catch (Exception e){
                        System.out.println("Error al obtener el historial de mensajes: " + e.getMessage());
                    }


                }else if (message.contains("POST")){
                    FileDB fileDB = new FileDB(message, history); // Use the instance to instantiate FileDB
                    fileDB.write();
                }else{
                    done = true;
                    System.out.println("El mensaje no es GET ni POST");
                }

            }
            server.close();
        } catch (SocketException e) {
            e.printStackTrace();
        } 
        
    }

}

