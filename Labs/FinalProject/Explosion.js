class Explosion extends Quad {
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
		
        this.ExplosionSprites = [Fire_Yellow_Explosion_Type_1, Fire_Yellow_Explosion_Type_2,
            Fire_Yellow_Explosion_Type_3, Fire_Yellow_Explosion_Type_4
        ];
        this.spriteCounter = 0;
        this.frameTimer = 0;

        this.MyPicture = CreateFireExplosion(this.ExplosionSprites[0]);
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 32, 32, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];
	}

	update() {
        this.frameTimer++;
        if (this.frameTimer % 12 === 0) {
            this.spriteCounter++;
            if (this.spriteCounter >= this.ExplosionSprites.length) {
                this.spriteCounter = 0;
                m.destroyObject(this.id)
            }
        
            this.MyPicture = CreateFireExplosion(this.ExplosionSprites[this.spriteCounter]);
            gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 32, 32, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
        }

		this.Move();
	}
}
