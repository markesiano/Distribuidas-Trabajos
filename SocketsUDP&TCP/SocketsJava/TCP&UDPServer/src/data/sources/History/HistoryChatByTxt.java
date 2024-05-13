package data.sources.History;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import interfaces.IHistory;

public class HistoryChatByTxt implements IHistory{
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
