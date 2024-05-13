package interfaces;
import java.rmi.Remote;

public interface IHistoryRMI extends Remote{
    public String readHistoryChat() throws java.rmi.RemoteException;    
}
