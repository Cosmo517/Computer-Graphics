class GameObject {
	constructor() {
		// Handles object transformations
		this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];
        this.scale = [1, 1, 1];
		this.spawnLoc = this.loc

		// Movement
		this.velocity = [0, 0, 0];
		this.angVelocity = [0, 0, 0];

        // Collision
		this.collisionRadius = 0.5;
		this.collisionLocation = [0, 0, 0];

		// Misc
		this.isTrigger = false;
		this.tag = "default";

		// Lighting
		this.isLightWall = 0;

		// Automatically handled
		this.id = 0;
		this.prefab;
		this.transform = new Transform();
	}
	
	Move() {
		let tempP = [0, 0, 0]
		
        for (var i = 0; i < 3; i++) {
			tempP[i] = this.loc[i];
			tempP[i] += this.velocity[i];
			this.rot[i] += this.angVelocity[i];
		}

		if (!this.isTrigger) {
			let clear = true;
			// Handle collisions with other solids
			for (var so in m.Solid) {
				if (m.Solid[so] != this) {
					if (m.checkCollision(tempP, this.collisionRadius, m.Solid[so].collisionLocation, m.Solid[so].collisionRadius)) {
						console.log("I am: " + this.tag + " colliding with: " + m.Solid[so].tag)
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
					if (m.checkCollision(tempP, this.collisionRadius, m.Trigger[tr].collisionLocation, m.Trigger[tr].collisionRadius)) {
						console.log("I am: " + this.tag + " colliding with: " + m.Trigger[tr].tag)
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
			let clear = true;
			if (clear) {
				this.loc = tempP;
			}
		}
	}

	update() {
		console.error(this.name + " update() is NOT IMPLEMENTED!");
	}

	render(program) {
		console.error(this.name + " render() is NOT IMPLEMENTED!");
	}	
}   