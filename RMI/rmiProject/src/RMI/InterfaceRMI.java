package RMI;
import java.rmi.Remote;
public interface InterfaceRMI extends Remote{

    public int sum(int a, int b) throws Exception;
    public int sub(int a, int b) throws Exception;
    public int mult(int a, int b) throws Exception;
    public int div(int a, int b) throws Exception;


} 