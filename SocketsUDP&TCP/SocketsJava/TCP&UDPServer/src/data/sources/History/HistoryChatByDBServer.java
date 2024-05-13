package data.sources.History;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import interfaces.IHistoryRMI;

public class HistoryChatByDBServer implements IHistoryRMI{


    public HistoryChatByDBServer() throws java.rmi.RemoteException{
        super();
    }
    public String readHistoryChat(){
        String historyChat = "Historial \n";

        //get connection
        try(Connection connection = getConnection()){
            if (connection != null){
                System.out.println("Conectado a la base de datos");

                // Get history chat from database and return it

                String query = "SELECT * FROM mensajes";
                try (PreparedStatement ps = connection.prepareStatement(query)){
                    ResultSet rs = ps.executeQuery();
                    System.out.println("Resultado de la consulta: " + rs);
                    
                    while (rs.next()){
                        historyChat += rs.getString("nombre") + ": " + rs.getString("message") + "\n";
                    }
                    return historyChat;
                } catch (SQLException e){
                    System.out.println("Error al ejecutar la consulta: " + e.getMessage());
                }    
            }
        } catch (SQLException e){
            System.out.println("Error al conectarse a la base de datos: " + e.getMessage());
        }
        return historyChat;
    }


    public Connection getConnection() throws SQLException{
        String host = "127.0.0.1";
        String user = "root";
        String password = "12345";
        int port = 3306;
        String database = "chat";
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e){
            e.printStackTrace();
        }

        String url = String.format("jdbc:mysql://%s:%d/%s", host, port, database);
        return DriverManager.getConnection(url, user, password);
    }


}