class GameObject {
	constructor() {
		this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];
        this.scale = [1, 1, 1];
		this.isTrigger = false;
		this.collissionRadius = 1.0;
		this.velocity = [0,0,0];
		this.angVelocity = [0,0,0];
		this.name = "default";
		this.id = 0;
		this.prefab;
		this.transform = new Transform();
	}
	
	Move() {
		var tempP = [0,0,0]
		for(var i = 0; i < 3;i ++) {
			tempP[i] = this.loc[i];
			tempP[i] += this.velocity[i];
			this.rot[i] += this.angVelocity[i];
		}

		if(!this.isTrigger) {
			var clear = true;
			for(var so in m.Solid) {
				if(m.Solid[so] != this) {
					if(m.CheckCollision(tempP, this.collissionRadius, m.Solid[so].loc, m.Solid[so].collissionRadius)) {
						clear = false;
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

	Update() {
		console.error(this.name +" update() is NOT IMPLEMENTED!");
	}

	Render(program) {
		console.error(this.name + " render() is NOT IMPLEMENTED!");
	}	
}