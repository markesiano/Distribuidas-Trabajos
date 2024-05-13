package net.codejava;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

public class SOAPClientApp extends JFrame implements ActionListener {
    private JLabel labelA, labelB;
    private JTextField entryA, entryB;
    private JButton buttonSumar, buttonRestar, buttonMultiplicar, buttonDividir;
    private JTextArea textArea;

    public SOAPClientApp() {
        setTitle("SOAP Client");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Crear widgets
        labelA = new JLabel("Valor A:");
        labelB = new JLabel("Valor B:");
        entryA = new JTextField();
        entryB = new JTextField();
        buttonSumar = new JButton("Sumar");
        buttonRestar = new JButton("Restar");
        buttonMultiplicar = new JButton("Multiplicar");
        buttonDividir = new JButton("Dividir");

        textArea = new JTextArea(10, 50);
        textArea.setEditable(false);

        // Ubicar widgets en la ventana
        setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(5, 5, 5, 5);

        gbc.gridx = 0;
        gbc.gridy = 0;
        add(labelA, gbc);

        gbc.gridx = 1;
        gbc.gridy = 0;
        add(entryA, gbc);

        gbc.gridx = 0;
        gbc.gridy = 1;
        add(labelB, gbc);

        gbc.gridx = 1;
        gbc.gridy = 1;
        add(entryB, gbc);

        gbc.gridx = 0;
        gbc.gridy = 2;
        add(buttonSumar, gbc);

        gbc.gridx = 1;
        gbc.gridy = 2;
        add(buttonRestar, gbc);

        gbc.gridx = 0;
        gbc.gridy = 3;
        add(buttonMultiplicar, gbc);

        gbc.gridx = 1;
        gbc.gridy = 3;
        add(buttonDividir, gbc);

        gbc.gridx = 0;
        gbc.gridy = 4;
        gbc.gridwidth = 2;
        add(new JScrollPane(textArea), gbc);

        // Unable for user to edit the textArea
        textArea.setText("Historial de operaciones\n");

        // Enlazar validación de campos con la habilitación de los botones
        entryA.getDocument().addDocumentListener(new DocumentListener());
        entryB.getDocument().addDocumentListener(new DocumentListener());

        // Refresh history
        refreshHistory();

        // Agregar listeners a los botones
        buttonSumar.addActionListener(this);
        buttonRestar.addActionListener(this);
        buttonMultiplicar.addActionListener(this);
        buttonDividir.addActionListener(this);

        pack();
        setLocationRelativeTo(null);
        setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        String operation = "";
        Object source = e.getSource();
        if (source == buttonSumar) {
            operation = "sumar";
        } else if (source == buttonRestar) {
            operation = "restar";
        } else if (source == buttonMultiplicar) {
            operation = "multiplicar";
        } else if (source == buttonDividir) {
            operation = "dividir";
        }

        String a = entryA.getText();
        String b = entryB.getText();

        if (!a.isEmpty() && !b.isEmpty()) {
            makeSOAPRequest(operation, a, b);
        }
    }

    public void makeSOAPRequest(String operation, String a, String b) {
        // Construir la solicitud SOAP
        String soapRequest = String.format("""
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://servicios/">
                   <soapenv:Header/>
                   <soapenv:Body>
                      <tns:%s>
                         <a>%s</a>
                         <b>%s</b>
                      </tns:%s>
                   </soapenv:Body>
                </soapenv:Envelope>
                """, operation, a, b, operation);

        String url = "https://web-service-java-jjj.azurewebsites.net/ws/Calculadora?wsdl";
        HttpURLConnection connection = null;
        try {
            URL endpoint = new URL(url);
            connection = (HttpURLConnection) endpoint.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "text/xml;charset=UTF-8");
            connection.setDoOutput(true);
            connection.getOutputStream().write(soapRequest.getBytes());

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                Scanner scanner = new Scanner(connection.getInputStream());
                StringBuilder response = new StringBuilder();
                while (scanner.hasNextLine()) {
                    response.append(scanner.nextLine());
                }
                scanner.close();

                String result = parseSOAPResponse(response.toString());
                if (result != null) {
                    String message = switch (operation) {
                        case "sumar" -> String.format("La suma es: %s", result);
                        case "restar" -> String.format("La resta es: %s", result);
                        case "multiplicar" -> String.format("La multiplicación es: %s", result);
                        case "dividir" -> String.format("La división es: %s", result);
                        default -> "";
                    };
                    JOptionPane.showMessageDialog(this, message, "Resultado", JOptionPane.INFORMATION_MESSAGE);
                    refreshHistory();
                }
            } else {
                JOptionPane.showMessageDialog(this, "Error en la solicitud SOAP", "Error", JOptionPane.ERROR_MESSAGE);
            }
        } catch (IOException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(this, "No se pudo conectar con el servidor", "Error", JOptionPane.ERROR_MESSAGE);
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    public String parseSOAPResponse(String soapResponse) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(soapResponse)));

            // Obtener el resultado del XML
            String result = doc.getElementsByTagName("return").item(0).getTextContent();
            saveOperation(result);
            return result;
        } catch (ParserConfigurationException | IOException | org.xml.sax.SAXException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void saveOperation(String result) {
        String operation = entryA.getText() + " + " + entryB.getText() + " = " + result;

        // Aquí podrías hacer la solicitud SOAP para guardar la operación
    }

    public void refreshHistory() {
        // Aquí podrías hacer la solicitud SOAP para obtener el historial de operaciones
        String history = "Historial de operaciones\n";
        textArea.setText(history);
    }

    class DocumentListener implements javax.swing.event.DocumentListener {
        public void insertUpdate(javax.swing.event.DocumentEvent e) {
            checkFields();
        }

        public void removeUpdate(javax.swing.event.DocumentEvent e) {
            checkFields();
        }

        public void changedUpdate(javax.swing.event.DocumentEvent e) {
            // Plain text components do not fire these events
        }

        private void checkFields() {
            boolean enableButtons = !entryA.getText().isEmpty() && !entryB.getText().isEmpty();
            buttonSumar.setEnabled(enableButtons);
            buttonRestar.setEnabled(enableButtons);
            buttonMultiplicar.setEnabled(enableButtons);
            buttonDividir.setEnabled(enableButtons);
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(SOAPClientApp::new);
    }
}
