class Asteroid extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        let asteroidSize = 1;

        this.vertices = [	
            // Face 1
            0, asteroidSize, 0,   1.0, 0.341, 0.2,
            0, 0, asteroidSize,   1.0, 0.341, 0.2,
            asteroidSize, 0, 0,   1.0, 0.341, 0.2,

            // Face 2
            0, asteroidSize, 0,   0.2, 1.0, 0.341,
            asteroidSize, 0, 0,   0.2, 1.0, 0.341,
            0, 0, -asteroidSize,  0.2, 1.0, 0.341,

            // Face 3
            0, asteroidSize, 0,   0.2, 0.341, 1.0,
            0, 0, -asteroidSize,  0.2, 0.341, 1.0,
            -asteroidSize, 0, 0,  0.2, 0.341, 1.0,

            // Face 4
            0, asteroidSize, 0,   1.0, 0.2, 0.659,
            -asteroidSize, 0, 0,  1.0, 0.2, 0.659,
            0, 0, asteroidSize,   1.0, 0.2, 0.659,

            // Face 5
            0, -asteroidSize, 0,   1.0, 0.843, 0.0,
            0, 0, asteroidSize,    1.0, 0.843, 0.0,
            asteroidSize, 0, 0,    1.0, 0.843, 0.0,

            // Face 6
            0, -asteroidSize, 0,   0.502, 0.0, 0.502,
            asteroidSize, 0, 0,    0.502, 0.0, 0.502,
            0, 0, -asteroidSize,   0.502, 0.0, 0.502,

            // Face 7
            0, -asteroidSize, 0,   0.0, 1.0, 1.0,
            0, 0, -asteroidSize,   0.0, 1.0, 1.0,
            -asteroidSize, 0, 0,   0.0, 1.0, 1.0,

            // Face 8
            0, -asteroidSize, 0,   0.647, 0.165, 0.165,
            -asteroidSize, 0, 0,   0.647, 0.165, 0.165,
            0, 0, asteroidSize,    0.647, 0.165, 0.165,
        ];

        this.collisionRadius = 0.07;
        this.verticeCount = this.vertices.length / 6;		
        this.angVelocity[0] = 0.01
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

	update() {
		this.Move();
	}
}