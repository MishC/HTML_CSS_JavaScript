//First motion: Accelerated motion on an inclined plane v = v_0 + a*t; L = v_0*t+1/2*a*t^2
//We do not neglect the friction forces, but we keep them constant for speed. Friction is proportional to the pressure from the pad on the ball.
//Feel free to change the input parametres
var g = 10; // gravitational constant [N/kg]
var F_d= 0.35; // friction coefficient for steel on the wood surface
var alpha = [20/180*Math.PI,30/180*Math.PI,40/180*Math.PI,50/180*Math.PI,60/180*Math.PI,70/180*Math.PI,80/180*Math.PI,90/180*Math.PI];//in radians
var x= 2;
var alpha1=alpha[x];
var v= velocity(L);
//var F1_x =10; //external force in x direction [N]
var h = 2; //height [m]
var F_d = 0.35;



//Strategy: Find the velocity at the end point of the inclined plane
function length(alpha1) {
L = Math.sin(alpha1) *h; // [m]
return L;
    }
var L = length(alpha[x]);

function acceleration(alpha1){
var v_0 = 0; //velocity at the beginning [m/s]
a=g*(Math.sin(alpha1) - F_d*Math.cos(alpha1));
return a ;   
}
var a = acceleration(alpha[x]);

//l = L- 1/2*g*t^2*(Math.sin(alpha) -F_d*Math.cos(alpha) + F1_x) //current position in [m]
function velocity(L){
//L= 1/2*t^2*g*(Math.sin(alpha) -F_d*Math.cos(alpha) + F1_x) //position at the end of the trajectory L
//from eq. above we can get t at the end of the trajectory as
t= Math.sqrt(2*L/a);
//acquired velocity
//v = v_0 + a*t =
v = t*a; //this is  v_0 for the second motion
return v}
var v = velocity(L);

//Second Motion: Deaccelerated motion  on horizontally straight plane
//We want to know the length of the trajectory, when v = 0
function time_max(v){
var v_0 = v; //
var a1= F_d*g;
//s = v_0 -1/2*F_d*g*t^2
//At the end of the motion
//0 = v_0 -a*t_max
t= Math.sqrt(2*L/acceleration(alpha[x]));
t_max = t+v_0/a1;
return t_max}

var t_max = time_max(velocity(L));


function length_max(v){
var L = length(alpha[x]);
var v_0 = v;
//s_max = v_0^2/a  - 1/2*a*v_0^2/a^2 //deceleration
s_max = L + 1/2 * v_0*v_0/(F_d*g);
return s_max;
}

var l_max = length_max(velocity(L));

 
var length_arr=[length(alpha[0]),length(alpha[1]),length(alpha[2]),length(alpha[3]),length(alpha[4]),
length(alpha[5])];
var	data1 = { x1: [0, Math.sqrt(2*length(alpha[x])/acceleration(alpha[x]))], y1: [acceleration(alpha[x]),acceleration(alpha[x])]};
    

var data2 = { x2: [Math.sqrt(2*length(alpha[x])/acceleration(alpha[x])), t_max], y2: [F_d*g, F_d*g]};

window.onload = function() {
document.getElementById("dt1").innerHTML = 'gravitational acceleration ' + g + ' ms'+'-2'.sup();
document.getElementById("dt2").innerHTML = 'height h=' + h + ' m';
document.getElementById("dt3").innerHTML = 'angle \u03B1 =' + alpha[x]*180/(Math.PI) + '°';
document.getElementById("dt4").innerHTML = 'length L =' + length(alpha[x]).toFixed(3) + ' m';
document.getElementById("dt5").innerHTML = 'acceleration a = ' + acceleration(alpha[x]).toFixed(3) +' ms'+'-2'.sup();
document.getElementById("dt6").innerHTML = 'maximal velocity v = ' + velocity(L).toFixed(3) +' ms'+'-1'.sup();
document.getElementById("dt7").innerHTML = 'whole time t = ' + t_max.toFixed(3) +' s';
document.getElementById("dt8").innerHTML = 'trajectory length = ' + length_max(velocity(L)).toFixed(3) +' m';

s= [length_max(velocity(length(alpha[0]))),length_max(velocity(length(alpha[1]))),length_max(velocity(length(alpha[2]))),length_max(velocity(length(alpha[3]))),length_max(velocity(length(alpha[4]))),length_max(velocity(length(alpha[5]))),length_max(velocity(length(alpha[6]))),length_max(velocity(length(alpha[7]))),length_max(velocity(length(alpha[8])))];

PLOT1 = document.getElementById('plot1');
	Plotly.plot( PLOT1, [{
	x: alpha,
	y: acceleration(alpha) }], {
	margin: { t: 5 } , xaxis: {
    title: 'Angle [rad]'
  },yaxis: {title: 'Acceleration [m/s<sup>2</sup>]'}
	}
	);
PLOT2 = document.getElementById('plot2');
	Plotly.plot( PLOT2, [{
	x: alpha,
	y: s  }],  {
	margin: { t: 5 } , xaxis: {
    title: 'Angle [rad]'
  },yaxis: {title: 's_max [m]'}
	}
	);	
	
PLOT3 = document.getElementById('plot3');	
Plotly.plot( PLOT3, [{
	x: [0, Math.sqrt(2*length(alpha[x])/acceleration(alpha[x]))],
	y: [acceleration(alpha[x]),acceleration(alpha[x])]  }],  {
	margin: { t: 5 } , xaxis: {
    title: 'time [s]'
  },yaxis: {title: 'Acceleration [m/s<sup>2</sup>]'},
	name: 'Incline plane'}
	);	
Plotly.plot( PLOT3, [{
	x: [Math.sqrt(2*length(alpha[x])/acceleration(alpha[x])), t_max],
	y: [F_d*g, F_d*g]  }],  {
	margin: { t: 5 } , xaxis: {
    title: 'time [s]'
  },yaxis: {title: 'Acceleration [m/s<sup>2</sup>]'},
	name: 'Horizontal plane'}
	);	
    
    
};
