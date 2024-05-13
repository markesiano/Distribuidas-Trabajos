import socket
import threading

class UDPClient:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def send_message(self, message):
        self.client_socket.sendto(message.encode(), (self.host, self.port))

    def receive_messages(self):
        while True:
            try:
                data, _ = self.client_socket.recvfrom(1024)
                print(data.decode())
            except OSError as e:
                print("Error al recibir datos:", e)

    def close(self):
        self.client_socket.close()

class ClientApplication:
    def __init__(self):
        self.client = UDPClient('192.168.1.71', 8000)

    def run(self):
        receive_thread = threading.Thread(target=self.client.receive_messages)
        receive_thread.start()

        while True:
            message = input("Ingrese su mensaje ('exit' para salir): ")
            if message.lower() == 'exit':
                break
            self.client.send_message(message)

        self.client.close()

if __name__ == "__main__":
    app = ClientApplication()
    app.run()
