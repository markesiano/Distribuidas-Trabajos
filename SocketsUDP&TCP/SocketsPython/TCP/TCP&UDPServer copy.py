import socket
import threading

class ChatServer:
    def __init__(self, host, port, data_layer):
        self.host = host
        self.port = port
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.clients = []
        self.nicknames = []
        self.data_layer = data_layer

    def start(self):
        self.server.bind((self.host, self.port))
        self.server.listen()
        print("Servidor escuchando...")
        while True:
            client, address = self.server.accept()
            print(f"Conectado con {str(address)}")
            nickname = client.recv(1024).decode('utf-8')
            self.nicknames.append(nickname)
            self.clients.append(client)
            print(f"Nickname del cliente es {nickname}!")
            self.broadcast(f"{nickname} se ha unido al chat!".encode('utf-8'))

            history = self.data_layer.load_messages()
            for message in history:
                message = message.strip()  # Eliminar espacios en blanco al inicio y al final
                client.send(message.encode('utf-8') + b'\n')  # Agregar un carácter de nueva línea al final

            thread = threading.Thread(target=self.handle, args=(client,))
            thread.start()

    def broadcast(self, message):
        for client in self.clients:
            client.send(message)

    def handle(self, client):
        while True:
            try:
                message = client.recv(1024)
                if(message.decode('utf-8') != self.nicknames[self.clients.index(client)]) and (message.decode('utf-8') != "NICK"):
                    self.broadcast(message)
                    self.data_layer.save_message(message.decode('utf-8'))
            except:
                index = self.clients.index(client)
                self.clients.remove(client)
                client.close()
                nickname = self.nicknames[index]
                self.broadcast(f"{nickname} ha abandonado el chat.".encode('utf-8'))
                self.nicknames.remove(nickname)
                break

class ChatDataLayer:
    def __init__(self, filename):
        self.filename = filename
        self.client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def save_message(self, message):
        with open(self.filename, 'a') as file:
            file.write(message + '\n')

    def load_messages(self):
        try:
            with open(self.filename, 'r') as file:
                return file.readlines()
        except FileNotFoundError:
            return []

    def load_history(self):
        self.client.sendto("GET".encode(), ('127.0.0.1', 9000))
        history, _ = self.client.recvfrom(1024)
        return history.decode().split('\n')


    

if __name__ == "__main__":
    host = "127.0.0.1"
    port = 8778
    filename = "SocketsPython\TCP\chat_history.txt"

    data_layer = ChatDataLayer(filename)
    server = ChatServer(host, port, data_layer)
    server.start()
