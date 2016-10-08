
export class SettingManager {
	public constructor(private socket: SocketIO.Socket){
		this.socket.on('getProfile', (data) => {
			this.socket.emit('settings', this.getProfile(data));
		});
		
		this.socket.on('saveProfile', (data) => {
			this.socket.emit('savedProfile', this.saveProfile(data));
		});
		
		this.socket.on('changeProfile', (data) => {
			this.socket.emit('changedProfile', this.changeProfile(data));
		});
		
		this.socket.on('disconnect', (data) => {
			this.socket.removeListener('getSettings');
			this.socket.removeListener('saveSettings');
			this.socket.removeListener('changeProfile');
		});
	}
	
	public getProfile(data: Object){
		console.info("getSettings");
		return {Hello: "World"};
	}
	
	public saveProfile(data: Object){
		console.info("saveProfile");
		return {Hello: "World"};
	}
	
	public changeProfile(data: Object){
		console.info("changeSettings");
		return {Hello: "World"};
	}
}