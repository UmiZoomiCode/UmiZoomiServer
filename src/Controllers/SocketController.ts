import { Controller, ControllerSettings } from './Controller';
import net = require("net");

export class SocketController extends Controller {
	private PwmConnection: net.Socket;
	private WebConnection: SocketIO.Socket;
	
	public constructor (settings: SocketControllerSettings){
		super(settings);
		this.PwmConnection = settings.PwmConnection;
		this.WebConnection = settings.WebConnection;
		this.WebConnection.on('ChangeSpeed', (data) => {
			this.PwmConnection.write(JSON.stringify(data) + "\r\n");
		});
		
		this.WebConnection.emit("Controlling");
	}
	
}

export interface SocketControllerSettings extends ControllerSettings{
	PwmConnection: net.Socket,
	WebConnection: SocketIO.Socket
}