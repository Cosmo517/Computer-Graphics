class Bullet extends Quad {
	constructor() {
		super();
		this.angVelocity = [0, 0, 0];
		this.isTrigger = false;
		this.buffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        this.moveSpeed = 0.1;
        this.despawnDistance = 50;

		this.vertices = [
			//X 	Y 	Z   S   T
			-1,		-1,	0, 0,   1,
			1,		-1, 0, 1,   1,
			-1,      1, 0, 0,   0,
			1,		1,  0, 1,   0
		];

        this.FireBulletSprites = [Fire_Bullet_Type_1, Fire_Bullet_Type_2,
            Fire_Bullet_Type_3, Fire_Bullet_Type_4,
        ];
        this.spriteCounter = 0;
        this.frameTimer = 0;
		
        this.MyPicture = CreateFireBullet(this.FireBulletSprites[0]);
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 16, 16, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

	update() {
        if (m.getDistance(this.loc, this.spawnLoc) > this.despawnDistance) {
            m.destroyObject(this.id);
        }

        this.frameTimer++;
        if (this.frameTimer % 12 === 0) {
            this.spriteCounter++;
            if (this.spriteCounter >= this.FireBulletSprites.length) {
                this.spriteCounter = 0;
            }
        
            this.MyPicture = CreateMageType(this.FireBulletSprites[this.spriteCounter]);
            gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 16, 16, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
        }

        // The bullet should just move forward
		this.velocity = [0, 0, 0]
		this.transform.doRotations(this.rot);
        let tempF = this.transform.forward;
        for (let i = 0; i < 3; i++) {
            this.velocity[i] = tempF[i] * this.moveSpeed; 
        }


		this.Move();
	}
}
