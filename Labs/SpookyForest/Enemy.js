class Enemy extends SpotLight {
    constructor() {
        super();
        this.lightLoc = [0, 0, 0];
        this.lightDir = [0, 0, 0];
        this.isTrigger = true;

        this.vertices = [];
        this.sphere(20);

        this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
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
        const radius = 1.5;
        const leafColor = [1.0, 0.0, 0.0];

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
}