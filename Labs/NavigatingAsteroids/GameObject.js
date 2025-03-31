class GameObject {
	constructor() {
		this.loc = [0,0,0];
		this.rot = [0,0,0];
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
		
        for(var i =0; i< 3;i ++) {
			tempP[i] = this.loc[i];
			tempP[i] += this.velocity[i];
			this.rot[i] += this.angVelocity[i];
		}

		if(!this.isTrigger) {
			var clear = true;

			for(var so in m.Solid) {
				if(m.Solid[so] != this) {
					if(m.checkCollision(tempP,this.collissionRadius,m.Solid[so].loc,m.Solid[so].collissionRadius)) {
						clear = false;
					}
				}
			} 

			if(clear) {
                this.loc = tempP;
			}
		} else {
			this.loc = tempP;
			//see if there are any collisions
			//handle them.
		}
	}

	update() {
		console.error(this.name +" update() is NOT IMPLEMENTED!");
	}

	render(program) {
		console.error(this.name + " render() is NOT IMPLEMENTED!");
	}	
}