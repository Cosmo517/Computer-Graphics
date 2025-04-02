class Player extends GameObject {
	constructor() {
		super();
		this.moveSpeed = 0.1;
		this.rotateSpeed = 0.02;
		this.collisionRadius = 0.25;
		this.reloadSpeed = 30 // In frames
		// Initialize it after the reloadSpeed so the player can immediately shoot
		this.timeSinceLastShot = this.reloadSpeed + 1 
	}

	render(program) {
		let camLoc = gl.getUniformLocation(program, "worldLoc");
		gl.uniform3fv(camLoc, new Float32Array(this.loc));
		let worldLoc = gl.getUniformLocation(program, "worldRotation");
		gl.uniform3fv(worldLoc, new Float32Array(this.rot));
	}

    onCollisionEnter(other) {
        console.log("I am a player " + this.id + " and hitting " + other.name)
    }

	update() {
		this.angVelocity = [0,0,0]

		// This will handle turning left and right
		if("A" in m.Keys && m.Keys["A"]) {
			this.angVelocity[1] -= this.rotateSpeed;
		}

		if("D" in m.Keys && m.Keys["D"]) {
			this.angVelocity[1] += this.rotateSpeed;
		}
		
		// This will handle looking up and down
		if ("Z" in m.Keys && m.Keys["Z"]) {
			this.angVelocity[0] -= this.rotateSpeed;
		}

		if ("X" in m.Keys && m.Keys["X"]) {
			this.angVelocity[0] += this.rotateSpeed;
		}

		// This handles going forwards and backwards
		this.velocity = [0,0,0]
		this.transform.doRotations(this.rot);
		let tempF = this.transform.forward;

		if("W" in m.Keys && m.Keys["W"]) {
			for(var i = 0; i < 3; i ++) {
				this.velocity[i] = tempF[i] * this.moveSpeed; 
			}
		}

		if("S" in m.Keys && m.Keys["S"]) {
			for(var i = 0; i < 3; i ++) {
				this.velocity[i] = tempF[i] * -this.moveSpeed; 
			}
		}

		// This will handle shooting
		if (this.timeSinceLastShot > this.reloadSpeed && " " in m.Keys && m.Keys[" "]) {
			console.log("SPAWNING BULLET")
			let temp = m.CreateObject(1,
				Bullet, 
				[this.loc[0], this.loc[1] - 10, this.loc[2]], 
				[0, 0, 0],
				[1, 1, 1],
				[false, false, false],
				"Bullet"
			)
			console.log(temp);
			this.timeSinceLastShot = 0;
		}

		this.timeSinceLastShot++;
		this.Move();
	}
}