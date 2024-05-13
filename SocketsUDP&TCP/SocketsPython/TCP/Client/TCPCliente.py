import socket
import threading
import tkinter as tk

# La clase NetworkClient es la encargada de manejar la conexión con el servidor
# Se encarga de enviar y recibir mensajes
# Se encarga de cerrar la conexión
# Se encarga de conectarse al servidor
# Se encarga de recibir mensajes
# Se encarga de enviar mensajes
# Se encarga de cerrar la conexión
class NetworkClient:
    def __init__(self, host, port):
        self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.host = host
        self.port = port

    def connect(self, nickname):
        self.client.connect((self.host, self.port))
        print("Conectado al servidor.")
        self.client.send(nickname.encode('utf-8'))

    def receive_message(self):
        return self.client.recv(1024).decode('utf-8')

    def send_message(self, message):
        self.client.send(message.encode('utf-8'))

    def close_connection(self):
        self.client.close()

# La clase ChatClientGUI es la encargada de manejar la interfaz gráfica del cliente

        
class ChatClientGUI:
    def __init__(self, client: NetworkClient):
        self.client = client
        self.root = tk.Tk()
        self.root.title("Chat Client")

        self.nickname_frame = tk.Frame(self.root)
        self.nickname_frame.pack()

        self.nickname_label = tk.Label(self.nickname_frame, text="Nombre de usuario:")
        self.nickname_label.pack()

        self.nickname_entry = tk.Entry(self.nickname_frame)
        self.nickname_entry.pack()

        self.nickname_button = tk.Button(self.nickname_frame, text="Ingresar", command=self.connect_and_show_chat)
        self.nickname_button.pack()

        self.chat_frame = tk.Frame(self.root)
        self.message_listbox = tk.Listbox(self.chat_frame, width=50, height=20)
        self.message_listbox.pack()

        self.message_entry = tk.Entry(self.chat_frame, width=50)
        self.message_entry.pack()

        self.send_button = tk.Button(self.chat_frame, text="Enviar", command=self.send_message)
        self.send_button.pack()

        self.receive_thread = None

    def connect_and_show_chat(self):
        nickname = self.nickname_entry.get()
        self.client.connect(nickname)
        self.nickname_frame.pack_forget()
        self.chat_frame.pack()
        self.receive_thread = threading.Thread(target=self.receive)
        self.receive_thread.start()

    def receive(self):
        while True:
            try:
                message = self.client.receive_message()
                print(f"Mensaje recibido: {message}")
                print(f"Mensaje recibido: {message.split('\n')[0]}")
                if message.split('\n')[0].strip() == "Historial":
                    self.message_listbox.delete(0, tk.END)
                    for line in message.split('\n')[1:]:
                        self.message_listbox.insert(tk.END, line)
                else:
                    self.message_listbox.insert(tk.END, message)

            except Exception as e:
                print(f"Ha ocurrido un error al recibir el mensaje: {e}")
                self.client.close_connection()
                break

    def send_message(self):
        message = self.nickname_entry.get() + ': ' + self.message_entry.get()
        self.client.send_message(message)
        self.message_entry.delete(0, tk.END)

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    host = "127.0.0.1"
    port = 8778
    client = NetworkClient(host, port)
    client_gui = ChatClientGUI(client)
    client_gui.run()