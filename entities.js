function Player(P) {P == P || {};
	P.x = 0;
	P.y = 0;
	P.angle = 0;
	P.anglea = 0;
	P.xvel = 0;
	P.yvel = 0;
	P.active = true;
	P.age = 0;
	P.oldx = 0;
	P.oldy = 0;
	P.velmax = 10;
	P.velt = 0;
	P.z = 3;
	P.type = "player";
	P.phys = true;

	P.draw = function() {
		PAINT(function(){
			ctx.fillStyle = "#6BF364";
				rect(4,0,1,3);
				rect(3,2,1,4);
				rect(5,2,1,4);
				rect(1,3,1,3);
				rect(7,3,1,3);
				rect(2,4);
				rect(6,4);
				rect(0,5);
				rect(8,5);
				rect(2,6);
				rect(4,6);
				rect(6,6);}, 300, 300, P.angle,3,3,-4.5,-4,0);
	};

	P.update = function() {
		P.velt = Math.sqrt(Math.pow(P.xvel,2)+Math.pow(P.yvel,2));
		if(key['a'][1] == 1) {
			P.anglea -= .5;
		}
		if(key['d'][1] == 1) {
			P.anglea += .5;
		}
		P.angle += P.anglea;
		P.angle -= (P.angle >= 360) ? 360 : (P.angle < 0) ? -360: 0;
		P.anglea *= .9;
		P.anglea = (Math.abs(P.anglea) < .01)? 0: P.anglea;
		if(key['w'][1] == 1) {
			P.xvel += .45*Math.sin(rad(P.angle));
			P.yvel += -.45*Math.cos(rad(P.angle));
			P.velt = Math.sqrt(Math.pow(P.xvel,2)+Math.pow(P.yvel,2));
			entities.push(Smoke({x:P.x-24*(Math.cos(rad(P.angle-90))),y:P.y+18*Math.sin(rad(P.angle+90)),velx:-(Math.cos(rad(P.angle-90)))*rand(.5,1.5),vely:Math.sin(rad(P.angle+90))*(Math.random()+.5),r: P.velt/P.velmax*7*(2+.75*Math.sin(rad(24*P.age))),z:2+P.age*.0001}));
			P.age++;
		}
		else{P.age=0};
		P.xvel *= .95;
		P.yvel *= .95;
		P.xvel = (Math.abs(P.xvel)<.01)? 0: (P.velt>P.velmax)? P.velmax*Math.sin(rad(P.angle)):P.xvel;
		P.yvel = (Math.abs(P.yvel)<.01)? 0: (P.velt>P.velmax)? -(P.velmax)*Math.cos(rad(P.angle)): P.yvel;
		P.x+=P.xvel;
		P.y+=P.yvel;
		//console.log(P.velt);
		//console.log(Math.sqrt(Math.pow(dif(P.x,P.oldx),2) + Math.pow(dif(P.y,P.oldy),2)));
		P.oldx = P.x;
		P.oldy = P.y;
		unix = 300 -P.x;
		uniy = 300-P.y;
	};
	
	P.collide = function(){
		
	};
	
	return P;
}

function Smoke(S) {
	S = S || {};
	S.r = S.r || rand(20);
	S.active = true;
	S.age = 0;
	S.decay = .999;
	S.z = S.z || 2;
	S.angle = floor(rand(360));
	S.velx = S.velx || 0;
	S.vely = S.vely || 0;
	S.phys = false;
	S.type = "vfx";

	S.draw = function() {
		PAINT(function(){
		//ctx.fillStyle = "rgba("+Math.floor(125*S.decay)+", " +Math.floor(255*S.decay)+", "+Math.floor(255*S.decay)+", "+ 1 +")";
		ctx.fillStyle = "rgba(125, 255, 255, "+ (.001 + S.decay) +")";
		rect(-S.r/2,-S.r/2,S.r,S.r);},S.x,S.y,S.angle,0,0);
	};

	S.update = function() {
		S.x += S.velx;
		S.y += S.vely;
		S.age++;
		S.r*=.9;
		S.decay -= (S.age > 5)? .1: 0;
		//S.decay *= (S.age > 5)? .2: 1;
		S.angle += S.r*3;
		S.active = (S.r<.001 || S.decay < .001)?false: true;
	};
	
	return S;
}

function Object(O){
	O = O || {};
	
	function method(){
		
	}
		
	return O;
}
