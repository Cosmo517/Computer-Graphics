class Bullet extends GameObject {
    constructor(loc) {
        super();
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        this.collisionRadius = 0.5;
        this.spawnLoc = loc
        this.moveSpeed = 0.04

        let bulletSize = 0.2;
        this.vertices = [
            // Top
            -bulletSize, bulletSize, bulletSize,   1, 1, 1,
            bulletSize, bulletSize, bulletSize,    1, 1, 1,
            bulletSize, bulletSize, -bulletSize,       1, 1, 1,
            
            bulletSize, bulletSize, -bulletSize,       1, 1, 1,
            -bulletSize, bulletSize, -bulletSize,      1, 1, 1,
            -bulletSize, bulletSize, bulletSize,   1, 1, 1,

            // Bottom
            -bulletSize, -bulletSize, bulletSize,  1, 1, 1,
            bulletSize, -bulletSize, bulletSize,   1, 1, 1,
            bulletSize, -bulletSize, -bulletSize,      1, 1, 1,

            bulletSize, -bulletSize, -bulletSize,      1, 1, 1,
            -bulletSize, -bulletSize, -bulletSize,     1, 1, 1,
            -bulletSize, -bulletSize, bulletSize,  1, 1, 1,

            // Left
            -bulletSize, -bulletSize, bulletSize,  1, 1, 1,
            -bulletSize, bulletSize, bulletSize,   1, 1, 1,
            -bulletSize, bulletSize, -bulletSize,      1, 1, 1,

            -bulletSize, bulletSize, -bulletSize,      1, 1, 1,
            -bulletSize, -bulletSize, -bulletSize,     1, 1, 1,
            -bulletSize, -bulletSize, bulletSize,  1, 1, 1,

            // Right
            bulletSize, -bulletSize, bulletSize,   1, 1, 1,
            bulletSize, bulletSize, bulletSize,    1, 1, 1,
            bulletSize, bulletSize, -bulletSize,       1, 1, 1,

            bulletSize, bulletSize, -bulletSize,       1, 1, 1,
            bulletSize, -bulletSize, -bulletSize,      1, 1, 1,
            bulletSize, -bulletSize, bulletSize,   1, 1, 1,

            // Front
            -bulletSize, -bulletSize, -bulletSize,     1, 1, 1,
            -bulletSize, bulletSize, -bulletSize,      1, 1, 1,
            bulletSize, bulletSize, -bulletSize,       1, 1, 1,

            bulletSize, bulletSize, -bulletSize,       1, 1, 1,
            bulletSize, -bulletSize, -bulletSize,      1, 1, 1,
            -bulletSize, -bulletSize, -bulletSize,     1, 1, 1,

            // Back
            -bulletSize, bulletSize, bulletSize,   1, 1, 1,
            bulletSize, bulletSize, bulletSize,    1, 1, 1,
            bulletSize, -bulletSize, bulletSize,   1, 1, 1,

            bulletSize, -bulletSize, bulletSize,   1, 1, 1,
            -bulletSize, -bulletSize, bulletSize,  1, 1, 1,
            -bulletSize, bulletSize, bulletSize,   1, 1, 1,
        ]

        this.verticeCount = this.vertices.length / 6;
        this.flip = false
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    update() {
        // Check to see if the bullet exceeded x distance from
        // the original location

        if (m.getDistance(this.loc, this.spawnLoc) > 20) {
            m.DestroyObject(this.id);
        }
        // The bullet should just move forward
		this.velocity = [0,0,0]
		this.transform.doRotations(this.rot);
        let tempF = this.transform.forward;
        console.log("Bullet rot:", this.rot);
        console.log("Bullet forward:", tempF);
        for (let i = 0; i < 3; i++) {
            this.velocity[i] = tempF[i] * this.moveSpeed; 
        }

        this.Move();
    }
}