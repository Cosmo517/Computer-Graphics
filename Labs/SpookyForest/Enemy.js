class Enemy extends SpotLight {
    constructor() {
        super();
        this.lightLoc = [0, 0, 0];
        this.lightDir = [0, 0, 0];
        this.isTrigger = true;

        let enemySize = 0.5;
        this.vertices = [
            // Top
            -enemySize, enemySize, enemySize,   1, 0, 0,
            enemySize, enemySize, enemySize,    1, 0, 0,
            enemySize, enemySize, -enemySize,   1, 0, 0,
            
            enemySize, enemySize, -enemySize,   1, 0, 0,
            -enemySize, enemySize, -enemySize,  1, 0, 0,
            -enemySize, enemySize, enemySize,   1, 0, 0,

            // Bottom
            -enemySize, -enemySize, enemySize,  1, 0, 0,
            enemySize, -enemySize, enemySize,   1, 0, 0,
            enemySize, -enemySize, -enemySize,  1, 0, 0,

            enemySize, -enemySize, -enemySize,  1, 0, 0,
            -enemySize, -enemySize, -enemySize, 1, 0, 0,
            -enemySize, -enemySize, enemySize,  1, 0, 0,

            // Left
            -enemySize, -enemySize, enemySize,  1, 0, 0,
            -enemySize, enemySize, enemySize,   1, 0, 0,
            -enemySize, enemySize, -enemySize,  1, 0, 0,

            -enemySize, enemySize, -enemySize,  1, 0, 0,
            -enemySize, -enemySize, -enemySize, 1, 0, 0,
            -enemySize, -enemySize, enemySize,  1, 0, 0,

            // Right
            enemySize, -enemySize, enemySize,   1, 0, 0,
            enemySize, enemySize, enemySize,    1, 0, 0,
            enemySize, enemySize, -enemySize,   1, 0, 0,

            enemySize, enemySize, -enemySize,   1, 0, 0,
            enemySize, -enemySize, -enemySize,  1, 0, 0,
            enemySize, -enemySize, enemySize,   1, 0, 0,

            // Front
            -enemySize, -enemySize, -enemySize,  1, 0, 0,
            -enemySize, enemySize, -enemySize,   1, 0, 0,
            enemySize, enemySize, -enemySize,    1, 0, 0,

            enemySize, enemySize, -enemySize,    1, 0, 0,
            enemySize, -enemySize, -enemySize,   1, 0, 0,
            -enemySize, -enemySize, -enemySize,  1, 0, 0,

            // Back
            -enemySize, enemySize, enemySize,   1, 0, 0,
            enemySize, enemySize, enemySize,    1, 0, 0,
            enemySize, -enemySize, enemySize,   1, 0, 0,

            enemySize, -enemySize, enemySize,   1, 0, 0,
            -enemySize, -enemySize, enemySize,  1, 0, 0,
            -enemySize, enemySize, enemySize,   1, 0, 0,
        ];

        this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    update() {
        // Do nothing
    }
}