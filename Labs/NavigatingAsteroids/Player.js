class Player extends GameObject {
	constructor() {
		super();
		this.moveSpeed = 0.1;
		this.rotateSpeed = 0.02;
		this.collisionRadius = 0.25;
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

		if("A" in m.Keys && m.Keys["A"]) {
			this.angVelocity[1] -= this.rotateSpeed;
		}

		if("D" in m.Keys && m.Keys["D"]) {
			this.angVelocity[1] += this.rotateSpeed;
		}

		if ("Z" in m.Keys && m.Keys["Z"]) {
			this.angVelocity[0] -= this.rotateSpeed;
		}

		if ("X" in m.Keys && m.Keys["X"]) {
			this.angVelocity[0] += this.rotateSpeed;
		}

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

		this.Move();
	}
}