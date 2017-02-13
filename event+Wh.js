//EVENT SCRIPT
//variables
var Web3 = global.get('web3');
var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
var relay1_account =  //account address;
var amount, web3;


//web3.js, checking if node is running
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

if (!web3.isConnected()) {
    node.status({fill:"red",shape:"ring",text:"node not connected"});

} else {
    node.status({fill:"green",shape:"ring",text:"node connected"});
}

//fetching smart contract UPC
var UPCoin = web3.eth.contract(abi);
var contract = UPCoin.at('0x5c62b492ae99db9c2a174f3328ddd2f98773291a');

//watching event Transfer
var filterR1 = contract.Transfer({
    to: relay1_account
    }, {
        fromBlock: 'latest',             //we are searching only latest block
        toBlock: 'latest'
    });

filterR1.watch(function(error, result) {
        if (!error) {
          node.log("###########  watch ################# result ####################################");
          node.log(result);
          node.log("###########  watch ################# end of result #############################");
          amount = (result.args.value);
          node.send({data:amount});
        }
    })
node.on('close', function() {

filterR1.stopWatching();

});

return msg;

//Accumulated Wh script
//variables Wh accumulated
var timestep = 10/(60*60);
var Wh = msg.payload*timestep;

// initialise the counter to 0 if it doesn't exist already
var count = flow.get('count')||0;
count += Wh;

// store the value back
flow.set('count',count);

// make it part of the outgoing msg object
msg.count = count;

return msg;
