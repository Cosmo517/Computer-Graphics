class GameObject {
	constructor() {
		// Handles object transformations
		this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];
        this.scale = [1, 1, 1];

		// Movement
		this.velocity = [0, 0, 0];
		this.angVelocity = [0, 0, 0];

		this.isTrigger = false;
		this.collisionRadius = 0.5;
		this.name = "default";

		// Automatically handled
		this.id = 0;
		this.prefab;
		this.transform = new Transform();
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
						if (m.Trigger[tr].name == "Candle") {
							clear = false
						}
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

	update() {
		console.error(this.name + " update() is NOT IMPLEMENTED!");
	}

	render(program) {
		console.error(this.name + " render() is NOT IMPLEMENTED!");
	}	
}