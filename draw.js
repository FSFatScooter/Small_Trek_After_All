var redtail = [];
function drawinit() {
	for(var j = 0; j < 21; j++) {
		redtail[j] = ctx.createLinearGradient(0, 0, 0, j * 2);
		redtail[j].addColorStop(0, 'rgba(255,0,0,255)');
		redtail[j].addColorStop(1, 'rgba(255,0,0,0)');
	}
}

function drawEnterprise() {
	paint(function() {
		ctx.fillStyle = "77F";
		rect(2, 0, 3);
		rect(1, 1);
		rect(5, 1);
		rect(0, 2, 1, 3);
		rect(3, 2, 1, 3);
		rect(6, 2, 1, 3);
		rect(2, 3);
		rect(4, 3);
		rect(1, 5);
		rect(5, 5);
		rect(2, 6, 3);
		rect(3, 7);
		rect(0, 8, 1, 3);
		rect(2, 8, 1, 3);
		rect(4, 8, 1, 3);
		rect(6, 8, 1, 3);
		rect(1, 9);
		rect(5, 9);
		rect(3, 11);
	}, 200, 200, angle, 1, 1, -3.5, -6);
}

function drawSI() {
	paint(function() {
		ctx.fillStyle = "#6BF364";
		rect(4, 0, 1, 3);
		rect(3, 2, 1, 4);
		rect(5, 2, 1, 4);
		rect(1, 3, 1, 3);
		rect(7, 3, 1, 3);
		rect(2, 4);
		rect(6, 4);
		rect(0, 5);
		rect(8, 5);
		rect(2, 6);
		rect(4, 6);
		rect(6, 6);
	}, 200, 200, angle, 1, 1, -4.5, -4);
}