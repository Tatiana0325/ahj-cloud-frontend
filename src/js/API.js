import Worklog from "./Worklog";
import Instances from "./Instances";

export default class API {
  constructor() {
    this.ws = new WebSocket('wss://ahj-cloud-backend.herokuapp.com/ws');
    this.listInst = [];
    this.listLog = [];

    this.ws.addEventListener("open", () => {
      console.log("connected");
    });

    this.ws.addEventListener("message", (evt) => {
      const response = JSON.parse(evt.data);
      if (response.type === "received") {
        console.log(response);
        Worklog.showLog(response.data);
      } else {
        console.log(response);
        Worklog.showLog(response.data);
        Instances.clearServers();
        response.data.instances.forEach((elem) => {
          Instances.showInst(elem);
        });
      }
    });

    this.ws.addEventListener("close", (evt) => {
      console.log("connection closed", evt);
    });

    this.ws.addEventListener("error", () => {
      console.log("error");
    });
  }

  create() {
    this.ws.send(
      JSON.stringify({
        type: "create",
      })
    );
  }

  delete(id) {
    this.ws.send(
      JSON.stringify({
        type: "delete",
        data: {
          id,
        },
      })
    );
  }

  start(id) {
    this.ws.send(
      JSON.stringify({
        type: "start",
        data: {
          id,
        },
      })
    );
  }

  stop(id) {
    this.ws.send(
      JSON.stringify({
        type: "stop",
        data: {
          id,
        },
      })
    );
  }
}
