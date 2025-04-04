class Camera extends GameObject {
	constructor() {
			super();
	}

	Update() {
		let deltaX = 0;
		let deltaZ = 0;
		let deltaR = 0;

		if( "A" in m.Keys && m.Keys["A"]) {
			this.rot[1] -= 0.01;
		}

		if("D" in m.Keys && m.Keys["D"]) {
			this.rot[1] += 0.01;
		}

		if("W" in m.Keys && m.Keys["W"]) {
			this.transform.doRotations(this.rot);
			deltaX += this.transform.forward[0] * 0.25;
			deltaZ += this.transform.forward[2] * 0.25;
		}

		if("S" in m.Keys && m.Keys["S"]) {
			this.transform.doRotations(this.rot);
			deltaX -= this.transform.forward[0] * 0.25;
			deltaZ -= this.transform.forward[2] * 0.25;
		}

		this.loc[0] += deltaX;
		this.loc[2] += deltaZ;
	}

	Render(program) {
        const camLoc  = gl.getUniformLocation(program, 'worldLoc');
        gl.uniform3fv(camLoc, new Float32Array(this.loc));
        const worldLoc = gl.getUniformLocation(program, 'worldRotation');
        gl.uniform3fv(worldLoc, new Float32Array(this.rot));
		const scaleLoc = gl.getUniformLocation(program, "scale");
		gl.uniform3fv(scaleLoc, new Float32Array(this.scale));
	}
	
	
}