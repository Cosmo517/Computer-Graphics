class Enemy extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		//Now we want to add color to our vertices information.
        this.vertices = [	
            // Face 1
            0, 0.1, 0,   1.0, 0.341, 0.2,
            0, 0, 0.1,   1.0, 0.341, 0.2,
            0.1, 0, 0,   1.0, 0.341, 0.2,

            // Face 2
            0, 0.1, 0,   0.2, 1.0, 0.341,
            0.1, 0, 0,   0.2, 1.0, 0.341,
            0, 0, -0.1,  0.2, 1.0, 0.341,

            // Face 3
            0, 0.1, 0,   0.2, 0.341, 1.0,
            0, 0, -0.1,  0.2, 0.341, 1.0,
            -0.1, 0, 0,  0.2, 0.341, 1.0,

            // Face 4
            0, 0.1, 0,   1.0, 0.2, 0.659,
            -0.1, 0, 0,  1.0, 0.2, 0.659,
            0, 0, 0.1,   1.0, 0.2, 0.659,

            // Face 5
            0, -0.1, 0,   1.0, 0.843, 0.0,
            0, 0, 0.1,    1.0, 0.843, 0.0,
            0.1, 0, 0,    1.0, 0.843, 0.0,

            // Face 6
            0, -0.1, 0,   0.502, 0.0, 0.502,
            0.1, 0, 0,    0.502, 0.0, 0.502,
            0, 0, -0.1,   0.502, 0.0, 0.502,

            // Face 7
            0, -0.1, 0,   0.0, 1.0, 1.0,
            0, 0, -0.1,   0.0, 1.0, 1.0,
            -0.1, 0, 0,   0.0, 1.0, 1.0,

            // Face 8
            0, -0.1, 0,   0.647, 0.165, 0.165,
            -0.1, 0, 0,   0.647, 0.165, 0.165,
            0, 0, 0.1,    0.647, 0.165, 0.165,
        ];
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0, 0.0, 0.0];
		this.rot = [0.0, 0.0, 0.0];
	}
    
	onCollisionEnter(other) {
		console.log(other.id)
		if (other.name == "Bullet") {
            m.destroyObject(other.id)
			m.destroyObject(this.id)
		}

        if (other.name == "Player") {
            m.destroyObject(other.id)
            alert("Game over!!")
        }
	}

	update() {
        this.rot[1] += 0.01;
		this.Move();
	}

}