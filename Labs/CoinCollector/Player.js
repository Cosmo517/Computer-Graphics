class Player extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		//Now we want to add color to our vertices information.
		this.vertices = [	
		-.2, -.2, 0, 0, 0, 0,
		.2, -.2, 0,  1, 0, 0,
		0, .2, 0,    1, 0, 0,
		
		-.2, -.2, 0, 0, 1, 0,
		0, 0, -.2,   0, 1, 0,
		.2, -.2, 0,  0, 1, 0,

		0, 0, -.2,  0, 0, 1,
		.2, -.2, 0, 0, 0, 1,
		0, .2, 0,   0, 0, 1,

		0, .2, 0,    1, 1, 0,
		0, 0, -.2,   1, 1, 0,
		-.2, -.2, 0, 1, 1, 0 
		];
		
		this.bulletTimer = 0;

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0, 0.0, 0.0];
		this.rot = [0.0, 0.0, 0.0];
	}
    
	update() {
		// Handle rotation
		if (m.checkKey("A")) {
			this.angVelocity = [0, 0, -0.01];
		} else if (m.checkKey("D")) {
			this.angVelocity = [0, 0, 0.01];
		} else {
			this.angVelocity = [0, 0, 0];
		}

		// Apply angular velocity
		for (let i = 0; i < 3; i++) {
			this.rot[i] += this.angVelocity[i];
		}

		// Handle forward/backward movement
		let forward = [
			Math.sin(this.rot[2]),
			Math.cos(this.rot[2]),
			0
		];

		this.velocity = [0, 0, 0];

		if (m.checkKey("W")) {
			for (let i = 0; i < 3; i++) {
				this.velocity[i] += forward[i] * 0.01;
			}
		}

		if (m.checkKey("S")) {
			for (let i = 0; i < 3; i++) {
				this.velocity[i] -= forward[i] * 0.01;
			}
		}

		let bulletLoc = [
			this.loc[0] + forward[0] * 0.2,
			this.loc[1] + forward[1] * 0.2,
			this.loc[2] + forward[2]
		];

		if (m.checkKey(" ") && this.bulletTimer >= 30) {
			m.createObject(1, Bullet, bulletLoc, this.rot, "Bullet")
			this.bulletTimer = 0;
		}

		this.bulletTimer++;
		this.Move();
	}

}