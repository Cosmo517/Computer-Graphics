class GameObject {
	constructor() {
		this.loc = [0,0,0];
		this.rot = [0,0,0];
		this.scale = [1, 1, 1];
		this.doRotate = [false, false, false];
		this.isTrigger = false;
		this.collisionRadius = 1.0;
		this.velocity = [0,0,0];
		this.angVelocity = [0,0,0];
		this.name = "default";
		this.id = 0;
		this.prefab;
		this.transform = new Transform();
		this.primitiveType = gl.TRIANGLES;
		this.verticeCount = 0
	}
	
	Move() {
		var tempP = [0,0,0]
		
        for(var i =0; i< 3;i ++) {
			tempP[i] = this.loc[i];
			tempP[i] += this.velocity[i];
			this.rot[i] += this.angVelocity[i];
		}

		if (!this.isTrigger) {
			var clear = true;
			// Handle collisions with other solids
			for (var so in m.Solid) {
				if (m.Solid[so] != this) {
					if (m.checkCollision(tempP, this.collisionRadius, m.Solid[so].loc, m.Solid[so].collisionRadius)) {
						if (this.name == "Bullet" && m.Solid[so].name == "Player") {
							// This means the user is facing upwards, and shooting
							// For now just let the bullet hit the user

							continue;
						}
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
					if (m.checkCollision(tempP, this.collisionRadius, m.Trigger[tr].loc, m.Trigger[tr].collisionRadius)) {
						try {
							m.Trigger[tr].onTriggerEnter(this);
						} catch {}
					}
				}
			}
		
			if (clear) {
				this.loc = tempP;
			}
		} else {
			this.loc = tempP;
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
		const scaleLoc = gl.getUniformLocation(program, "scale");
		gl.uniform3fv(scaleLoc, new Float32Array(this.scale));
		
		offset = 0;
		gl.drawArrays(this.primitiveType, offset, this.verticeCount);
	}
}