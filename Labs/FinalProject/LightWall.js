class LightWall extends PointLight {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
        this.collisionRadius = 1;

        // Texture
        this.MyPicture = CreateLightType();
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);

		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 64, 64, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        const boxSize = 1;
        this.vertices = [
            // Top face
            -boxSize, boxSize, -boxSize,  0, 0,
            boxSize, boxSize, -boxSize,  1, 0,
            boxSize, boxSize,  boxSize,  1, 1,

            boxSize, boxSize,  boxSize,  1, 1,
            -boxSize, boxSize,  boxSize,  0, 1,
            -boxSize, boxSize, -boxSize,  0, 0,

            // Bottom face
            -boxSize, -boxSize,  boxSize, 0, 1,
            boxSize, -boxSize,  boxSize, 1, 1,
            boxSize, -boxSize, -boxSize, 1, 0,

            boxSize, -boxSize, -boxSize, 1, 0,
            -boxSize, -boxSize, -boxSize, 0, 0,
            -boxSize, -boxSize,  boxSize, 0, 1,

            // Left face
            -boxSize, -boxSize, -boxSize, 0, 0,
            -boxSize,  boxSize, -boxSize, 0, 1,
            -boxSize,  boxSize,  boxSize, 1, 1,

            -boxSize,  boxSize,  boxSize, 1, 1,
            -boxSize, -boxSize,  boxSize, 1, 0,
            -boxSize, -boxSize, -boxSize, 0, 0,

            // Right face
            boxSize, -boxSize,  boxSize, 0, 0,
            boxSize,  boxSize,  boxSize, 0, 1,
            boxSize,  boxSize, -boxSize, 1, 1,

            boxSize,  boxSize, -boxSize, 1, 1,
            boxSize, -boxSize, -boxSize, 1, 0,
            boxSize, -boxSize,  boxSize, 0, 0,

            // Front face
            -boxSize, -boxSize, -boxSize, 0, 0,
            boxSize, -boxSize, -boxSize, 1, 0,
            boxSize,  boxSize, -boxSize, 1, 1,

            boxSize,  boxSize, -boxSize, 1, 1,
            -boxSize,  boxSize, -boxSize, 0, 1,
            -boxSize, -boxSize, -boxSize, 0, 0,

            // Back face
            -boxSize,  boxSize,  boxSize, 0, 1,
            boxSize,  boxSize,  boxSize, 1, 1,
            boxSize, -boxSize,  boxSize, 1, 0,

            boxSize, -boxSize,  boxSize, 1, 0,
            -boxSize, -boxSize,  boxSize, 0, 0,
            -boxSize,  boxSize,  boxSize, 0, 1,
        ];
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

    onCollisionEnter(other) {
        if (other.tag == "Bullet") {
            m.createObject({ 
                type: 0, 
                prefab: Explosion, 
                loc: [other.loc[0], other.loc[1], other.loc[2]], 
                rot: [0, 0, 0],
                scale: [1.5, 1.5, 1.5],
                tag: "Explosion",
                collisionLocation: [...other.loc],
            });
            m.destroyObject(other.id);
		}
    }

	update() {
        // Do nothing
    }
}