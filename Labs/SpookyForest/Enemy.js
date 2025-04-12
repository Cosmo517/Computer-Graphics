class Enemy extends SpotLight {
    constructor() {
        super();
        this.lightLoc = [0, 0, 0];
        this.lightDir = [0, 0, 0];
        this.isTrigger = true;
        this.moveSpeed = 0.2;

        this.vertices = [];
        this.sphere(20);

        this.moveTimer = 0;
        this.moveInterval = 120;

        this.buffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    enemyMovement() {
        // Random direction: 0 = N, 1 = NE, 2 = E, 3 = SE, 4 = S, 5 = SW, 6 = W, 7 = NW
        const randomEnemyMovement = Math.floor(Math.random() * 8);

        this.velocity = [0, 0, 0];

        // Use hardcoded directions
        switch (randomEnemyMovement) {
            case 0:
                this.velocity[2] = this.moveSpeed;
                break;
            case 1:
                this.velocity[0] = this.moveSpeed * Math.cos(Math.PI / 4);
                this.velocity[2] = this.moveSpeed * Math.sin(Math.PI / 4);
                break;
            case 2:
                this.velocity[0] = this.moveSpeed;
                break;
            case 3:
                this.velocity[0] = this.moveSpeed * Math.cos(Math.PI / 4);
                this.velocity[2] = -this.moveSpeed * Math.sin(Math.PI / 4);
                break;
            case 4:
                this.velocity[2] = -this.moveSpeed;
                break;
            case 5:
                this.velocity[0] = -this.moveSpeed * Math.cos(Math.PI / 4);
                this.velocity[2] = -this.moveSpeed * Math.sin(Math.PI / 4);
                break;
            case 6: 
                this.velocity[0] = -this.moveSpeed;
                break;
            case 7:
                this.velocity[0] = -this.moveSpeed * Math.cos(Math.PI / 4);
                this.velocity[2] = this.moveSpeed * Math.sin(Math.PI / 4);
                break;
        }
    }

    update() {
        this.moveTimer++;
        if (this.moveTimer > this.moveInterval) {
            this.enemyMovement()
            this.moveTimer = 0;
        }

        this.Move();
        this.lightLoc = [...this.loc];
        this.collisionLocation = [this.loc[0], this.collisionLocation[1], this.loc[2]];
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