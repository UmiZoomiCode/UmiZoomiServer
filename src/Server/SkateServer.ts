import { Controller, ControllerFactory } from "../Controllers";
import socketIO = require('socket.io')
import http = require("http");

export class SkateServer {
	private ActiveController: Controller;
	private Factory: ControllerFactory;
	private SocketServer: SocketIO.Server;
	private Connection;
	
	public constructor(factory: ControllerFactory){
		this.Factory = factory;
		this.SocketServer = socketIO();
		
		this.SocketServer.on('connnection', (socket) => {
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
	}
}