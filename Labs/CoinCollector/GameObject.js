class GameObject {
	constructor() {
		this.loc = [0,0,0];
		this.rot = [0,0,0];
		this.isTrigger = false;
		this.collisionRadius = 0.05;
		this.velocity = [0,0,0];
		this.angVelocity = [0,0,0];
		this.name = "Default";
		this.id = 0;
		this.transform = new Transform();
		this.prefab;
		this.primitiveType = gl.TRIANGLES;
	}

	moveObject(dx, dy, dz, vertices) {
		for (let i = 0; i < this.vertices.length; i += 6) {
			vertices[i] += dx;
			vertices[i + 1] += dy;
			vertices[i + 2] += dz;
		}
		return vertices;
	}
	
	// Assumes the velocity is working correctly
	Move() {
		var tempF = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			tempF[i] = this.loc[i];
			tempF[i] += this.velocity[i];
		}

		
		if (!this.isTrigger) {
			var clear = true;
			// Handle collisions with other solids
			for (var so in m.Solid) {
				if (m.Solid[so] != this) {
					if (m.checkCollision(tempF, this.collisionRadius, m.Solid[so].loc, m.Solid[so].collisionRadius)) {
						try {
							m.Solid[so].onCollisionEnter(this);
						} catch {}
						clear = false;
					}
				}
			}
			
			// Handle collisions with triggers
			for (var tr in m.Trigger) {
				if (m.Trigger[tr] != this) {
					if (m.checkCollision(tempF, this.collisionRadius, m.Trigger[tr].loc, m.Trigger[tr].collisionRadius)) {
						try {
							m.Trigger[tr].onTriggerEnter(this);
						} catch {}
					}
				}
			}
		
			if (clear) {
				this.loc = tempF;
			}
		} else {
			this.loc = tempF;
		}
	}
	
	onCollisionEnter(other) {
		// virtual function
		// colliding with another object
	}
	
	onTriggerEnter(other) {
		// virtual function
		// Colliding with some trigger and getting an event happen
	}
	
	update() {
		console.error(this.name +" update() is NOT IMPLEMENTED!");
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
		var count = verticeCount / 6;
		gl.drawArrays(primitiveType, offset, count);
    }
}