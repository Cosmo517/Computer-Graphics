class Goal extends GameObject {
    constructor() {
        super();
        this.vertices = [];
        this.sphere(20);
        this.collisionRadius = 1;
        this.isTrigger = true;

        this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    onTriggerEnter(other) {
        alert("You win!")
    }

    update() {
        // Do nothing
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
        const radius = 1;
        const leafColor = [0.0, 0.0, 1.0];

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
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        const size = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
        let offset = 0;
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

        const colorAttributeLocation = gl.getAttribLocation(program, "vert_color");
        offset = 3 * Float32Array.BYTES_PER_ELEMENT;
        gl.enableVertexAttribArray(colorAttributeLocation);
        gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);

        const tranLoc = gl.getUniformLocation(program, 'transform');
        gl.uniform3fv(tranLoc, new Float32Array(this.loc));
        const thetaLoc = gl.getUniformLocation(program, 'rotation');
        gl.uniform3fv(thetaLoc, new Float32Array(this.rot));
        const scaleLoc = gl.getUniformLocation(program, "scale");
        gl.uniform3fv(scaleLoc, new Float32Array(this.scale));

        // Draw sphere
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 6);
    }
}