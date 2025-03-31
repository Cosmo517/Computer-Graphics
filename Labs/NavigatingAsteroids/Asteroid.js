class Asteroid extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        this.vertices = [	
            // Face 1
            0, 0.1, 0,   1.0, 0.341, 0.2,
            0, 0, 0.1,   1.0, 0.341, 0.2,
            0.1, 0, 0,   1.0, 0.341, 0.2,

            // Face 2
            0, 0.1, 0,   0.2, 1.0, 0.341,
            0.1, 0, 0,   0.2, 1.0, 0.341,
            0, 0, -0.1,  0.2, 1.0, 0.341,

            // Face 3
            0, 0.1, 0,   0.2, 0.341, 1.0,
            0, 0, -0.1,  0.2, 0.341, 1.0,
            -0.1, 0, 0,  0.2, 0.341, 1.0,

            // Face 4
            0, 0.1, 0,   1.0, 0.2, 0.659,
            -0.1, 0, 0,  1.0, 0.2, 0.659,
            0, 0, 0.1,   1.0, 0.2, 0.659,

            // Face 5
            0, -0.1, 0,   1.0, 0.843, 0.0,
            0, 0, 0.1,    1.0, 0.843, 0.0,
            0.1, 0, 0,    1.0, 0.843, 0.0,

            // Face 6
            0, -0.1, 0,   0.502, 0.0, 0.502,
            0.1, 0, 0,    0.502, 0.0, 0.502,
            0, 0, -0.1,   0.502, 0.0, 0.502,

            // Face 7
            0, -0.1, 0,   0.0, 1.0, 1.0,
            0, 0, -0.1,   0.0, 1.0, 1.0,
            -0.1, 0, 0,   0.0, 1.0, 1.0,

            // Face 8
            0, -0.1, 0,   0.647, 0.165, 0.165,
            -0.1, 0, 0,   0.647, 0.165, 0.165,
            0, 0, 0.1,    0.647, 0.165, 0.165,
        ];
        this.collisionRadius = 0.07;
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}
    
	// onCollisionEnter(other) {
	// 	if (other.name == "Bullet") {
    //         m.destroyObject(other.id)
	// 		m.destroyObject(this.id)
    //         m.enemyDead = true;
	// 	}

    //     if (other.name == "Player") {
    //         m.destroyObject(other.id)
    //         alert("Game over! You Lose!")
    //     }
	// }

	render(program) {
		//console.log("We are trying to render");		 
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		
		//First we bind the buffer for triangle 1
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");
		//We don't have to bind because we already have the correct buffer bound.
		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		
		
		var primitiveType = gl.TRIANGLES;
		offset = 0;
		var count = 24;
		gl.drawArrays(primitiveType, offset, count);
	}

	update() {
        // if (this.needsReversed) {
        //     this.reverseDirection = !this.reverseDirection
        //     this.needsReversed = false;
        // }

        // let forward = [
        //     this.randomDirection ? 0 : 1,
        //     this.randomDirection ? 1 : 0,
		// 	0
		// ];

		// this.velocity = [0, 0, 0];

        // for (let i = 0; i < 3; i++) {
        //     this.velocity[i] += (forward[i] * (this.reverseDirection ? -1 : 1)) * 0.01;
        // }

        // this.rot[1] += 0.01;
		this.Move();
	}
}