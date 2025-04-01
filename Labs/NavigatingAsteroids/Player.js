class Player extends GameObject {
	constructor() {
		super();
	}

	render(program) {
		let camLoc = gl.getUniformLocation(program, "worldLoc");
		gl.uniform3fv(camLoc, new Float32Array(this.loc));
		let worldLoc = gl.getUniformLocation(program, "worldRotation");
		gl.uniform3fv(worldLoc, new Float32Array(this.rot));
	}

	update() {
		// this.angVelocity = [0,0,0]

		if("A" in m.Keys && m.Keys["A"]) {
			this.rot[1] +=.01;		//euler angles x,y,z
		}

		if("D" in m.Keys && m.Keys["D"]) {
			this.rot[1] -=.01;
		}

		if ("Z" in m.Keys && m.Keys["Z"]) {
			this.rot[0] -= 0.01;
		}

		if ("X" in m.Keys && m.Keys["X"]) {
			this.rot[0] += 0.01;
		}

		this.velocity = [0,0,0]
		this.transform.doRotations(this.rot);
		let tempF = this.transform.forward;

		if("W" in m.Keys && m.Keys["W"]) {
			for(var i = 0; i < 3; i ++) {
				this.velocity[i] = tempF[i] * .01; 
			}
		}

		if("S" in m.Keys && m.Keys["S"]) {
			for(var i = 0; i < 3; i ++) {
				this.velocity[i] = tempF[i] * -.01; 
			}
		}

		this.Move();
	}
}