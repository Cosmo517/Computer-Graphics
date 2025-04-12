class Candle extends PointLight {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
        this.collisionRadius = 0.01;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        const candleSize = 0.1;
        const baseHeight = candleSize * 5;
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
            -candleSize, -baseHeight, candleSize,  0.588, 0.294, 0.0,
            -candleSize, -baseHeight, -candleSize, 0.588, 0.294, 0.0,
            candleSize, -baseHeight, -candleSize,  0.588, 0.294, 0.0,

            candleSize, -baseHeight, -candleSize,  0.588, 0.294, 0.0,
            candleSize, -baseHeight, candleSize,   0.588, 0.294, 0.0,
            -candleSize, -baseHeight, candleSize,  0.588, 0.294, 0.0,

            // Left
            -candleSize, -baseHeight, candleSize,  0.588, 0.294, 0.0,
            -candleSize, -baseHeight, -candleSize, 0.588, 0.294, 0.0,
            -candleSize, -candleSize, -candleSize, 0.588, 0.294, 0.0,

            -candleSize, -candleSize, -candleSize, 0.588, 0.294, 0.0,
            -candleSize, -candleSize, candleSize,  0.588, 0.294, 0.0,
            -candleSize, -baseHeight, candleSize,  0.588, 0.294, 0.0,
            
            // Right
            candleSize, -baseHeight, candleSize,   0.588, 0.294, 0.0,
            candleSize, -baseHeight, -candleSize,  0.588, 0.294, 0.0,
            candleSize, -candleSize, -candleSize,  0.588, 0.294, 0.0,

            candleSize, -candleSize, -candleSize,  0.588, 0.294, 0.0,
            candleSize, -candleSize, candleSize,   0.588, 0.294, 0.0,
            candleSize, -baseHeight, candleSize,   0.588, 0.294, 0.0,

            // Front
            -candleSize, -baseHeight, candleSize, 0.588, 0.294, 0.0,
            -candleSize, -candleSize, candleSize, 0.588, 0.294, 0.0,
            candleSize, -candleSize, candleSize,  0.588, 0.294, 0.0,

            candleSize, -candleSize, candleSize,  0.588, 0.294, 0.0,
            candleSize, -baseHeight, candleSize,  0.588, 0.294, 0.0,
            -candleSize, -baseHeight, candleSize, 0.588, 0.294, 0.0,

            // Back
            -candleSize, -baseHeight, -candleSize, 0.588, 0.294, 0.0,
            -candleSize, -candleSize, -candleSize, 0.588, 0.294, 0.0,
            candleSize, -candleSize, -candleSize,  0.588, 0.294, 0.0,

            candleSize, -candleSize, -candleSize,  0.588, 0.294, 0.0,
            candleSize, -baseHeight, -candleSize,  0.588, 0.294, 0.0,
            -candleSize, -baseHeight, -candleSize, 0.588, 0.294, 0.0,
        ]
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

	update() {
        // Do nothing
    }
}