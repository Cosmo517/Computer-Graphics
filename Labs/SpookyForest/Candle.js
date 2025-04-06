class Candle extends PointLight {
	constructor() {
		super();

		this.angVelocity = [0, 0 ,0];
		this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        // Temporary Moon
        let candleSize = 0.5;
        this.vertices = [
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
        ]
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

	update() {
		this.Move();
	}
}