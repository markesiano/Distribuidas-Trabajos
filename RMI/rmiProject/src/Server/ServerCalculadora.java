package Server;
import RMI.InterfaceRMI;
import java.rmi.server.UnicastRemoteObject;


public class ServerCalculadora extends UnicastRemoteObject implements InterfaceRMI{
    public ServerCalculadora() throws Exception{
        super();
    }
    public int sum(int a, int b) throws Exception{
        return a + b;
    }
    public int sub(int a, int b) throws Exception{
        return a - b;
    }
    public int mult(int a, int b) throws Exception{
        return a * b;
    }
    public int div(int a, int b) throws Exception{
        return a / b;
    }
    
}
