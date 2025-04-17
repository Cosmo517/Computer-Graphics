class Sun extends GameObject {
	constructor() {
		super();
		this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
        this.collisionRadius = 1.0;
        this.lightDirection = [0, 0, 0]
        this.isSun = 1;

        // Texture
        this.MyPicture = CreateSun();
        // this.MyPicture = CreateLightType();
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);

		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 16, 16, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(this.MyPicture));

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        this.vertices = [];
        this.sphere(20)
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	}

    setLightData(lightDirection) {
        this.lightDirection = lightDirection;
    }

	update() {
        // Do nothing
    }

	render(program) {
		let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		let size = 3;
		let type = gl.FLOAT;
		let normalize = false;
		
		let stride = 5 * Float32Array.BYTES_PER_ELEMENT;
		let offset = 0;
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TEXTURE CHANGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//Now we have to do this for color
		let colorAttributeLocation = gl.getAttribLocation(program, "texcord");
		//We don't have to bind because we already have the correct buffer bound.
		size = 2;
		type = gl.FLOAT;
		normalize = false;
		stride = 5 * Float32Array.BYTES_PER_ELEMENT;
		offset = 3 * Float32Array.BYTES_PER_ELEMENT;
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);					
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				
		const tranLoc  = gl.getUniformLocation(program, 'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		const thetaLoc = gl.getUniformLocation(program, 'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
		const scaleLoc = gl.getUniformLocation(program, 'scale')
		gl.uniform3fv(scaleLoc, new Float32Array(this.scale));
        const directionalLightLoc = gl.getUniformLocation(program, 'directionalLightDir');
        gl.uniform3fv(directionalLightLoc, new Float32Array(this.lightDirection));
		const isSun = gl.getUniformLocation(program, 'isSun');
		gl.uniform1i(isSun, this.isSun);
        const isLightWall = gl.getUniformLocation(program, 'isLightWall');
		gl.uniform1i(isLightWall, this.isLightWall);

		gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 5);
	}


    latLngToCartesian([radius, lat, lng]){
        lng = -lng + Math.PI / 2;
        return [
            radius * Math.cos(lat) * Math.cos(lng),
            radius * Math.sin(lat),
            radius * -Math.cos(lat) * Math.sin(lng),
        ];
    }
    
    latLngToUV(lat, lng) {
        // Normalize longitude from [0, 2PI]
        let u = (lng + Math.PI) / (2 * Math.PI);
        // Normalize latitude from [0, PI]
        let v = (lat + Math.PI / 2) / Math.PI;
        return [u, v];
    }
    
    sphere(density){
        const radsPerUnit = Math.PI / density;
        const sliceVertCount = density * 2;
    
        const positions = [];
        const uvs = [];
    
        let latitude = -Math.PI / 2;
        for(let i = 0; i <= density; i++){
            if(i === 0 || i === density){ //polar caps
                const lat = latitude;
                const lng = 0;
                positions.push(this.latLngToCartesian([1, lat, lng]));
                uvs.push(this.latLngToUV(lat, lng));
            } else {
                let longitude = -Math.PI;
                for (let j = 0; j < sliceVertCount; j++) {
                    const lat = latitude;
                    const lng = longitude;
                    positions.push(this.latLngToCartesian([1, lat, lng]));
                    uvs.push(this.latLngToUV(lat, lng));
                    longitude += radsPerUnit;
                }
            }
            latitude += radsPerUnit;
        }
    
        const triangles = [];
        for(let ring = 0; ring < density - 1; ring++){
            const initialP = (ring * sliceVertCount) + 1;
            for (let sliceVert = 0; sliceVert < sliceVertCount; sliceVert++){
                const thisP = initialP + sliceVert;
                const nextP = initialP + ((sliceVert + 1) % sliceVertCount);
    
                if(ring === 0) {
                    triangles.push(...positions[0])
                    triangles.push(...uvs[0])
                    triangles.push(...positions[nextP])
                    triangles.push(...uvs[nextP])
                    triangles.push(...positions[thisP])
                    triangles.push(...uvs[thisP])                    
                }
    
                if(ring === density - 2) {
                    const last = positions.length - 1;
                    triangles.push(...positions[thisP])
                    triangles.push(...uvs[thisP])
                    triangles.push(...positions[nextP])
                    triangles.push(...uvs[nextP])
                    triangles.push(...positions[last])
                    triangles.push(...uvs[last])
                }
    
                if(ring < density - 2 && density > 2){
                    triangles.push(...positions[thisP])
                    triangles.push(...uvs[thisP])
                    triangles.push(...positions[nextP + sliceVertCount])
                    triangles.push(...uvs[nextP + sliceVertCount])
                    triangles.push(...positions[thisP + sliceVertCount])
                    triangles.push(...uvs[thisP + sliceVertCount])
    
                    triangles.push(...positions[thisP])
                    triangles.push(...uvs[thisP])
                    triangles.push(...positions[nextP])
                    triangles.push(...uvs[nextP])
                    triangles.push(...positions[nextP + sliceVertCount])
                    triangles.push(...uvs[nextP + sliceVertCount])
                }
            }
        }
    
        this.vertices = triangles;
    }
}