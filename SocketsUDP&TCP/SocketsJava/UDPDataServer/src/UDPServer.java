import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

class HistoryManager {
    private String filePath;

    public HistoryManager(String filePath) {
        this.filePath = filePath;
    }

    public String getHistory() {
        try {
            BufferedReader reader = new BufferedReader(new FileReader(filePath));
            StringBuilder history = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                history.append(line).append("\n");
            }
            reader.close();
            return history.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void appendMessage(String message) {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(filePath, true));
            writer.write(message + "\n");
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class MessageHandler {
    private DatagramSocket server;
    private HistoryManager historyManager;

    public MessageHandler(DatagramSocket server, HistoryManager historyManager) {
        this.server = server;
        this.historyManager = historyManager;
    }

    public void handleMessage(byte[] message, InetAddress address, int port) {
        String decodedMessage = new String(message);
        System.out.println("Mensaje recibido: " + decodedMessage);
        if (decodedMessage.startsWith("GET")) {
            String history = historyManager.getHistory();
            byte[] sendData = history.getBytes();
            DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, address, port);
            try {
                server.send(sendPacket);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if (decodedMessage.startsWith("PUT")) {
            historyManager.appendMessage(decodedMessage.substring(4));
        }
    }
}

public class UDPServer {
    public static void main(String[] args) {
        try {
            DatagramSocket server = new DatagramSocket(9000, InetAddress.getByName("127.0.0.1"));
            HistoryManager historyManager = new HistoryManager("src\\chat_history.txt");
            MessageHandler messageHandler = new MessageHandler(server, historyManager);

            System.out.println("Servidor escuchando...");
            while (true) {
                byte[] receiveData = new byte[1024];
                DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
                server.receive(receivePacket);
                InetAddress address = receivePacket.getAddress();
                int port = receivePacket.getPort();
                byte[] message = receivePacket.getData();
                messageHandler.handleMessage(message, address, port);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}