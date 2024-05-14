import tkinter as tk
from tkinter import messagebox
import requests

base_url = "http://azf-products-jjj.azurewebsites.net/products"

def get_products():
    response = requests.get(base_url,headers={"api-key":"ApiKeyTestJJJAdminsIlimited"})
    if response.status_code == 200:
        return response.json()
    else:
        messagebox.showerror("Error", f"Failed to retrieve products. Status code: {response.status_code}")
        return None

def create_product(name, description, stock, price):
    data = {
        "name": name,
        "description": description,
        "stock": int(stock),
        "price": float(price)
    }
    response = requests.post(base_url, json=data,headers={"api-key":"ApiKeyTestJJJAdminsIlimited"})
    if response.status_code == 200:
        messagebox.showinfo("Success", "Product created successfully.")
    else:
        messagebox.showerror("Error", f"Failed to create product. Status code: {response.status_code}")

def display_products(products):
    product_info = "Lista de productos:\n\n"
    for product in products:
        product_info += f"Nombre: {product['name']}\n"
        product_info += f"Descripción: {product['description']}\n"
        product_info += f"Precio: {product['price']}\n"
        product_info += f"Stock: {product['stock']}\n"
        product_info += "----------------------------\n"
    messagebox.showinfo("Products", product_info)

def add_product():
    name = name_entry.get()
    description = desc_entry.get()
    price = float(price_entry.get())
    stock = int(stock_entry.get())
    create_product(name, description, stock, price)

def show_products():
    products = get_products()
    if products:
        display_products(products)
    else:
        messagebox.showinfo("No Products", "No hay productos para mostrar.")

# Crear la ventana principal
root = tk.Tk()
root.title("Gestión de Productos")

# Crear los widgets
tk.Label(root, text="Nombre del Producto:").grid(row=0, column=0, padx=5, pady=5)
name_entry = tk.Entry(root)
name_entry.grid(row=0, column=1, padx=5, pady=5)

tk.Label(root, text="Descripción:").grid(row=1, column=0, padx=5, pady=5)
desc_entry = tk.Entry(root)
desc_entry.grid(row=1, column=1, padx=5, pady=5)

tk.Label(root, text="Precio:").grid(row=2, column=0, padx=5, pady=5)
price_entry = tk.Entry(root)
price_entry.grid(row=2, column=1, padx=5, pady=5)

tk.Label(root, text="Stock:").grid(row=3, column=0, padx=5, pady=5)
stock_entry = tk.Entry(root)
stock_entry.grid(row=3, column=1, padx=5, pady=5)

add_button = tk.Button(root, text="Agregar Producto", command=add_product)
add_button.grid(row=4, column=0, columnspan=2, padx=5, pady=5)

show_button = tk.Button(root, text="Mostrar Productos", command=show_products)
show_button.grid(row=5, column=0, columnspan=2, padx=5, pady=5)

# Ejecutar el bucle principal
root.mainloop()


