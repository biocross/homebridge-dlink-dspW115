const WebSocketClient = require('dlink_websocketclient');

var registeredAccessory = false;
var Service, Characteristic;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	if (!registeredAccessory) {
		homebridge.registerAccessory("homebridge-dlink-dspW115", "DlinkSmartPlug", DlinkSmartPlug);
		registeredAccessory = true
	}
};

function DlinkSmartPlug(log, config) {
	this.log = log;
	if (!config) {
		console.error("[Dlink DSP-W115] Please provide and plug IP address & PIN to connect")
		return
	}
	console.info(`[Dlink DSP-W115] Connecting to Smart Plug at IP ${config.ip} with PIN ${config.pin}`)
	this.client = new WebSocketClient({
    	ip: config.ip,
    	pin: config.pin
	});
	this.client.login().then(async () => {
		console.info("[Dlink DSP-W115] Connected to Smart Plug")
	});
}


DlinkSmartPlug.prototype = {
	getServices: function() {
		let informationService = new Service.AccessoryInformation();
		informationService
			.setCharacteristic(Characteristic.Manufacturer, "biocross")
			.setCharacteristic(Characteristic.Model, "Dlink DSP-W115")
			.setCharacteristic(Characteristic.SerialNumber, "123-456-789");

		let switchService = new Service.Switch("Socket");
		switchService
			.getCharacteristic(Characteristic.On)
			.on('get', this.getSwitchCharacteristic.bind(this))
			.on('set', this.setSwitchCharacteristic.bind(this));

		this.informationService = informationService;
		this.switchService = switchService;
		return [informationService, switchService];
	},

	getSwitchCharacteristic: async function(next) {
	    const state = await this.client.state(); // retrieve state of socket
	    next(null, state);
	},

	setSwitchCharacteristic: async function(on, next) {
		console.info(`[Dlink DSP-W115] Turning ${on ? "ON" : "OFF"} smart plug `)
		await this.client.switch(on)
		next()
	}
};