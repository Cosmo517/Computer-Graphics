class NightWarrior extends Enemy {
	constructor() {
		super();
		this.angVelocity = [0, 0, 0];
		this.isTrigger = false;
		this.buffer = gl.createBuffer();
		this.collisionRadius = 1;
		this.health = 10 * m.difficulty;
		this.totalHealth = 10 * m.difficulty;
		this.changeDirection = true;
		this.moveSpeed = 0.02 * m.difficulty;

		this.audio = new Audio("./sound/NightWarrior.mp3");
		this.hasAudioPlayed = false;

		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        const nightWarriorSize = 3;
		this.vertices = [
			//X 	Y 	Z   S   T
			-nightWarriorSize,	-nightWarriorSize,	0, 0, 1,
			nightWarriorSize,	-nightWarriorSize,  0, 1, 1,
			-nightWarriorSize,	 nightWarriorSize,  0, 0, 0,
			nightWarriorSize,	 nightWarriorSize,  0, 1, 0
		];
		
        this.WarriorSprites = [ Warrior_Type_Run_1, Warrior_Type_Run_2, Warrior_Type_Run_3,
            Warrior_Type_Run_4, Warrior_Type_Run_5, Warrior_Type_Run_6
        ];
        this.spriteCounter = 0;
        this.frameTimer = 0;

        this.MyPicture = CreateWarriorType(this.WarriorSprites[0]);
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 80, 80, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];
	}

	onTriggerEnter(other) {
		if (other.tag == "Bullet") {
			this.health--;
			m.createObject({ 
				type: 0, 
				prefab: Explosion, 
				loc: [this.loc[0], this.loc[1] - 0.5, this.loc[2]], 
				rot: [0, 0, 0],
				scale: [1.5, 1.5, 1.5],
				tag: "Explosion",
				collisionLocation: [...this.loc],
			});
			if (this.health <= 0) {
				this.audio.play();
				m.destroyObject(this.id);
			} else if (this.health <= this.totalHealth / 2 && !this.hasAudioPlayed) {
				this.hasAudioPlayed = true;
				this.audio.play();
			}
			m.destroyObject(other.id);
		}
	}

	update() {
        this.frameTimer++;
        if (this.frameTimer % 12 === 0) {
            this.spriteCounter++;
            if (this.spriteCounter >= this.WarriorSprites.length) {
                this.spriteCounter = 0;
            }
        
            this.MyPicture = CreateWarriorType(this.WarriorSprites[this.spriteCounter]);
            gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 80, 80, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
        }

		if (this.changeDirection) {
			this.velocity[0] = this.moveSpeed * Math.cos(2 * Math.PI * Math.random());
			this.velocity[2] = this.moveSpeed * Math.sin(2 * Math.PI * Math.random());
			this.changeDirection = false;
		}
		
		this.Move();

		// Update the collision location to match the player location
		this.collisionLocation = [this.loc[0], this.collisionLocation[1], this.loc[2]];
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
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE

		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);					
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				
		const tranLoc  = gl.getUniformLocation(program, 'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		const thetaLoc = gl.getUniformLocation(program, 'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		const scaleLoc = gl.getUniformLocation(program, 'scale')
		gl.uniform3fv(scaleLoc, new Float32Array(this.scale));
		const FaceCamLoc = gl.getUniformLocation(program, 'FaceCam');
		gl.uniform1i(FaceCamLoc, true);
		const isLightWall = gl.getUniformLocation(program, 'isLightWall');
		gl.uniform1i(isLightWall, this.isLightWall);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		gl.uniform1i(FaceCamLoc, false);
	}
}
