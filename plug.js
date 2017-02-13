//johnny-five module
var relay = new five.Relay(10);
var price = 50; // upc/Wh
var light_on = false;
var Wh_start, consumption, total;

node.on('input', function(msg){


    if (light_on !== true & msg.data > 0) {
        relay.on();
        node.send({payload:'Light is ON'});
        light_on = true;
        Wh_start = flow.get('count');
        node.send({payload:"Initial accumulated value"+ Wh_start +"Wh"});
        total = msg.data/price;
        node.send({payload:"Purchased electricity"+ total +"Wh"})
    }

    if (light_on === true){

        consumption = (flow.get('count')-Wh_start);
        node.log("consumption calculated")
        node.send({payload:"Consumption:"+ consumption+ "Wh"});
    }

    if (consumption > total){
            relay.off();
            node.send({payload:'Light is OFF'});
            light_on = false;
            consumption=0;
    }
});

return;
