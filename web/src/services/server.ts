import { log, WsMessage } from "@reactive-sketch-easel/shared";

class Server {
  private socket: WebSocket;
  connected: boolean;

  public init(): Promise<void> {
    return this.connect();
  }

  private connect(): Promise<void> {
    this.socket = new WebSocket("ws://127.0.0.1:2424");
    return new Promise((resolve, reject) => {
      this.socket.onopen = (event) => {
        log.info("Connected to server");
        this.connected = true;
        resolve();
      };
      this.socket.onerror = (event) => {
        log.error(event);
      };

      this.socket.onmessage = (ev) => {
        log.info("Recieved server message: ", ev.data);
      };

      this.socket.onclose = (ev) => {
        log.info("Socket closed");
        this.connected = false;
      };
    });
  }

  public async send(message: WsMessage): Promise<void> {
    if (!this.connected) {
      // await this.connect();
      return Promise.resolve();
    }
    const json = JSON.stringify(message);
    await this.socket.send(json);
    log.debug("Sent: ", json);
  }
}

export const server = new Server();
