import API from "./API";
import Worklog from "./Worklog";
import Instances from "./Instances";

export default class Widget {
  constructor() {
    this.container = document.getElementById("widget");
    this.api = new API();
    this.createInst = this.createInst.bind(this);
    this.stopInst = this.stopInst.bind(this);
    this.startInst = this.startInst.bind(this);
    this.deleteInst = this.deleteInst.bind(this);
  }

  start() {
    const instances = new Instances(
      this.container,
      this.createInst,
      this.stopInst,
      this.startInst,
      this.deleteInst
    );
    const worklog = new Worklog(this.container);
    instances.showWidget();
    worklog.showWidget();
  }

  createInst() {
    this.api.create();
  }

  stopInst(id) {
    this.api.stop(id);
  }

  startInst(id) {
    this.api.start(id);
  }

  deleteInst(id) {
    this.api.delete(id);
  }
}
