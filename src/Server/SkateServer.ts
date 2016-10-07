import { Controller, ControllerFactory } from "../Controllers"

export class SkateServer {
	private ActiveController: Controller;
	private Factory: ControllerFactory;
	
	public constructor(factory: ControllerFactory){
		this.Factory = factory;
	}
}