package Client;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import javax.swing.JOptionPane;
import RMI.InterfaceRMI;

public class MainClient {
    

    public static void main(String[] args) {
        String number1 = JOptionPane.showInputDialog("Enter the first number");
        String number2 = JOptionPane.showInputDialog("Enter the second number");
        int num1 = Integer.parseInt(number1);
        int num2 = Integer.parseInt(number2);
            try {
                Registry registry = LocateRegistry.getRegistry("192.168.1.80", 1099);
                InterfaceRMI stub = (InterfaceRMI) registry.lookup("RemoteInterface");

                int response = stub.sum(num1, num2);
                JOptionPane.showMessageDialog(null, "The sum is: " + response);
    
                int response2 = stub.sub(num1, num2);
                JOptionPane.showMessageDialog(null, "The subtraction is: " + response2);
    
                int response3 = stub.mult(num1, num2);
                JOptionPane.showMessageDialog(null, "The multiplication is: " + response3);
    
                int response4 = stub.div(num1, num2);
                JOptionPane.showMessageDialog(null, "The division is: " + response4);
            } catch (RemoteException e) {
                System.err.println("Failed to connect to the RMI server: " + e.toString());
                e.printStackTrace();
            } catch (NotBoundException e) {
                System.err.println("Failed to bind to the RMI server: " + e.toString());
                e.printStackTrace();
            }catch (Exception e) {
                System.err.println("Client exception: " + e.toString());
                e.printStackTrace();
        }
    }
    
}
