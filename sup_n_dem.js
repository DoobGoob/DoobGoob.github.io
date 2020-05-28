var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Default Curve

orginal("Demand", "Supply");
function orginal(demand, supply){
    //Supply and Demand Graph
    ctx.beginPath();
    ctx.setLineDash([]);
    //X-axis and Y-axis
    ctx.lineTo(20,20);
    ctx.lineTo(20, 130);
    ctx.lineTo(130,130);
    ctx.fillText("Price", 10, 15);
    ctx.fillText("Quantity", 105, 145);
    //Defualt Supply Curve
    ctx.moveTo(45,105);
    ctx.lineTo(105,45);
    ctx.fillText(supply, 110, 40);
    //Default Demand Curve
    ctx.moveTo(45, 45);
    ctx.lineTo(105,105);
    ctx.fillText(demand, 110, 115);
    ctx.stroke();
    //Dashed Line
    ctx.beginPath();
    ctx.setLineDash([3,3]);
    ctx.moveTo(20,75);
    ctx.lineTo(75,75);
    ctx.lineTo(75,130);
    ctx.stroke();
    //Reset Line Dash
}


var s = document.getElementById("ddSupply");
var d = document.getElementById("ddDemand");
var st = document.getElementById("ddSupplyType");
var dt = document.getElementById("ddDemandType");

//Shifts
function shiftSnD(){
    var demand_shift = d.options[d.selectedIndex].value;
    var supply_shift = s.options[s.selectedIndex].value;
    var demand_type = dt.options[dt.selectedIndex].value;
    var supply_type = st.options[st.selectedIndex].value;
    var count_supply = 0;
    var count_demand = 0;
;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    //Default Curve
    //Shifts
    if (supply_shift!= "default"&&supply_type!="default"){
        orginal("D1*", "S1*");
        //Shift Supply  Inc
        if (supply_type == "inc"){
            count_supply = 20;
        }
        //Shift Supply Dec
        if (supply_type == "dec"){
            count_supply = -20;
        }
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(45+count_supply,105);
        ctx.lineTo(105+count_supply,45);
        ctx.fillText("S2*", 110+count_supply, 40);
        ctx.stroke();
    }
    else{
        orginal("D1*", "S1*")
    }
    if (demand_shift != "default"&&demand_type!="default"){
        orginal("D1*", "S1*");
        if (demand_type == "inc"){
            count_demand = 20;
        }
        else if (demand_type == "dec"){
            count_demand = -20;
        }
        //Shift Demand Curve
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(45+count_demand,45);
        ctx.lineTo(105+count_demand,105);
        ctx.fillText("D2*", 110+count_demand, 115);
        ctx.stroke();
    }
    else{
        orginal("D1*", "S1*");
    }
    ctx.beginPath();
    ctx.setLineDash([3,3]);
    ctx.moveTo(20,75-count_demand/2+count_supply/2);
    ctx.lineTo(75+count_demand/2 + count_supply/2, 75-count_demand/2+count_supply/2);
    ctx.lineTo(75+count_demand/2 + count_supply/2, 130);
    ctx.stroke();
}