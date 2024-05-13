import socket
import threading

class ChatServer:
    def __init__(self, host, port, host_data, port_data):
        self.host = host
        self.port = port
        self.host_data = host_data
        self.port_data = port_data
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.serverData = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.clients = []
        self.nicknames = []
        

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
            self.serverData.sendto(b"GET", (host_data, port_data))
            while(True):
                message, _ = self.serverData.recvfrom(1024)
                print("Mensaje de historia: "+message.decode())
                if message.decode().startswith("Historial"):
                    client.send(message)
                    break
            thread = threading.Thread(target=self.handle, args=(client,))
            thread.start()
            print(f"Nickname del cliente es {nickname}!")
            self.broadcast(f"{nickname} se ha unido al chat!".encode('utf-8'))

    def broadcast(self, message):
        for client in self.clients:
            client.send(message)

    def handle(self, client):
        while True:
            try:
                message = client.recv(1024)
                self.broadcast(message)
                self.save_message(message.decode('utf-8'))
            except:
                index = self.clients.index(client)
                self.clients.remove(client)
                client.close()
                nickname = self.nicknames[index]
                self.broadcast(f"{nickname} ha abandonado el chat.".encode('utf-8'))
                self.nicknames.remove(nickname)
                break
    
    def save_message(self, message):
        self.serverData.sendto(f"POST/{message}".encode(), (host_data, port_data))





if __name__ == "__main__":
    host = "127.0.0.1"
    port = 8778

    host_data = "127.0.0.1"
    port_data = 5000
    server = ChatServer(host, port, host_data, port_data)
    server.start()
