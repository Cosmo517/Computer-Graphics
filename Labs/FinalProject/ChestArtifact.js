class ChestArtifact extends Quad {
	constructor() {
		super();
		this.angVelocity = [0, 0, 0];
		this.isTrigger = false;
		this.buffer = gl.createBuffer();
		this.collisionRadius = 2.0;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		
        this.chestSprites = [Chest_Type_1, Chest_Type_2, Chest_Type_3, Chest_Type_4, Chest_Type_5,
            Chest_Type_6, Chest_Type_7, Chest_Type_8, Chest_Type_9, Chest_Type_10,
        ];
        this.spriteCounter = 0;
        this.frameTimer = 0;

        this.openChest = false;
        this.endAnimation = false;
        this.endLevel = false;

		this.audio = new Audio("./sound/ChestOpening.mp3");

        this.MyPicture = CreateMageType(this.chestSprites[0]);
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 48, 32, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];
	}

	onTriggerEnter(other) {
        if (other.tag == "Player" && !this.openChest) {
			other.walkAudio.pause()
            this.openChest = true;
			this.audio.play();
        }
	}

	update() {
        // Only do animation if the chest has been opened
        if (this.openChest && !this.endAnimation) {
            this.frameTimer++;
            if (this.frameTimer % 12 == 0) {
                this.spriteCounter++;
                if (this.spriteCounter >= this.chestSprites.length) {
                    // We finished the animation
                    this.endAnimation = true;
                    // Spawn the final artifact, the prize
                    let temp = m.createObject({ 
                        type: 2, 
                        prefab: StaffArtifact, 
                        loc: [...this.loc], 
                        rot: [0, 0, 0],
                        tag: "Staff",
                        collisionLocation: [...this.loc],
                    });
                    temp.chestID = this.id
                }
                this.MyPicture = CreateChestType(this.chestSprites[this.spriteCounter]);
                gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 48, 32, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
        
            }
        }
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
