import socket
import threading

class HistoryManager:
    def __init__(self, file_path):
        self.file_path = file_path

    def get_history(self):
        with open(self.file_path, "r") as file:
            return file.read()

    def append_message(self, message):
        with open(self.file_path, "a") as file:
            file.write(message + '\n')


class MessageHandler:
    def __init__(self, server, history_manager):
        self.server = server
        self.history_manager = history_manager

    def handle_message(self, message, address):
        message = message.decode()
        if message[:3] == "GET":
            history = self.history_manager.get_history()
            self.server.sendto(history.encode(), address)
        elif message[:3] == "PUT":
            self.history_manager.append_message(message[4:])


def receive_messages(server, message_handler):
    while True:
        try:
            message, address = server.recvfrom(1024)
            message_handler.handle_message(message, address)
        except Exception as e:
            print("Error:", e)


if __name__ == "__main__":
    server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server.bind(('127.0.0.1', 9000))

    history_manager = HistoryManager("SocketsPython\TCP\chat_history.txt")
    message_handler = MessageHandler(server, history_manager)

    print("Servidor escuchando...")
    t1 = threading.Thread(target=receive_messages, args=(server, message_handler))
    t1.start()
            

