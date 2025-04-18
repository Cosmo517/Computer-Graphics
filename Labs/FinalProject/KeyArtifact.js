class KeyArtifact extends Quad {
	constructor() {
		super();
		this.angVelocity = [0, 0, 0];
		this.isTrigger = false;
		this.buffer = gl.createBuffer();
		this.collisionRadius = 0.5;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		
        this.keySprite = Key_Type_1;
        this.spriteCounter = 0;
        this.frameTimer = 0;

        this.MyPicture = CreateMageType(this.keySprite);
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 32, 32, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0, 0, 0];
		this.rot = [0, 0, 0];
	}

	onTriggerEnter(other) {
        if (other.tag == "Player") {
            m.destroyObject(this.id)
            m.nextLevel();
        }
	}

	update() {

	}
}
