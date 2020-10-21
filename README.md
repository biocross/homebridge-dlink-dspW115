# homebridge-dlink-dspW115
Homebridge plugin to control the Dlink DSP-W115 Smart Socket with Siri.

Based on the excellent work done by @[Garfonso](https://github.com/Garfonso), this is basically a wrapper over his node library at https://github.com/Garfonso/dlinkWebSocketClient

# Usage

To be able to control the dlink socket via homebridge, it needs to unlinked from the mydlink app. The simplest way to get it working is: (original source: this [README](https://github.com/Garfonso/dlinkWebSocketClient/blob/master/README.md))

1. If already linked, remove the device from the `mydlink` App
2. Factory reset the device.
3. Start the process of adding the device to the app
4. Follow the setup process and let the device join your wifi
5. When the device reboots after joining your wifi, do **not** finish setup, just **close** the app.

You can now use your PIN and control the device with this library.

Add the following to your homebridge config:

```json
{
  "accessory": "DlinkSmartPlug",
  "name": "Socket", # Name it whatever you like
  "ip": "192.168.xx.xx", # The IP address of the smart plug on your local network
  "pin": "937931" # The pin of the smart plug (mentioned on dlink smart plug / box / documentation)
}
```
