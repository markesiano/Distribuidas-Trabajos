import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import org.json.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class App extends JFrame {
    // GraphQL endpoint URL
    private static final String GRAPHQL_URL = "http://localhost:5000";

    // Components
    private JTextField nameField, descriptionField, priceField, stockField;
    private JTable productsTable;
    private DefaultTableModel tableModel;
    private String selectedProductId; // ID del producto seleccionado para la actualización

    public App() {
        setTitle("CRUD Interfaz para GraphQL");
        setSize(800, 600);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        // Product input fields
        JPanel inputPanel = new JPanel(new GridLayout(4, 2));
        inputPanel.add(new JLabel("Nombre:"));
        nameField = new JTextField();
        inputPanel.add(nameField);
        inputPanel.add(new JLabel("Descripción:"));
        descriptionField = new JTextField();
        inputPanel.add(descriptionField);
        inputPanel.add(new JLabel("Precio:"));
        priceField = new JTextField();
        inputPanel.add(priceField);
        inputPanel.add(new JLabel("Stock:"));
        stockField = new JTextField();
        inputPanel.add(stockField);

        // Buttons
        JPanel buttonPanel = new JPanel();
        JButton addButton = new JButton("Agregar Producto");
        addButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                createProduct();
            }
        });
        buttonPanel.add(addButton);

        JButton updateButton = new JButton("Actualizar Producto");
        updateButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                updateProduct();
            }
        });
        buttonPanel.add(updateButton);

        JButton deleteButton = new JButton("Eliminar Producto");
        deleteButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                deleteProduct();
            }
        });
        buttonPanel.add(deleteButton);

        // Update List button
        JButton updateListButton = new JButton("Actualizar Lista");
        updateListButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                refreshProductsList();
            }
        });
        buttonPanel.add(updateListButton);

        // Products list
        String[] columns = {"ID", "Nombre", "Descripción", "Precio", "Stock"};
        tableModel = new DefaultTableModel(columns, 0);
        productsTable = new JTable(tableModel);
        productsTable.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        productsTable.getSelectionModel().addListSelectionListener(new ListSelectionListener() {
            public void valueChanged(ListSelectionEvent event) {
                int row = productsTable.getSelectedRow();
                if (row >= 0) {
                    selectedProductId = (String) tableModel.getValueAt(row, 0); // Obtener el ID del producto seleccionado
                    nameField.setText((String) tableModel.getValueAt(row, 1));
                    descriptionField.setText((String) tableModel.getValueAt(row, 2));
                    priceField.setText((String) tableModel.getValueAt(row, 3));
                    stockField.setText((String) tableModel.getValueAt(row, 4));
                }
            }
        });
        JScrollPane tableScrollPane = new JScrollPane(productsTable);

        // Layout
        setLayout(new BorderLayout());
        add(inputPanel, BorderLayout.NORTH);
        add(buttonPanel, BorderLayout.CENTER);
        add(tableScrollPane, BorderLayout.SOUTH);

        // Initialize products list
        refreshProductsList();
    }

    private void refreshProductsList() {
        try {
            String query = "{\"query\":\"{ getProducts { id name description price stock } }\"}";
            JSONObject jsonResponse = executeGraphQLQuery(query);

            if (jsonResponse.has("data")) {
                JSONArray productsArray = jsonResponse.getJSONObject("data").getJSONArray("getProducts");

                tableModel.setRowCount(0);
                for (int i = 0; i < productsArray.length(); i++) {
                    JSONObject product = productsArray.getJSONObject(i);
                    String id = product.getString("id");
                    String name = product.getString("name");
                    String description = product.getString("description");
                    Float price = product.getFloat("price");
                    int stock = product.getInt("stock");
                    tableModel.addRow(new String[]{id, name, description, Float.toString(price), Integer.toString(stock)});
                }
            } else if (jsonResponse.has("errors")) {
                JOptionPane.showMessageDialog(this, "Error al obtener los productos: " + jsonResponse.getJSONArray("errors").toString(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        } catch (IOException | JSONException e) {
            JOptionPane.showMessageDialog(this, "Error de conexión: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void createProduct() {
        try {
            String name = nameField.getText();
            String description = descriptionField.getText();
            Float price = Float.parseFloat(priceField.getText());
            int stock = Integer.parseInt(stockField.getText());

            String mutation = String.format("{\"query\":\"mutation($input: ProductInput) { createProduct(input: $input) { description name price stock } }\",\"variables\":{\"input\":{\"name\":\"%s\",\"description\":\"%s\",\"price\":%f,\"stock\":%d}}}", name, description, price, stock);
            JSONObject jsonResponse = executeGraphQLQuery(mutation);

            if (jsonResponse.has("data")) {
                JOptionPane.showMessageDialog(this, "Producto creado exitosamente", "Éxito", JOptionPane.INFORMATION_MESSAGE);
                refreshProductsList();
                clearFields(); // Limpiar campos después de agregar producto
            } else if (jsonResponse.has("errors")) {
                JOptionPane.showMessageDialog(this, "Error al crear el producto: " + jsonResponse.getJSONArray("errors").toString(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(this, "Error de formato: Precio y stock deben ser números válidos", "Error", JOptionPane.ERROR_MESSAGE);
        } catch (IOException | JSONException e) {
            JOptionPane.showMessageDialog(this, "Error de conexión: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void updateProduct() {
        try {
            if (selectedProductId == null || selectedProductId.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Por favor selecciona un producto de la lista para actualizar", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }

            String name = nameField.getText();
            String description = descriptionField.getText();
            Float price = Float.parseFloat(priceField.getText());
            int stock = Integer.parseInt(stockField.getText());

            String mutation = String.format("{\"query\":\"mutation Mutation($id: ID!, $input: ProductInput) { updateProduct(ID: $id, input: $input) }\",\"variables\":{\"id\":\"%s\",\"input\":{\"name\":\"%s\",\"description\":\"%s\",\"price\":%f,\"stock\":%d}}}", selectedProductId, name, description, price, stock);
            JSONObject jsonResponse = executeGraphQLQuery(mutation);

            if (jsonResponse.has("data")) {
                JOptionPane.showMessageDialog(this, "Producto actualizado exitosamente", "Éxito", JOptionPane.INFORMATION_MESSAGE);
                refreshProductsList();
                clearFields(); // Limpiar campos después de actualizar producto
            } else if (jsonResponse.has("errors")) {
                JOptionPane.showMessageDialog(this, "Error al actualizar el producto: " + jsonResponse.getJSONArray("errors").toString(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(this, "Error de formato: Precio y stock deben ser números válidos", "Error", JOptionPane.ERROR_MESSAGE);
        } catch (IOException | JSONException e) {
            JOptionPane.showMessageDialog(this, "Error de conexión: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void deleteProduct() {
        int option = JOptionPane.showConfirmDialog(this, "¿Estás seguro de que deseas eliminar este producto?", "Confirmar eliminación", JOptionPane.YES_NO_OPTION);
        if (option == JOptionPane.YES_OPTION) {
            try {
                if (selectedProductId == null || selectedProductId.isEmpty()) {
                    JOptionPane.showMessageDialog(this, "Por favor selecciona un producto de la lista para eliminar", "Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }

                String mutation = String.format("{\"query\":\"mutation Mutation($id: ID!) { deleteProduct(ID: $id) }\",\"variables\":{\"id\":\"%s\"}}", selectedProductId);
                JSONObject jsonResponse = executeGraphQLQuery(mutation);

                if (jsonResponse.has("data")) {
                    JOptionPane.showMessageDialog(this, "Producto eliminado exitosamente", "Éxito", JOptionPane.INFORMATION_MESSAGE);
                    refreshProductsList();
                    clearFields(); // Limpiar campos después de eliminar producto
                } else if (jsonResponse.has("errors")) {
                    JOptionPane.showMessageDialog(this, "Error al eliminar el producto: " + jsonResponse.getJSONArray("errors").toString(), "Error", JOptionPane.ERROR_MESSAGE);
                }
            } catch (IOException | JSONException e) {
                JOptionPane.showMessageDialog(this, "Error de conexión: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }

    private void clearFields() {
        nameField.setText("");
        descriptionField.setText("");
        priceField.setText("");
        stockField.setText("");
    }

    private JSONObject executeGraphQLQuery(String query) throws IOException, JSONException {
        URL url = new URL(GRAPHQL_URL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = query.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            return new JSONObject(response.toString());
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new App().setVisible(true);
            }
        });
    }
}

