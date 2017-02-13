# ethereum-smartplug
How to integrate Arduino, NODE-RED, RPi3 and Ethereum


Ethereum Smart Plug is the prototype of a smart charging point based on a smart-contract, RPi3 and NODE-RED. The plug receives a transfer from the user and it allows the charging of a device for as many Wh as they wer purchased.

INTRODUCTION

This project relies on:

* Johnny-five http://johnny-five.io/
* Node.js https://nodejs.org/en/
* web3.js https://github.com/ethereum/web3.js/
* Geth https://github.com/ethereum/go-ethereum/wiki/geth
* MQTT http://mqtt.org/
* NODE-RED https://nodered.org/

Equipment:
* Smart Plug: Electrical Outlet Box, Electrical Outlet, Electrical Outlet Box Cover Plate, 3/8″ NM/SE Connector, Power Strip,     SRD-05VDC-SL-C 5V Relay, Signal, Vcc and Ground Wires
* Arduino UNO
* emonBase (RPi3) + emonTx https://guide.openenergymonitor.org/

STEPS

* First of all, we need to set up the relay and the Arduino to control the plug. 
  Instructions: (http://www.circuitbasics.com/build-an-arduino-controlled-power-outlet/)
  
* Set up the metering device 
  Instructions: emonBase + emonTx https://guide.openenergymonitor.org/setup/

* Geth node needs to be installed on the emonBase (or emonPi). 
  Instructions: https://github.com/GregSimo/geth-emonpi

* Upgrade (or install) NODE-RED and Node.js latest versions.
  Instructions: http://nodered.org/docs/hardware/raspberrypi.html
  
* Install J5 module on NODE-RED
  Instructions: https://timchooblog.wordpress.com/2016/06/14/configuring-the-johnny-five-robotics-library-to-work-in-node-     red/
  
* Install web3.js library
  Add to the main settings.js file under the functionGlobalContext property:
  
  ```
  functionGlobalContext: {
  //  osModule:require('os'),
      web3:require('web3')
  }
  ```
  then install the library
  ```
  pi@emonpi(ro):~$ rpi-rw  
  pi@emonpi(rw):~$ cd .node-red
  pi@emonpi(rw):.node-red$ npm i web3
  ```
  Restart NODE-RED
  
* Finally, let's open the port so that NODE-RED can connect to the local node (http://localhost:8545)
  ```
  pi@emonpi(rw):~$sudo iptables -A INPUT -p tcp -m tcp --dport 1880 -j ACCEPT
  pi@emonpi(rw):~$apt-get install iptables-persistent
  ```
  Choose yes to save rules, if needed edit the persistent rules:
  ```
  pi@emonpi(rw):~$ sudo nano /etc/iptables/rules.v4
  ```

Once finished all the steps, the configuration is ready. Import the flow available inthe repository into NODE-RED to get started.
  
  
