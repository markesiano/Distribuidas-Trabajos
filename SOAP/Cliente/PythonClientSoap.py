import tkinter as tk
from tkinter import messagebox
import requests
import xml.etree.ElementTree as ET

class SOAPClientApp:
    def __init__(self, root):
        self.root = root
        self.root.title("SOAP Client")

        # Crear widgets
        self.label_a = tk.Label(root, text="Valor A:")
        self.label_b = tk.Label(root, text="Valor B:")
        self.label_direccion = tk.Label(root, text="Dirección:")
        self.entry_a = tk.Entry(root)
        self.entry_b = tk.Entry(root)
        self.entry_direccion = tk.Entry(root)
        self.button_sumar = tk.Button(root, text="Sumar", command=self.sumar, state='disabled')
        self.button_restar = tk.Button(root, text="Restar", command=self.restar, state='disabled')
        self.button_multiplicar = tk.Button(root, text="Multiplicar", command=self.multiplicar, state='disabled')
        self.button_dividir = tk.Button(root, text="Dividir", command=self.dividir, state='disabled')

        self.label_a.grid(row=1, column=0)
        self.entry_a.grid(row=1, column=1)
        self.label_b.grid(row=2, column=0)
        self.entry_b.grid(row=2, column=1)
        self.button_sumar.grid(row=3, column=0)
        self.button_restar.grid(row=3, column=1)
        self.button_multiplicar.grid(row=4, column=0)
        self.button_dividir.grid(row=4, column=1)

        # Enlazar validación de campos con la habilitación de los botones
        self.entry_a.bind('<KeyRelease>', self.validate_fields)
        self.entry_b.bind('<KeyRelease>', self.validate_fields)

    def validate_fields(self, event):
        if self.entry_a.get() and self.entry_b.get():
            self.button_sumar.config(state='normal')
            self.button_restar.config(state='normal')
            self.button_multiplicar.config(state='normal')
            self.button_dividir.config(state='normal')
        else:
            self.button_sumar.config(state='disabled')
            self.button_restar.config(state='disabled')
            self.button_multiplicar.config(state='disabled')
            self.button_dividir.config(state='disabled')

    def make_soap_request(self, direccion, operation, a, b):
        # Construir la solicitud SOAP
        soap_request = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://servicios/">
           <soapenv:Header/>
           <soapenv:Body>
              <tns:{operation}>
                 <a>{a}</a>
                 <b>{b}</b>
              </tns:{operation}>
           </soapenv:Body>
        </soapenv:Envelope>
        """

        url = f"https://web-service-java-jjj.azurewebsites.net/ws/Calculadora" 
        headers = {'content-type': 'text/xml'}
        
        try:
            response = requests.post(url, data=soap_request, headers=headers)
        except requests.exceptions.ConnectionError as e:
            if "[Errno 11001] getaddrinfo failed" in str(e):
                messagebox.showerror("Error", f"No se pudo conectar con el servidor, verifique la dirección '{direccion}' y que el servidor esté en ejecución")
            return
        # Analizar la respuesta SOAP
        root = ET.fromstring(response.content)
        result = root.find('.//return').text
        return result

    def sumar(self):
        a = self.entry_a.get()
        b = self.entry_b.get()
        direccion = self.entry_direccion.get()
        result = self.make_soap_request(direccion, "sumar", a, b)
        if result is not None:
            messagebox.showinfo("Resultado", f"La suma es: {result}")

    def restar(self):
        a = self.entry_a.get()
        b = self.entry_b.get()
        direccion = self.entry_direccion.get()
        result = self.make_soap_request(direccion, "restar", a, b)
        if result is not None:
            messagebox.showinfo("Resultado", f"La resta es: {result}")

    def multiplicar(self):
        a = self.entry_a.get()
        b = self.entry_b.get()
        direccion = self.entry_direccion.get()
        result = self.make_soap_request(direccion, "multiplicar", a, b)
        if result is not None:
            messagebox.showinfo("Resultado", f"La multiplicación es: {result}")

    def dividir(self):
        a = self.entry_a.get()
        b = self.entry_b.get()
        if b == "0":
            messagebox.showerror("Error", "No se puede dividir por cero")
            return
        direccion = self.entry_direccion.get()
        result = self.make_soap_request(direccion, "dividir", a, b)
        if result is not None:
            messagebox.showinfo("Resultado", f"La división es: {result}")


if __name__ == "__main__":
    root = tk.Tk()
    app = SOAPClientApp(root)
    root.mainloop()
