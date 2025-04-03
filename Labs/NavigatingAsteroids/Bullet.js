class Bullet extends GameObject {
    constructor(loc) {
        super();
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        this.collisionRadius = 0.4;
        this.spawnLoc = loc
        this.moveSpeed = 0.3;
        this.despawnDistance = 100;

        let bulletSize = 0.1;
        this.vertices = [
            // Top
            -bulletSize, bulletSize, bulletSize,   1, 0, 0,
            bulletSize, bulletSize, bulletSize,    1, 0, 0,
            bulletSize, bulletSize, -bulletSize,   1, 0, 0,
            
            bulletSize, bulletSize, -bulletSize,   1, 0, 0,
            -bulletSize, bulletSize, -bulletSize,  1, 0, 0,
            -bulletSize, bulletSize, bulletSize,   1, 0, 0,

            // Bottom
            -bulletSize, -bulletSize, bulletSize,  1, 0, 0,
            bulletSize, -bulletSize, bulletSize,   1, 0, 0,
            bulletSize, -bulletSize, -bulletSize,  1, 0, 0,

            bulletSize, -bulletSize, -bulletSize,  1, 0, 0,
            -bulletSize, -bulletSize, -bulletSize, 1, 0, 0,
            -bulletSize, -bulletSize, bulletSize,  1, 0, 0,

            // Left
            -bulletSize, -bulletSize, bulletSize,  1, 0, 0,
            -bulletSize, bulletSize, bulletSize,   1, 0, 0,
            -bulletSize, bulletSize, -bulletSize,  1, 0, 0,

            -bulletSize, bulletSize, -bulletSize,  1, 0, 0,
            -bulletSize, -bulletSize, -bulletSize, 1, 0, 0,
            -bulletSize, -bulletSize, bulletSize,  1, 0, 0,

            // Right
            bulletSize, -bulletSize, bulletSize,   1, 0, 0,
            bulletSize, bulletSize, bulletSize,    1, 0, 0,
            bulletSize, bulletSize, -bulletSize,   1, 0, 0,

            bulletSize, bulletSize, -bulletSize,   1, 0, 0,
            bulletSize, -bulletSize, -bulletSize,  1, 0, 0,
            bulletSize, -bulletSize, bulletSize,   1, 0, 0,

            // Front
            -bulletSize, -bulletSize, -bulletSize,  1, 0, 0,
            -bulletSize, bulletSize, -bulletSize,   1, 0, 0,
            bulletSize, bulletSize, -bulletSize,    1, 0, 0,

            bulletSize, bulletSize, -bulletSize,    1, 0, 0,
            bulletSize, -bulletSize, -bulletSize,   1, 0, 0,
            -bulletSize, -bulletSize, -bulletSize,  1, 0, 0,

            // Back
            -bulletSize, bulletSize, bulletSize,   1, 0, 0,
            bulletSize, bulletSize, bulletSize,    1, 0, 0,
            bulletSize, -bulletSize, bulletSize,   1, 0, 0,

            bulletSize, -bulletSize, bulletSize,   1, 0, 0,
            -bulletSize, -bulletSize, bulletSize,  1, 0, 0,
            -bulletSize, bulletSize, bulletSize,   1, 0, 0,
        ]

        this.verticeCount = this.vertices.length / 6;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    update() {
        // Check to see if the bullet exceeded x distance from
        // the original location

        if (m.getDistance(this.loc, this.spawnLoc) > this.despawnDistance) {
            m.DestroyObject(this.id);
        }

        // The bullet should just move forward
		this.velocity = [0,0,0]
		this.transform.doRotations(this.rot);
        let tempF = this.transform.forward;
        for (let i = 0; i < 3; i++) {
            this.velocity[i] = tempF[i] * this.moveSpeed; 
        }

        this.Move();
    }
}