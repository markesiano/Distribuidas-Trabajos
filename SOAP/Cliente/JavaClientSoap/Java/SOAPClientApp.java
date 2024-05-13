import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.regex.Pattern;

public class SOAPClientApp {
    private JFrame frame;
    private JTextField textFieldA;
    private JTextField textFieldB;
    private JButton buttonSumar;
    private JButton buttonRestar;
    private JButton buttonMultiplicar;
    private JButton buttonDividir;
    private JTextArea textArea;

    public SOAPClientApp() {
        // Configurar el estilo "Nimbus" para una apariencia más atractiva
        try {
            UIManager.setLookAndFeel("javax.swing.plaf.nimbus.NimbusLookAndFeel");
        } catch (Exception e) {
            e.printStackTrace();
        }

        frame = new JFrame("SOAP Client");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);
        frame.setLayout(new GridLayout(6, 2));

        JLabel labelA = new JLabel("Valor A:");
        JLabel labelB = new JLabel("Valor B:");
        textFieldA = new JTextField();
        textFieldB = new JTextField();
        buttonSumar = new JButton("Sumar");
        buttonRestar = new JButton("Restar");
        buttonMultiplicar = new JButton("Multiplicar");
        buttonDividir = new JButton("Dividir");
        textArea = new JTextArea();
        textArea.setEditable(false);

        // Establecer bordes para los botones
        buttonSumar.setBorder(BorderFactory.createLineBorder(Color.BLACK));
        buttonRestar.setBorder(BorderFactory.createLineBorder(Color.BLACK));
        buttonMultiplicar.setBorder(BorderFactory.createLineBorder(Color.BLACK));
        buttonDividir.setBorder(BorderFactory.createLineBorder(Color.BLACK));

        // Establecer fuentes para los botones
        Font buttonFont = new Font("Arial", Font.BOLD, 14);
        buttonSumar.setFont(buttonFont);
        buttonRestar.setFont(buttonFont);
        buttonMultiplicar.setFont(buttonFont);
        buttonDividir.setFont(buttonFont);

        frame.add(labelA);
        frame.add(textFieldA);
        frame.add(labelB);
        frame.add(textFieldB);
        frame.add(buttonSumar);
        frame.add(buttonRestar);
        frame.add(buttonMultiplicar);
        frame.add(buttonDividir);
        frame.add(new JScrollPane(textArea));

        buttonSumar.setEnabled(false);
        buttonRestar.setEnabled(false);
        buttonMultiplicar.setEnabled(false);
        buttonDividir.setEnabled(false);

        textFieldA.getDocument().addDocumentListener(new DocumentListener());
        textFieldB.getDocument().addDocumentListener(new DocumentListener());

        // Realizar la llamada SOAP para consultar al iniciar la aplicación
        updateHistory();

        buttonSumar.addActionListener(new OperationListener("sumar"));
        buttonRestar.addActionListener(new OperationListener("restar"));
        buttonMultiplicar.addActionListener(new OperationListener("multiplicar"));
        buttonDividir.addActionListener(new OperationListener("dividir"));

        frame.setVisible(true);
    }

    private void validateFields() {
        String textA = textFieldA.getText();
        String textB = textFieldB.getText();

        boolean isValidA = Pattern.matches("\\d+", textA);
        boolean isValidB = Pattern.matches("\\d+", textB);

        buttonSumar.setEnabled(isValidA && isValidB);
        buttonRestar.setEnabled(isValidA && isValidB);
        buttonMultiplicar.setEnabled(isValidA && isValidB);
        buttonDividir.setEnabled(isValidA && isValidB && !textB.equals("0"));
    }

    private void makeSOAPRequest(String operation) {
        String a = textFieldA.getText();
        String b = textFieldB.getText();
        int result = 0;

        // Realizar la operación localmente
        switch (operation) {
            case "sumar":
                result = Integer.parseInt(a) + Integer.parseInt(b);
                break;
            case "restar":
                result = Integer.parseInt(a) - Integer.parseInt(b);
                break;
            case "multiplicar":
                result = Integer.parseInt(a) * Integer.parseInt(b);
                break;
            case "dividir":
                result = Integer.parseInt(a) / Integer.parseInt(b);
                break;
        }

        // Mostrar el resultado en el área de texto
        textArea.setText("El resultado es: " + result);

        // Enviar solicitud SOAP de creación para guardar la operación en la base de datos
        sendCreateRequest(a, b, operation, result);

        // Enviar solicitud SOAP de lectura para actualizar el historial de operaciones en el área de texto
        updateHistory();
    }

    private void sendCreateRequest(String a, String b, String operation, int result) {
        // Aquí iría el código para enviar la solicitud SOAP de creación
    }

    private void updateHistory() {
        // Aquí iría el código para enviar la solicitud SOAP de lectura y actualizar el historial de operaciones en el área de texto
    }

    private class DocumentListener implements javax.swing.event.DocumentListener {
        @Override
        public void insertUpdate(javax.swing.event.DocumentEvent e) {
            validateFields();
        }

        @Override
        public void removeUpdate(javax.swing.event.DocumentEvent e) {
            validateFields();
        }

        @Override
        public void changedUpdate(javax.swing.event.DocumentEvent e) {
            validateFields();
        }
    }

    private class OperationListener implements ActionListener {
        private String operation;

        public OperationListener(String operation) {
            this.operation = operation;
        }

        @Override
        public void actionPerformed(ActionEvent e) {
            makeSOAPRequest(operation);
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new SOAPClientApp();
            }
        });
    }
}
