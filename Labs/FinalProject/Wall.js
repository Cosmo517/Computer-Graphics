class Wall extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
        this.collisionRadius = 1.0;

        // Texture
        this.MyPicture = CreateWallType();
        // this.MyPicture = CreateLightType();
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);

		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 64, 64, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        const boxSize = 1;
        this.vertices = [
            // Top face
            -boxSize, boxSize, -boxSize,  0, 0,
            boxSize, boxSize, -boxSize,  1, 0,
            boxSize, boxSize,  boxSize,  1, 1,

            boxSize, boxSize,  boxSize,  1, 1,
            -boxSize, boxSize,  boxSize,  0, 1,
            -boxSize, boxSize, -boxSize,  0, 0,

            // Bottom face
            -boxSize, -boxSize,  boxSize, 0, 1,
            boxSize, -boxSize,  boxSize, 1, 1,
            boxSize, -boxSize, -boxSize, 1, 0,

            boxSize, -boxSize, -boxSize, 1, 0,
            -boxSize, -boxSize, -boxSize, 0, 0,
            -boxSize, -boxSize,  boxSize, 0, 1,

            // Left face
            -boxSize, -boxSize, -boxSize, 0, 0,
            -boxSize,  boxSize, -boxSize, 0, 1,
            -boxSize,  boxSize,  boxSize, 1, 1,

            -boxSize,  boxSize,  boxSize, 1, 1,
            -boxSize, -boxSize,  boxSize, 1, 0,
            -boxSize, -boxSize, -boxSize, 0, 0,

            // Right face
            boxSize, -boxSize,  boxSize, 0, 0,
            boxSize,  boxSize,  boxSize, 0, 1,
            boxSize,  boxSize, -boxSize, 1, 1,

            boxSize,  boxSize, -boxSize, 1, 1,
            boxSize, -boxSize, -boxSize, 1, 0,
            boxSize, -boxSize,  boxSize, 0, 0,

            // Front face
            -boxSize, -boxSize, -boxSize, 0, 0,
            boxSize, -boxSize, -boxSize, 1, 0,
            boxSize,  boxSize, -boxSize, 1, 1,

            boxSize,  boxSize, -boxSize, 1, 1,
            -boxSize,  boxSize, -boxSize, 0, 1,
            -boxSize, -boxSize, -boxSize, 0, 0,

            // Back face
            -boxSize,  boxSize,  boxSize, 0, 1,
            boxSize,  boxSize,  boxSize, 1, 1,
            boxSize, -boxSize,  boxSize, 1, 0,

            boxSize, -boxSize,  boxSize, 1, 0,
            -boxSize, -boxSize,  boxSize, 0, 0,
            -boxSize,  boxSize,  boxSize, 0, 1,
        ];
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

    onCollisionEnter(other) {
        if (other.tag == "Bullet" || other.tag == "EnemyBullet") {
            m.createObject({ 
                type: 0, 
                prefab: Explosion, 
                loc: [other.loc[0], other.loc[1], other.loc[2]], 
                rot: [0, 0, 0],
                scale: [1.5, 1.5, 1.5],
                tag: "Explosion",
                collisionLocation: [...other.loc],
            });
            m.destroyObject(other.id);
		}

        if (other.tag == "Mage") {
            other.needsReversed = true;
        } else if (other.tag == "Nightwarrior") {
            other.changeDirection = true;
        } else if (other.tag == "Necromancer") {
            other.changeDirection = true;
        }
    }

	update() {
        // Do nothing
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
		let colorAttributeLocation = gl.getAttribLocation(program, "texcord");
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
        const isSun = gl.getUniformLocation(program, 'isSun');
		gl.uniform1i(isSun, 0);

		gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 5);
	}
}