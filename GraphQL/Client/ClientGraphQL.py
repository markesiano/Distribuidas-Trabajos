import tkinter as tk
from tkinter import ttk
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

# Endpoint for the GraphQL API
transport = AIOHTTPTransport(url="http://localhost:5000")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

def get_products():
    query = gql("""
        query {
            getProducts {
                id
                name
                description
                price
                stock
            }
        }
    """)
    return client.execute(query)

def create_product(name, description, price, stock):
    mutation = gql("""
        mutation($input: ProductInput!) {
            createProduct(input: $input) {
                name
                description
                price
                stock
            }
        }
    """)
    variables = {"input": {"name": name, "description": description, "price": price, "stock": stock}}
    return client.execute(mutation, variable_values=variables)

def update_product(id, name, description, price, stock):
    mutation = gql("""
        mutation($id: ID!, $input: ProductInput!) {
            updateProduct(ID: $id, input: $input)
        }
    """)
    variables = {"id": id, "input": {"name": name, "description": description, "price": price, "stock": stock}}
    return client.execute(mutation, variable_values=variables)

def delete_product(id):
    mutation = gql("""
        mutation($id: ID!) {
            deleteProduct(ID: $id)
        }
    """)
    return client.execute(mutation, variable_values={"id": id})

def refresh_products_list():
    products = get_products()
    products_list.delete(*products_list.get_children())
    for product in products["getProducts"]:
        products_list.insert("", tk.END, values=(product['id'], product['name'], product['description'], product['price'], product['stock']))

def on_submit():
    name = name_entry.get()
    description = description_entry.get()
    price = float(price_entry.get())
    stock = int(stock_entry.get())
    create_product(name, description, price, stock)
    refresh_products_list()
    clear_fields()

def on_update():
    selection = products_list.selection()
    if selection:
        index = products_list.index(selection[0])
        product = products_list.item(selection)["values"]
        product_id = product[0]
        name = name_entry.get()
        description = description_entry.get()
        price = float(price_entry.get())
        stock = int(stock_entry.get())
        update_product(product_id, name, description, price, stock)
        refresh_products_list()
        clear_fields()

def on_delete():
    selection = products_list.selection()
    if selection:
        product_id = products_list.item(selection)["values"][0]
        delete_product(product_id)
        refresh_products_list()
        clear_fields()

def on_refresh():
    refresh_products_list()

def clear_fields():
    name_entry.delete(0, tk.END)
    description_entry.delete(0, tk.END)
    price_entry.delete(0, tk.END)
    stock_entry.delete(0, tk.END)

def fill_fields(event):
    selection = products_list.selection()
    if selection:
        product = products_list.item(selection)["values"]
        name_entry.delete(0, tk.END)
        name_entry.insert(0, product[1])
        description_entry.delete(0, tk.END)
        description_entry.insert(0, product[2])
        price_entry.delete(0, tk.END)
        price_entry.insert(0, product[3])
        stock_entry.delete(0, tk.END)
        stock_entry.insert(0, product[4])

# Create the main window
window = tk.Tk()
window.title("CRUD Interfaz para GraphQL")

# Product input fields
tk.Label(window, text="Nombre:").grid(row=0, column=0)
name_entry = tk.Entry(window)
name_entry.grid(row=0, column=1)

tk.Label(window, text="Descripción:").grid(row=1, column=0)
description_entry = tk.Entry(window)
description_entry.grid(row=1, column=1)

tk.Label(window, text="Precio:").grid(row=2, column=0)
price_entry = tk.Entry(window)
price_entry.grid(row=2, column=1)

tk.Label(window, text="Stock:").grid(row=3, column=0)
stock_entry = tk.Entry(window)
stock_entry.grid(row=3, column=1)

# Buttons
submit_button = tk.Button(window, text="Agregar Producto", command=on_submit)
submit_button.grid(row=4, column=0)

update_button = tk.Button(window, text="Actualizar Producto", command=on_update)
update_button.grid(row=4, column=1)

delete_button = tk.Button(window, text="Eliminar Producto", command=on_delete)
delete_button.grid(row=4, column=2)

refresh_button = tk.Button(window, text="Actualizar Lista", command=on_refresh)
refresh_button.grid(row=4, column=3)

# Products list
columns = ("ID", "Nombre", "Descripción", "Precio", "Stock")
products_list = ttk.Treeview(window, columns=columns, show="headings")
for col in columns:
    products_list.heading(col, text=col)
products_list.grid(row=5, column=0, columnspan=3)

# Scrollbar
scrollbar = ttk.Scrollbar(window, orient="vertical", command=products_list.yview)
scrollbar.grid(row=5, column=3, sticky="ns")
products_list.config(yscrollcommand=scrollbar.set)

# Bind click event to fill fields
products_list.bind("<ButtonRelease-1>", fill_fields)

# Initial products list
refresh_products_list()

# Start the main loop
window.mainloop()

