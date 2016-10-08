import { Controller, ControllerFactory } from "../Controllers";
import { SettingManager } from "../Settings";
import socketIO = require('socket.io')
import http = require("http");

export class SkateServer {
	private ActiveController: Controller;
	private Factory: ControllerFactory;
	private SocketServer: SocketIO.Server;
	private Connection;
	
	public constructor(factory: ControllerFactory){
		let server = http.createServer(() => {});
		this.Factory = factory;
		this.SocketServer = socketIO(server);
		
		this.SocketServer.on('connection', (socket: SocketIO.Socket) => {
			new SettingManager(socket);
			socket.on('control', (data) => {
				if(this.ActiveController === undefined){
					this.Connection = socket;
					this.ActiveController = this.Factory.createController('socket', {});
				}
			});
			
			socket.on('disconnect', (data) => {
				if(socket === this.Connection){
					this.Connection = undefined;
					this.ActiveController = undefined;
				}
			});
		});
		
		server.listen(5000);
	}
	
	public static Main(){
		let factory = new ControllerFactory();
		let server = new SkateServer(factory);

	}
}