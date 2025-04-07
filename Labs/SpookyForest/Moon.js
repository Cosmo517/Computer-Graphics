class Moon extends DirectionalLight {
	constructor() {
		super();

        // Temporary Moon
        let moonSize = 1;
        this.vertices = [];
        this.sphere(20)
	
        this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

    // The following sphere generation code was taken from
    // https://dev.to/ndesmic/webgl-3d-engine-from-scratch-part-6-procedural-sphere-generation-29bf
    // It has been very slightly modified to fit into the project
    latLngToCartesian([radius, lat, lng]){
        lng = -lng + Math.PI / 2;
        return [
            radius * Math.cos(lat) * Math.cos(lng),
            radius * Math.sin(lat),
            radius * -Math.cos(lat) * Math.sin(lng),
        ];
    }

    sphere(density){
        const radsPerUnit = Math.PI / density;
        const sliceVertCount = density * 2;
    
        const positions = [];
        let latitude = -Math.PI / 2;
        //latitude
        for(let i = 0; i <= density; i++){
            if(i === 0 || i === density){ //polar caps
                positions.push(this.latLngToCartesian([1, latitude, 0]));
            } else {
                let longitude = 0;
                for (let j = 0; j < sliceVertCount; j++) {
                    positions.push(this.latLngToCartesian([1, latitude, longitude]));
                    longitude += radsPerUnit;
                }
            }
            latitude += radsPerUnit;
        }
    
        // Colors
        const colors = [];
        for(let i = 0; i < positions.length; i++){
            colors.push([1, 1, 1]);
        }

        // Triangles
        const triangles = [];
        for(let ring = 0; ring < density - 1; ring++){
            const initialP = (ring * sliceVertCount) + 1;
            for (let sliceVert = 0; sliceVert < sliceVertCount; sliceVert++){
                const thisP = initialP + sliceVert;
                const nextP = initialP + ((sliceVert + 1) % sliceVertCount);

                if(ring === 0) {
                    triangles.push(...positions[0])
                    triangles.push(...colors[0])
                    triangles.push(...positions[nextP])
                    triangles.push(...colors[nextP])
                    triangles.push(...positions[thisP])
                    triangles.push(...colors[thisP])                    
                }

                if(ring === density - 2) {
                    triangles.push(...positions[thisP])
                    triangles.push(...colors[thisP])
                    triangles.push(...positions[nextP])
                    triangles.push(...colors[nextP])
                    triangles.push(...positions[positions.length - 1])
                    triangles.push(...colors[positions.length - 1])
                }

                if(ring < density - 2 && density > 2){
                    triangles.push(...positions[thisP])
                    triangles.push(...colors[thisP])
                    triangles.push(...positions[nextP + sliceVertCount])
                    triangles.push(...colors[nextP + sliceVertCount])
                    triangles.push(...positions[thisP + sliceVertCount])
                    triangles.push(...colors[thisP + sliceVertCount])

                    triangles.push(...positions[thisP])
                    triangles.push(...colors[thisP])
                    triangles.push(...positions[nextP])
                    triangles.push(...colors[nextP])
                    triangles.push(...positions[nextP + sliceVertCount])
                    triangles.push(...colors[nextP + sliceVertCount])
                }
            }
        }
        
        this.vertices = triangles;
    }





	update() {
		// Do nothing
	}
}