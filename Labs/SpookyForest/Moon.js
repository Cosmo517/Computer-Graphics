class Moon extends DirectionalLight {
	constructor() {
		super();

        // Temporary Moon
        let moonSize = 1;
        this.vertices = [
            // Top
            -moonSize, moonSize, moonSize,   1, 1, 1,
            moonSize, moonSize, moonSize,    1, 1, 1,
            moonSize, moonSize, -moonSize,   1, 1, 1,
            
            moonSize, moonSize, -moonSize,   1, 1, 1,
            -moonSize, moonSize, -moonSize,  1, 1, 1,
            -moonSize, moonSize, moonSize,   1, 1, 1,

            // Bottom
            -moonSize, -moonSize, moonSize,  1, 1, 1,
            moonSize, -moonSize, moonSize,   1, 1, 1,
            moonSize, -moonSize, -moonSize,  1, 1, 1,

            moonSize, -moonSize, -moonSize,  1, 1, 1,
            -moonSize, -moonSize, -moonSize, 1, 1, 1,
            -moonSize, -moonSize, moonSize,  1, 1, 1,

            // Left
            -moonSize, -moonSize, moonSize,  1, 1, 1,
            -moonSize, moonSize, moonSize,   1, 1, 1,
            -moonSize, moonSize, -moonSize,  1, 1, 1,

            -moonSize, moonSize, -moonSize,  1, 1, 1,
            -moonSize, -moonSize, -moonSize, 1, 1, 1,
            -moonSize, -moonSize, moonSize,  1, 1, 1,

            // Right
            moonSize, -moonSize, moonSize,   1, 1, 1,
            moonSize, moonSize, moonSize,    1, 1, 1,
            moonSize, moonSize, -moonSize,   1, 1, 1,

            moonSize, moonSize, -moonSize,   1, 1, 1,
            moonSize, -moonSize, -moonSize,  1, 1, 1,
            moonSize, -moonSize, moonSize,   1, 1, 1,

            // Front
            -moonSize, -moonSize, -moonSize,  1, 1, 1,
            -moonSize, moonSize, -moonSize,   1, 1, 1,
            moonSize, moonSize, -moonSize,    1, 1, 1,

            moonSize, moonSize, -moonSize,    1, 1, 1,
            moonSize, -moonSize, -moonSize,   1, 1, 1,
            -moonSize, -moonSize, -moonSize,  1, 1, 1,

            // Back
            -moonSize, moonSize, moonSize,   1, 1, 1,
            moonSize, moonSize, moonSize,    1, 1, 1,
            moonSize, -moonSize, moonSize,   1, 1, 1,

            moonSize, -moonSize, moonSize,   1, 1, 1,
            -moonSize, -moonSize, moonSize,  1, 1, 1,
            -moonSize, moonSize, moonSize,   1, 1, 1,
        ]
	
        this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

	update() {
		// Do nothing
	}
}