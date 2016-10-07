
export class SettingManager {
	public constructor(private socket: SocketIO.Socket){
		this.socket.on('getSettings', (data) => {
			this.socket.emit('settings', this.getSettings(data));
		});
		
		this.socket.on('saveSettings', (data) => {
			this.socket.emit('savedSettings', this.saveSettings(data));
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
	
	public getSettings(data: Object){
		
	}
	
	public saveSettings(data: Object){
		
	}
	
	public changeProfile(data: Object){
		
	}
}