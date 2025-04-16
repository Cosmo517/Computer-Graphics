class Hex extends GameObject {
	constructor() {
		super();
		this.angVelocity = [0, 0.005, 0];
		this.isTrigger = false;
		this.buffer=gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		
		//!!!!!!!!!!!!!!!!!Changes due to texture
		this.MyPicture = CreateBrick();

		//Get vertices from announcements
		this.vertices = [
			//X, Y,  Z,  U,  V,
			-.5,-.5,-.25,0,0,
			-.5, .5,-.25,0,10,
			-.25,-.5,-.5,10,0,
			-.25, .5,-.5,10,10,
			.25,-.5,-.5,0,0,
			.25,.5,-.5,0,10,
			.5,-.5,-.25,10,0,
			.5, .5,-.25,10,10,
			.5,-.5,.25,0,0,
			.5, .5,.25,0,10,
			.25,-.5,.5,10,0,
			.25, .5,.5,10,10,
			-.25,-.5,.5,0,0,
			-.25, .5,.5,0,10,
			-.5,-.5,.25,10,0,
			-.5, .5,.25,10,10,
			-.5, -.5,-.25,0,0,
			-.5, .5,-.25,0,10
		];
		
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);

		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 16, 16, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0, 0, 0];
		this.rot=[0, 0, 0];
	}

	update() {
		this.Move();
	}

	render(program) {
		let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		let size = 3;
		let type = gl.FLOAT;
		let normalize = false;
		
		let stride = 5 * Float32Array.BYTES_PER_ELEMENT;
		let offset = 0;
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TEXTURE CHANGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//Now we have to do this for color
		let colorAttributeLocation = gl.getAttribLocation(program,"texcord");
		//We don't have to bind because we already have the correct buffer bound.
		size = 2;
		type = gl.FLOAT;
		normalize = false;
		stride = 5 * Float32Array.BYTES_PER_ELEMENT;
		offset = 3 * Float32Array.BYTES_PER_ELEMENT;
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);					
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				
		const tranLoc  = gl.getUniformLocation(program, 'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		const thetaLoc = gl.getUniformLocation(program, 'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		const scaleLoc = gl.getUniformLocation(program, 'scale')
		gl.uniform3fv(scaleLoc, new Float32Array(this.scale));
		const isLightWall = gl.getUniformLocation(program, 'isLightWall');
		gl.uniform1i(isLightWall, this.isLightWall);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 18);
	}
}