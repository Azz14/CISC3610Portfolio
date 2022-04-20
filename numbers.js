var sprite = 
{
	"frames": [
		{
			"frame": {
				"x": 1,
				"y": 1,
				"w": 70,
				"h": 144
			},
			"sourceSize": {
				"w": 83,
				"h": 144
			}
		},
		{
			"frame": {
				"x": 52,
				"y": 1,
				"w": 70,
				"h": 141
			},
			"sourceSize": {
				"w": 100,
				"h": 141
			}
		},
		{
			"frame": {
				"x": 115,
				"y": 1,
				"w": 81,
				"h": 142
			},
			"sourceSize": {
				"w": 81,
				"h": 142
			}
		},
		{
			"frame": {
				"x": 185,
				"y": 1,
				"w": 77,
				"h": 143
			},
			"sourceSize": {
				"w": 77,
				"h": 143
			}
		},
		{
			"frame": {
				"x": 240,
				"y": 1,
				"w": 82,
				"h": 141
			},
			"sourceSize": {
				"w": 82,
				"h": 141
			}
		},
		{
			"frame": {
				"x": 300,
				"y": 1,
				"w": 79,
				"h": 143
			},
			"sourceSize": {
				"w": 79,
				"h": 143
			}
		},
		{
			"frame": {
				"x": 365,
				"y": 1,
				"w": 80,
				"h": 141
			},
			"sourceSize": {
				"w": 80,
				"h": 141
			}
		},
		{
			"frame": {
				"x": 433,
				"y": 1,
				"w": 80,
				"h": 140
			},
			"sourceSize": {
				"w": 80,
				"h": 140
			}
		},
		{
			"frame": {
				"x": 490,
				"y": 1,
				"w": 80,
				"h": 142
			},
			"sourceSize": {
				"w": 80,
				"h": 142
			}
		},
		{
			"frame": {
				"x": 550,
				"y": 1,
				"w": 80,
				"h": 144
			},
			"sourceSize": {
				"w": 80,
				"h": 144
			}
		 }
	]
}
let numbers = new Image();
numbers.src = 'numbers.png';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawNumber(i){
    ctx.drawImage(numbers, sprite.frames[i].frame.x,
    sprite.frames[i].frame.y,
    sprite.frames[i].frame.w,
    sprite.frames[i].frame.h, 55, 0,
    sprite.frames[i].sourceSize.w,
    sprite.frames[i].sourceSize.h);
}

function drawNumberDouble(ten, num){
    ctx.drawImage(numbers, sprite.frames[ten].frame.x,
    sprite.frames[ten].frame.y,
    sprite.frames[ten].frame.w,
    sprite.frames[ten].frame.h, 0, 0,
    sprite.frames[ten].sourceSize.w,
    sprite.frames[ten].sourceSize.h);

	ctx.drawImage(numbers, sprite.frames[num].frame.x,
		sprite.frames[num].frame.y,
		sprite.frames[num].frame.w,
		sprite.frames[num].frame.h, 0, 0,
		sprite.frames[num].sourceSize.w,
		sprite.frames[num].sourceSize.h);
}
const button = document.getElementById('startButton');
button.onclick = function() {
	count();
	button.disabled = "disabled";
};

const nums = [0,1,2,3,4,5,6,7,8,9];
let currentLoopIndex = 0;
let delay = 500;

function count() {

	if (currentLoopIndex > nums.length - 1) {
		return;
	}
	else if(currentLoopIndex >= 10){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawNumberDouble(1,0);
	}else{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawNumber(nums[currentLoopIndex]);
	}
	currentLoopIndex++;
	setTimeout(count, delay);
}