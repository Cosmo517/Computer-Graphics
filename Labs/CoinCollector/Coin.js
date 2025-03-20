class Coin extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		//Now we want to add color to our vertices information.
		this.vertices = [];
        this.generateVertices(0.1, 30);
		this.primitiveType = gl.TRIANGLE_FAN;

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0, 0.0, 0.0];
		this.rot = [0.0, 0.0, 0.0];
	}

    generateVertices(radius, segments) {
        this.vertices.push(0.0, 0.0, 0.0, 1.0, 0.8431, 0.0);

        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const z = 0;
            // Currently generates a flat coin, we can fix this later
            this.vertices.push(x, y, z, 1.0, 0.8431, 0.0);
        }
    }
    
	update() {
        this.rot[1] += 0.01;
		this.Move();
	}

    // Deal with player hitting the coin
    onTriggerEnter(other) {
		if (other.name == "Player") {
			m.destroyObject(this.id)
			m.increaseCoinCount();
		}
	}
}