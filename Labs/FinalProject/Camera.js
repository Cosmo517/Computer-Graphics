class Camera extends GameObject {
	constructor() {
		super();
		this.moveSpeed = 0.1;
		this.rotateSpeed = 0.03;
		this.spawnLoc = this.loc;
	}

	onCollisionEnter(other) {
        // Do nothing
    }

	update() {
		this.angVelocity = [0, 0, 0];
		this.velocity = [0, 0, 0]

		if( "A" in m.Keys && m.Keys["A"]) {
			this.angVelocity[1] -= this.rotateSpeed;
		}

		if("D" in m.Keys && m.Keys["D"]) {
			this.angVelocity[1] += this.rotateSpeed;
		}

		if("W" in m.Keys && m.Keys["W"]) {
			this.transform.doRotations(this.rot);
			this.velocity[0] = this.transform.forward[0] * this.moveSpeed;
			this.velocity[2] = this.transform.forward[2] * this.moveSpeed;
		}

		if("S" in m.Keys && m.Keys["S"]) {
			this.transform.doRotations(this.rot);
			this.velocity[0] = this.transform.forward[0] * -this.moveSpeed;
			this.velocity[2] = this.transform.forward[2] * -this.moveSpeed;
		}

		if ("Q" in m.Keys && m.Keys["Q"]) {
			this.transform.doRotations(this.rot);
			this.velocity[0] = -(this.transform.right[0]) * this.moveSpeed;
			this.velocity[2] = -(this.transform.right[2]) * this.moveSpeed;
		}

		if ("E" in m.Keys && m.Keys["E"]) {
			this.transform.doRotations(this.rot);
			this.velocity[0] = (this.transform.right[0]) * this.moveSpeed;
			this.velocity[2] = (this.transform.right[2]) * this.moveSpeed;
		}

		this.Move()

		// Update the collision location to match the player location
		this.collisionLocation = this.loc;
	}

	render(program) {
        const camLoc  = gl.getUniformLocation(program, 'worldLoc');
        gl.uniform3fv(camLoc, new Float32Array(this.loc));
        const worldLoc = gl.getUniformLocation(program, 'worldRotation');
        gl.uniform3fv(worldLoc, new Float32Array(this.rot));
		const scaleLoc = gl.getUniformLocation(program, "scale");
		gl.uniform3fv(scaleLoc, new Float32Array(this.scale));
	}
}