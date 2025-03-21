class Player extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		//Now we want to add color to our vertices information.
		this.vertices = [];
		this.circleVertexEnd = 0;
		this.triangleVertexEnd = 0;

		this.generateVertices(0.05, 30)
		this.primitiveType = gl.TRIANGLE_FAN;
		
		this.bulletTimer = 0;
		// this.circleVertexEnd = this.vertices.length;

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0, 0.0, 0.0];
		this.rot = [0.0, 0.0, 0.0];
	}

	onCollisionEnter(other) {
		if (other.name == "Enemy") {
			m.destroyObject(this.id);
			alert("Game Over!");
		}
	}

	generateVertices(radius, segments) {
        this.vertices.push(0.0, 0.0, 0.0, 0.1764, 0.9019, 0.2745);

        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const z = 0;
            // Currently generates a flat coin, we can fix this later
            this.vertices.push(x, y, z, 0.1764, 0.9019, 0.2745);
        }

		this.circleVertexEnd = this.vertices.length;

		const r_inner = 0.01;
		const r_outer = 0.025;

		let triangleVertices = [
			// Top blade
			-r_inner, r_inner, 0.0,  0, 0, 0,
			0,        r_outer, 0.0,  0, 0, 0,
			r_inner,  r_inner, 0.0,  0, 0, 0,
		
			// Right blade
			r_inner,   r_inner, 0.0,  0, 0, 0,
			r_outer,   0,       0.0,  0, 0, 0,
			r_inner,  -r_inner, 0.0,  0, 0, 0,
		
			// Bottom blade
			r_inner,  -r_inner, 0.0,  0, 0, 0,
			0,        -r_outer, 0.0,  0, 0, 0,
			-r_inner, -r_inner, 0.0,  0, 0, 0,
		
			// Left blade
			-r_inner, -r_inner, 0.0,  0, 0, 0,
			-r_outer,  0,       0.0,  0, 0, 0,
			-r_inner,  r_inner, 0.0,  0, 0, 0,
		];

		triangleVertices = this.moveObject(0.02, 0.05, 0.0, triangleVertices);

		for (let i = 0; i < triangleVertices.length; i++) {
			this.vertices.push(triangleVertices[i])
		}

		

		this.triangleVertexEnd = triangleVertices.length;
		// console.log("Triangle Vertex End: " + this.triangleVertexEnd)
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

	render(program, verticeCount, primitiveType) {
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
		
		offset = 0;
		const circleVerticeCount = this.circleVertexEnd / 6;
		const triangleVerticeCount = this.triangleVertexEnd / 6;
		console.log("Circle Vertice Count: " + circleVerticeCount)
		// console.log("Triangle Vertice Count: " + triangleVerticeCount)
		// Draw circle
		gl.drawArrays(gl.TRIANGLE_FAN, offset, circleVerticeCount);
		
		// Draw gun
		gl.drawArrays(gl.TRIANGLES, circleVerticeCount, triangleVerticeCount)
    }
}