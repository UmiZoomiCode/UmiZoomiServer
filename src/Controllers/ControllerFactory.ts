import { Controller } from "./Controller";
import { SocketController } from "./SocketController";

export class ControllerFactory {
		public createController(type: string, data: Object): Controller{
			return new SocketController(data);
		}
}