class Mage extends Enemy {
	constructor() {
		super();
		this.angVelocity = [0, 0, 0];
		this.isTrigger = true;
		this.buffer = gl.createBuffer();
		this.collisionRadius = 0.5;
		this.health = 5;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

		this.vertices = [
			//X 	Y 	Z   S   T
			-1,		-1,	0, 0,   1,
			1,		-1, 0, 1,   1,
			-1,      1, 0, 0,   0,
			1,		1,  0, 1,   0
		];
		
        this.MageSprites = [Mage_Type_1, Mage_Type_2, Mage_Type_3, Mage_Type_4, Mage_Type_5,
            Mage_Type_6, Mage_Type_7, Mage_Type_8, Mage_Type_9, Mage_Type_10, Mage_Type_11,
            Mage_Type_12, Mage_Type_13, Mage_Type_14,
        ];
        this.spriteCounter = 0;
        this.frameTimer = 0;

        this.MyPicture = CreateMageType(this.MageSprites[0]);
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 64, 64, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];
	}

	onTriggerEnter(other) {
		if (other.tag == "Bullet") {
			this.health--;
			if (this.health <= 0) {
				m.destroyObject(this.id);
			}
			m.destroyObject(other.id);
		}
	}

	update() {
        this.frameTimer++;
        if (this.frameTimer % 12 === 0) {
            this.spriteCounter++;
            if (this.spriteCounter >= this.MageSprites.length) {
                this.spriteCounter = 0;
            }
        
            this.MyPicture = CreateMageType(this.MageSprites[this.spriteCounter]);
            gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 64, 64, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
        }

		this.Move();
	}
}
