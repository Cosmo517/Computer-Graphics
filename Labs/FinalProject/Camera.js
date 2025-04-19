class Camera extends GameObject {
	constructor() {
		super();
		this.moveSpeed = 0.05;
		this.rotateSpeed = 0.02;
		this.spawnLoc = this.loc;
		this.collisionRadius = 0.6;
		this.health = 5;
		this.audio = new Audio("./sound/Hurt.mp3");
		this.walkAudio = new Audio("./sound/Walking.mp3");
		this.bulletAudio = new Audio("./sound/Fireball.mp3")
		this.playWalk = false;
		this.isWalkPlaying = false;

		this.timeSinceLastShot = 0;
		this.reloadSpeed = 60;
	}

	onCollisionEnter(other) {
        // Do nothing
    }

	update() {
		this.angVelocity = [0, 0, 0];
		this.velocity = [0, 0, 0]

		if( "A" in m.Keys && m.Keys["A"]) {
			this.angVelocity[1] -= this.rotateSpeed;
		}

		if("D" in m.Keys && m.Keys["D"]) {
			this.angVelocity[1] += this.rotateSpeed;
		}

		if("W" in m.Keys && m.Keys["W"]) {
			this.transform.doRotations(this.rot);
			this.velocity[0] = this.transform.forward[0] * this.moveSpeed;
			this.velocity[2] = this.transform.forward[2] * this.moveSpeed;
		}

		if("S" in m.Keys && m.Keys["S"]) {
			this.transform.doRotations(this.rot);
			this.velocity[0] = this.transform.forward[0] * -this.moveSpeed;
			this.velocity[2] = this.transform.forward[2] * -this.moveSpeed;
		}

		if ("Q" in m.Keys && m.Keys["Q"]) {
			this.transform.doRotations(this.rot);
			this.velocity[0] = -(this.transform.right[0]) * this.moveSpeed;
			this.velocity[2] = -(this.transform.right[2]) * this.moveSpeed;
		}

		if ("E" in m.Keys && m.Keys["E"]) {
			this.transform.doRotations(this.rot);
			this.velocity[0] = (this.transform.right[0]) * this.moveSpeed;
			this.velocity[2] = (this.transform.right[2]) * this.moveSpeed;
		}


		// This will handle shooting
		if (this.timeSinceLastShot > this.reloadSpeed && " " in m.Keys && m.Keys[" "]) {
			let bulletLoc = [...this.loc];
			const bulletVelocity = [0, 0, 0]
			// Move the bullet a bit infront of the player
			this.transform.doRotations(this.rot);
			let tempF = this.transform.forward;
			for (let i = 0; i < 3; i++) {
				bulletLoc[i] += tempF[i] * (this.moveSpeed * 25); 
			}
			m.createObject({
				type: 0,
				prefab: Bullet, 
				loc: [...bulletLoc], 
				rot: [...this.rot],
				scale: [1, 1, 1],
				collisionLocation: [...this.loc],
				tag: "Bullet"
			});
			this.bulletAudio.currentTime = 0;
			this.bulletAudio.play()
			

			this.timeSinceLastShot = 0;
		}

		this.timeSinceLastShot++;
		
		if (this.velocity[0] > 0 || this.velocity[2] > 0 
			|| this.velocity[0] < 0 || this.velocity[2] < 0 
		) {
			this.playWalk = true;
		} else {
			this.playWalk = false;
		}

		if (!this.isWalkPlaying && this.playWalk) {
			this.walkAudio.play();
			this.isWalkPlaying = true;
		} else if (this.isWalkPlaying && !this.playWalk) {
			this.walkAudio.pause();
			this.isWalkPlaying = false;
		}

		this.Move()

		// Update the collision location to match the player location
		this.collisionLocation = this.loc;
	}

	onCollisionEnter(other) {
		if (other.tag == "Mage" ||
			other.tag == "Necromancer" ||
			other.tag == "Nightwarrior") {
			m.readLevel(m.currentLevel);
		}

		if (other.tag == "EnemyBullet") {
			this.audio.play()
			this.health--;
			m.createObject({ 
                type: 0, 
                prefab: Explosion, 
                loc: [other.loc[0], other.loc[1], other.loc[2]], 
                rot: [0, 0, 0],
                scale: [1.5, 1.5, 1.5],
                tag: "Explosion",
                collisionLocation: [...other.loc],
            });
			m.destroyObject(other.id)
			if (this.health <= 0) {
				m.readLevel(m.currentLevel);
			}
		}
	}

	render(program) {
        const camLoc  = gl.getUniformLocation(program, 'worldLoc');
        gl.uniform3fv(camLoc, new Float32Array(this.loc));
        const worldLoc = gl.getUniformLocation(program, 'worldRotation');
        gl.uniform3fv(worldLoc, new Float32Array(this.rot));
		const scaleLoc = gl.getUniformLocation(program, "scale");
		gl.uniform3fv(scaleLoc, new Float32Array(this.scale));
	}

	reset() {
		console.log("resetting")
		this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];
	}
}