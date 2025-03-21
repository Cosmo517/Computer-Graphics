class Enemy extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
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

        // 0 is for x, 1 is for y
        this.randomDirection = Math.round(Math.random());
        this.reverseDirection = false;
        this.needsReversed = false;
        this.collisionRadius = 0.07;
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0, 0.0, 0.0];
		this.rot = [0.0, 0.0, 0.0];
	}
    
	onCollisionEnter(other) {
		if (other.name == "Bullet") {
            m.destroyObject(other.id)
			m.destroyObject(this.id)
            m.enemyDead = true;
		}

        if (other.name == "Player") {
            m.destroyObject(other.id)
            alert("Game over! You Lose!")
        }
	}

	update() {
        if (this.needsReversed) {
            this.reverseDirection = !this.reverseDirection
            this.needsReversed = false;
        }

        let forward = [
            this.randomDirection ? 0 : 1,
            this.randomDirection ? 1 : 0,
			0
		];

		this.velocity = [0, 0, 0];

        for (let i = 0; i < 3; i++) {
            this.velocity[i] += (forward[i] * (this.reverseDirection ? -1 : 1)) * 0.01;
        }

        this.rot[1] += 0.01;
		this.Move();
	}

}