package data.sources.savedata;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import interfaces.IHistory;


public class FileDB{
    String path = "src\\chat_history.txt";
    private String message;
    private IHistory history;
    public FileDB(String message, IHistory history){
        this.message = message;
        this.history = history;
    }

    public void write(){

        // Obtener el contenido actual del archivo
        try{
        String historyChat = history.readHistoryChat();


        StringBuilder sb = new StringBuilder(historyChat);
        
        if (message.startsWith("POST/") && message.contains(": ")) {
            // Agregar la nueva línea al final del archivo
            sb.append(message.substring(5)); // Ignorar "POST/"
            System.out.println("Esto es lo que se va a agregar: " + "'" +message.substring(5)+ "'");
            sb.append('\n');
        }
        // Sobrescribir el archivo con el contenido actualizado
        try{
            File file = new File(path);
            FileWriter fw = new FileWriter(file);
            fw.write(sb.toString());
            fw.close();
            System.out.println("Se ha actualizado el archivo exitosamente.");
        }catch (IOException e){
            System.err.println("Error al procesar el archivo: " + e.getMessage());
        }
        }catch (Exception e){
            System.err.println("Error al obtener el historial de mensajes: " + e.getMessage());
        }
    }
}