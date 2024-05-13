package interfaces;
import java.rmi.Remote;

public interface IHistory extends Remote{
    public String readHistoryChat() throws Exception;
}
