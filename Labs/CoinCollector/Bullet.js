class Bullet extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		//Now we want to add color to our vertices information.
		const r_inner = 0.01;
		const r_outer = 0.025;
		
		this.vertices = [
			// Top blade
			-r_inner, r_inner, 0.0,  0, 0, 0,
			0,        r_outer, 0.0,  0, 0, 0,
			r_inner,  r_inner, 0.0,  0, 0, 0,
		
			// Right blade
			r_inner,   r_inner, 0.0,  0, 0, 0,
			r_outer,   0,       0.0,  0, 0, 0,
			r_inner,  -r_inner, 0.0,  0, 0, 0,
		
			// Bottom blade
			r_inner,  -r_inner, 0.0,  0, 0, 0,
			0,        -r_outer, 0.0,  0, 0, 0,
			-r_inner, -r_inner, 0.0,  0, 0, 0,
		
			// Left blade
			-r_inner, -r_inner, 0.0,  0, 0, 0,
			-r_outer,  0,       0.0,  0, 0, 0,
			-r_inner,  r_inner, 0.0,  0, 0, 0,
		];
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0.0, 0.0, 0.0];
		this.rot = [0.0, 0.0, 0.0];
	}
    
	update() {
        let forward = [
			Math.sin(this.rot[2]),
			Math.cos(this.rot[2]),
			0
		];

		this.velocity = [0, 0, 0];

        for (let i = 0; i < 3; i++) {
            this.velocity[i] += forward[i] * 0.02;
        }

        this.Move()
	}
}