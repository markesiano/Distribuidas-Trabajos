import socket

class UDPServer:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.server_socket.bind((self.host, self.port))
        self.clients = []

    def start(self):
        print("Servidor iniciado. Esperando conexiones...")
        while True:
            data, client_address = self.server_socket.recvfrom(1024)
            self.handle_request(data, client_address)

    def handle_request(self, data, client_address):
        message = data.decode()
        print(f"Mensaje recibido de {client_address}: {message}")
        self.broadcast(message)

    def broadcast(self, message):
        for client in self.clients:
            self.server_socket.sendto(message.encode(), client)

    def add_client(self, client_address):
        self.clients.append(client_address)

    def remove_client(self, client_address):
        self.clients.remove(client_address)

    def stop(self):
        self.server_socket.close()

class ServerApplication:
    def __init__(self):
        self.server = UDPServer('192.168.1.71', 8000)

    def run(self):
        try:
            self.server.start()
        except KeyboardInterrupt:
            print("Servidor detenido por el usuario.")
            self.server.stop()

if __name__ == "__main__":
    app = ServerApplication()
    app.run()