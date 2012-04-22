function Player(P) {P == P || {};
	P.x = 0;
	P.y = 0;
	P.scale = 2;
	P.angle = 0;
	P.anglea = 0;
	P.xvel = 0;
	P.yvel = 0;
	P.active = true;
	P.age = 0;
	P.fire = "";
	P.weapon = "torpedo";
	P.oldx = 0;
	P.oldy = 0;
	P.velmax = 10;
	P.velt = 0;
	P.z = 3;
	P.type = "player";
	P.physics = "neutral";
	P.phys = true;

	P.draw = function() {
		paint(function(){
		ctx.fillStyle = "77F";
		rect(2,0,3);
		rect(1,1);
		rect(5,1);
		rect(0,2,1,3);
		rect(3,2,1,3);
		rect(6,2,1,3);
		rect(2,3);
		rect(4,3);
		rect(1,5);
		rect(5,5);
		rect(2,6,3);
		rect(3,7);
		rect(0,8,1,3);
		rect(2,8,1,3);
		rect(4,8,1,3);
		rect(6,8,1,3);
		rect(1,9);
		rect(5,9);
		rect(3,11);
	}, 300, 300, P.angle,P.scale,P.scale,-3.5,-6,0);
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
			entities.push(Smoke({x:P.x-P.scale*3.5*(Math.cos(rad(P.angle-60))),y:P.y+P.scale*6*Math.sin(rad(P.angle+120)),velx:-P.scale*.1*(Math.cos(rad(P.angle-90)))*rand(.1,.2),vely:P.scale*.1*Math.sin(rad(P.angle+90))*rand(.1,.2),r: P.scale*P.velt/P.velmax*2*(2+.75*Math.sin(rad(24*P.age))),z:2+P.age*.0001}));
			entities.push(Smoke({x:P.x-P.scale*3.5*(Math.cos(rad(P.angle-120))),y:P.y+P.scale*6*Math.sin(rad(P.angle+60)),velx:-P.scale*.1*(Math.cos(rad(P.angle-90)))*rand(.1,.2),vely:P.scale*.1*Math.sin(rad(P.angle+90))*rand(.1,.2),r: P.scale*P.velt/P.velmax*2*(2+.75*Math.sin(rad(24*P.age))),z:2+P.age*.0001}));
			P.age++;
		}
		else{P.age=0};
		P.xvel *= .95;
		P.yvel *= .95;
		P.xvel = (Math.abs(P.xvel)<.01)? 0: (P.velt>P.velmax)? P.velmax*Math.sin(rad(P.angle)):P.xvel;
		P.yvel = (Math.abs(P.yvel)<.01)? 0: (P.velt>P.velmax)? -(P.velmax)*Math.cos(rad(P.angle)): P.yvel;
		P.x+=P.scale/3*P.xvel;
		P.y+=P.scale/3*P.yvel;
		if (key['space'][1] == 1){
			if((P.fire == 0 || P.fire%15 == 0) && P.weapon === "torpedo"){entities.push(Torpedo({x:P.x,y:P.y,angle:P.angle+rand(-2,2),vel:P.velmax}));}
			P.fire++;
		}
		else{P.fire=0};
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

function Torpedo(T){
	T = T || {};
	T.active = true;
	T.age = 0;
	T.tail = 0;
	T.x;
	T.y;
	T.angle = T.angle || 0;
	T.vel = T.vel || 1;
	T.power = 1;
	T.type = "weapon";
	T.collisionType = "offense";
	T.z = 2;
	
	T.update = function(){
		T.age++;
		T.x += T.vel*sin(T.angle);
		T.y -= T.vel*cos(T.angle);
		T.tail = (T.age < 10)? T.age*4: 40;
		T.active = (T.age < 800)? true:false;	
	}
	
	T.draw = function(){
		paint(function(){
			fill("#F00");
			rect(-1,-1,2,2);
			fill(redtail[(T.tail/2)]);
			rect(-1,1,2,T.tail);
		},T.x,T.y,T.angle);
	}
	
	T.collide = function(){
		
	}
		
	return T;
}

function Smoke(S) {
	S = S || {};
	S.r = S.r || rand(20);
	S.active = true;
	S.age = 0;
	S.decay = .999;
	S.z = S.z || 2;
	S.angle = floor(rand(360));
	S.angadd = (2*Math.round(rand())-1)*rand(5);;
	S.velx = S.velx || 0;
	S.vely = S.vely || 0;
	S.collisionType = "none";
	S.type = "vfx";

	S.draw = function() {
		paint(function(){
		//ctx.fillStyle = "rgba("+Math.floor(125*S.decay)+", " +Math.floor(255*S.decay)+", "+Math.floor(255*S.decay)+", "+ 1 +")";
		ctx.fillStyle = "rgba(125, 255, 255, "+ (.001 + S.decay) +")";
		rect(-S.r/2,-S.r/2,S.r,S.r);},S.x,S.y,S.angle*3,0,0);
	};

	S.update = function() {
//		S.x += S.velx;
//		S.y += S.vely;
		S.age++;
		S.r*=.8;
		S.decay -= (S.age > 5)? .1: 0;
		//S.decay *= (S.age > 5)? .2: 1;
		S.angle += 3*S.angadd;
		S.active = (S.r<.001 || S.decay < .001)?false: true;
	};
	
	return S;
}

function Object(O){
	O = O || {};
	
	O.method = function(){
		
	}
	
	O.collide = function(Type, damage, force, angle){
		if(collsiontype == "offen"){
			O.hp -= damage;
			O.xvel += force*cos(angle);
			O.yvel -= force*sin(angle);
		}
		else if(collisionType == "offensive"){
			
		}
	}
		
	return O;
}
