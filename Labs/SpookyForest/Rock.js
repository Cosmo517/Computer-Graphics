class Rock extends GameObject {
	constructor() {
		super();

		this.angVelocity = [0, 0, 0];
		this.collisionRadius = 0.1;
		
		this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

		this.vertices = [];
		this.sphere(4)
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

	update() {
		// do nothing
	}

	latLngToCartesian([radius, lat, lng]) {
        lng = -lng + Math.PI / 2;
        const yOffset = 0;
        return [
            radius * Math.cos(lat) * Math.cos(lng),
            radius * Math.sin(lat) + yOffset,
            radius * -Math.cos(lat) * Math.sin(lng),
        ];
    }

    sphere(density) {
        const radsPerUnit = Math.PI / density;
        const sliceVertCount = density * 2;
        const radius = 0.75;
        const leafColor = [0.8, 0.8, 0.8];

        const positions = [];
        let latitude = -Math.PI / 2;
        for (let i = 0; i <= density; i++) {
            if (i === 0 || i === density) { // Polar caps
                positions.push(this.latLngToCartesian([radius, latitude, 0]));
            } else {
                let longitude = 0;
                for (let j = 0; j < sliceVertCount; j++) {
                    positions.push(this.latLngToCartesian([radius, latitude, longitude]));
                    longitude += radsPerUnit;
                }
            }
            latitude += radsPerUnit;
        }

        // Generate triangles
        for (let ring = 0; ring < density - 1; ring++) {
            const initialP = (ring * sliceVertCount) + 1;
            for (let sliceVert = 0; sliceVert < sliceVertCount; sliceVert++) {
                const thisP = initialP + sliceVert;
                const nextP = initialP + ((sliceVert + 1) % sliceVertCount);

                if (ring === 0) {
                    this.vertices.push(...positions[0], ...leafColor);
                    this.vertices.push(...positions[nextP], ...leafColor);
                    this.vertices.push(...positions[thisP], ...leafColor);
                }

                if (ring === density - 2) {
                    this.vertices.push(...positions[thisP], ...leafColor);
                    this.vertices.push(...positions[nextP], ...leafColor);
                    this.vertices.push(...positions[positions.length - 1], ...leafColor);
                }

                if (ring < density - 2 && density > 2) {
                    this.vertices.push(...positions[thisP], ...leafColor);
                    this.vertices.push(...positions[nextP + sliceVertCount], ...leafColor);
                    this.vertices.push(...positions[thisP + sliceVertCount], ...leafColor);

                    this.vertices.push(...positions[thisP], ...leafColor);
                    this.vertices.push(...positions[nextP], ...leafColor);
                    this.vertices.push(...positions[nextP + sliceVertCount], ...leafColor);
                }
            }
        }
    }

	render(program) {
        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;
		var type = gl.FLOAT;
		var normalize = false;
		var stride = 6*Float32Array.BYTES_PER_ELEMENT;
		var offset = 0;
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"vert_color");

		size = 3;
		type = gl.FLOAT;
		normalize = false;
		stride = 6*Float32Array.BYTES_PER_ELEMENT;
		offset = 3*Float32Array.BYTES_PER_ELEMENT;
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		const scaleLoc = gl.getUniformLocation(program, "scale");
		gl.uniform3fv(scaleLoc, new Float32Array(this.scale));
	
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 6);
	}
}