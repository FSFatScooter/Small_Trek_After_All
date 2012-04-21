document.onkeydown = keysdown;
document.onkeyup = keysup;

var key = {
	"w" : [87, 0],
	"a" : [65, 0],
	"s" : [83, 0],
	"d" : [68, 0],

	"f" : [70, 0],
	"g" : [71, 0],
	"h" : [72, 0],

	"up" : [38, 0],
	"down" : [40, 0],
	"left" : [37, 0],
	"right" : [49, 0],

	"space" : [32, 0],
	"esc" : [27, 0]
};

function keysdown(e) {
	if(!e) {
		e = window.event;
	}
	for(var i in key) {
		key[i][1] = (e.keyCode == key[i][0]) ? 1 : key[i][1];
		//(e.keyCode == key[i][0])?console.log(key[i]):null;
	}
}

function keysup(e) {
	if(!e) {
		e = window.event;
	}
	for(var i in key) {
		key[i][1] -= (e.keyCode == key[i][0]) ? 1 : 0;
	}
}