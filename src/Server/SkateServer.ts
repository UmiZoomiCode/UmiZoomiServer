import { Controller, ControllerFactory, SocketControllerSettings } from "../Controllers";
import { SettingManager } from "../Settings";
import socketIO = require('socket.io')
import http = require("http");
import net = require("net");

export class SkateServer {
	private ActiveController: Controller;
	private Factory: ControllerFactory;
	private SocketServer: SocketIO.Server;
	private PwmConnection: net.Socket;
	private WebConnection;
	
	public constructor(factory: ControllerFactory){
		let server = http.createServer(() => {});
		this.Factory = factory;
		this.SocketServer = socketIO(server);
		this.PwmConnection = net.connect({port: 9999});
		
		this.SocketServer.on('connection', (socket: SocketIO.Socket) => {
			new SettingManager(socket);
			socket.on('control', (data) => {
				if(this.ActiveController === undefined){
					this.WebConnection = socket;
					this.ActiveController = this.Factory.createController('socket', {
						PwmConnection: this.PwmConnection,
						WebConnection: this.WebConnection
					});
				}
			});
			
			socket.on('disconnect', (data) => {
				if(socket === this.WebConnection){
					this.WebConnection = undefined;
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