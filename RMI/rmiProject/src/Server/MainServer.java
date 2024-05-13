package Server;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class MainServer {
        
        public static void main(String[] args) {
            try{
                Registry registry = LocateRegistry.createRegistry(1099);
                registry.rebind("RemoteInterface", new ServerCalculadora());
                System.out.println("Server is running...");

            }catch(Exception e){
                System.err.println("Server exception: " + e.toString());
                e.printStackTrace();
            }
        }
    
}
