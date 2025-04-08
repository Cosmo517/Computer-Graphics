class Camera extends GameObject {
	constructor() {
		super();
		this.moveSpeed = 0.1;
		this.rotateSpeed = 0.03;
	}

	update() {
		let deltaX = 0;
		let deltaZ = 0;
		let deltaR = 0;

		if( "A" in m.Keys && m.Keys["A"]) {
			this.rot[1] -= this.rotateSpeed;
		}

		if("D" in m.Keys && m.Keys["D"]) {
			this.rot[1] += this.rotateSpeed;
		}

		if("W" in m.Keys && m.Keys["W"]) {
			this.transform.doRotations(this.rot);
			deltaX += this.transform.forward[0] * this.moveSpeed;
			deltaZ += this.transform.forward[2] * this.moveSpeed;
		}

		if("S" in m.Keys && m.Keys["S"]) {
			this.transform.doRotations(this.rot);
			deltaX -= this.transform.forward[0] * this.moveSpeed;
			deltaZ -= this.transform.forward[2] * this.moveSpeed;
		}

		if ("Q" in m.Keys && m.Keys["Q"]) {
			this.transform.doRotations(this.rot);
			deltaX += -(this.transform.right[0]) * this.moveSpeed;
			deltaZ += -(this.transform.right[2]) * this.moveSpeed;
		}

		if ("E" in m.Keys && m.Keys["E"]) {
			this.transform.doRotations(this.rot);
			deltaX += (this.transform.right[0]) * this.moveSpeed;
			deltaZ += (this.transform.right[2]) * this.moveSpeed;
		}

		this.loc[0] += deltaX;
		this.loc[2] += deltaZ;
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