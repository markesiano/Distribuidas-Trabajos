package data;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import data.sources.History.HistoryChatByDBServer;

import interfaces.IHistoryRMI;

public class ServerRMI {
    public static void main(String[] args) {
        try {
            Registry registry = LocateRegistry.createRegistry(1099);

            IHistoryRMI history = new HistoryChatByDBServer();
            IHistoryRMI stub = (IHistoryRMI) UnicastRemoteObject.exportObject(history, 1100);

            registry = LocateRegistry.getRegistry();
            registry.rebind("history", stub);
        
            System.out.println("Server is running...");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}
