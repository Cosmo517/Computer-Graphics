class Candle extends PointLight {
	constructor() {
		super();

		this.angVelocity = [0, 0 ,0];
		this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        // Temporary Moon
        let candleSize = 0.2;
        let baseHeight = candleSize * 3;
        this.vertices = [
            // Create the yellow of the torch
            // Top
            -candleSize, candleSize, candleSize,   1, 1, 0,
            candleSize, candleSize, candleSize,    1, 1, 0,
            candleSize, candleSize, -candleSize,   1, 1, 0,
            
            candleSize, candleSize, -candleSize,   1, 1, 0,
            -candleSize, candleSize, -candleSize,  1, 1, 0,
            -candleSize, candleSize, candleSize,   1, 1, 0,

            // Bottom
            -candleSize, -candleSize, candleSize,  1, 1, 0,
            candleSize, -candleSize, candleSize,   1, 1, 0,
            candleSize, -candleSize, -candleSize,  1, 1, 0,

            candleSize, -candleSize, -candleSize,  1, 1, 0,
            -candleSize, -candleSize, -candleSize, 1, 1, 0,
            -candleSize, -candleSize, candleSize,  1, 1, 0,

            // Left
            -candleSize, -candleSize, candleSize,  1, 1, 0,
            -candleSize, candleSize, candleSize,   1, 1, 0,
            -candleSize, candleSize, -candleSize,  1, 1, 0,

            -candleSize, candleSize, -candleSize,  1, 1, 0,
            -candleSize, -candleSize, -candleSize, 1, 1, 0,
            -candleSize, -candleSize, candleSize,  1, 1, 0,

            // Right
            candleSize, -candleSize, candleSize,   1, 1, 0,
            candleSize, candleSize, candleSize,    1, 1, 0,
            candleSize, candleSize, -candleSize,   1, 1, 0,

            candleSize, candleSize, -candleSize,   1, 1, 0,
            candleSize, -candleSize, -candleSize,  1, 1, 0,
            candleSize, -candleSize, candleSize,   1, 1, 0,

            // Front
            -candleSize, -candleSize, -candleSize,  1, 1, 0,
            -candleSize, candleSize, -candleSize,   1, 1, 0,
            candleSize, candleSize, -candleSize,    1, 1, 0,

            candleSize, candleSize, -candleSize,    1, 1, 0,
            candleSize, -candleSize, -candleSize,   1, 1, 0,
            -candleSize, -candleSize, -candleSize,  1, 1, 0,

            // Back
            -candleSize, candleSize, candleSize,   1, 1, 0,
            candleSize, candleSize, candleSize,    1, 1, 0,
            candleSize, -candleSize, candleSize,   1, 1, 0,

            candleSize, -candleSize, candleSize,   1, 1, 0,
            -candleSize, -candleSize, candleSize,  1, 1, 0,
            -candleSize, candleSize, candleSize,   1, 1, 0,

            // Create the wooden part of the torch
            // Bottom
            -candleSize, -baseHeight, candleSize,  1, 1, 1,
            -candleSize, -baseHeight, -candleSize, 1, 1, 1,
            candleSize, -baseHeight, -candleSize,  1, 1, 1,

            candleSize, -baseHeight, -candleSize,  1, 1, 1,
            candleSize, -baseHeight, candleSize,   1, 1, 1,
            -candleSize, -baseHeight, candleSize,  1, 1, 1,

            // Left
            -candleSize, -baseHeight, candleSize,  1, 1, 1,
            -candleSize, -baseHeight, -candleSize, 1, 1, 1,
            -candleSize, -candleSize, -candleSize, 1, 1, 1,

            -candleSize, -candleSize, -candleSize, 1, 1, 1,
            -candleSize, -candleSize, candleSize,  1, 1, 1,
            -candleSize, -baseHeight, candleSize, 1, 1, 1,
            
            // Right
            candleSize, -baseHeight, candleSize,   1, 1, 1,
            candleSize, -baseHeight, -candleSize,  1, 1, 1,
            candleSize, -candleSize, -candleSize,  1, 1, 1,

            candleSize, -candleSize, -candleSize,  1, 1, 1,
            candleSize, -candleSize, candleSize,   1, 1, 1,
            candleSize, -baseHeight, candleSize,   1, 1, 1,

            // Front
            // -candleSize, -baseHeight, -candleSize, 1, 1, 1,
            // -candleSize, -candleSize, candleSize,  1, 1, 1,
            // candleSize, -candleSize, candleSize,   1, 1, 1,

            // -candleSize, -baseHeight, -candleSize, 1, 1, 1,
            // candleSize, -candleSize, candleSize,   1, 1, 1,
            // candleSize, -baseHeight, candleSize,   1, 1, 1,

            // Back
            // -candleSize, -baseHeight, -candleSize, 1, 1, 1,
            // -candleSize, -candleSize, -candleSize, 1, 1, 1,
            // candleSize, -candleSize, -candleSize,  1, 1, 1,

            // candleSize, -candleSize, -candleSize,  1, 1, 1,
            // candleSize, -baseHeight, candleSize,   1, 1, 1,
            // -candleSize, -baseHeight, -candleSize, 1, 1, 1,
        ]
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

	update() {
		this.Move();
	}
}