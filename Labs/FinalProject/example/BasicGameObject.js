class Ground extends GameObject
{
	constructor()
	{
		super();
		this.buffer=gl.createBuffer();
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		
		//!!!!!!!!!!!!!TEXTURE CHANGE !!!!!!!!!!!
		this.picture = CreateCheckered();
		
		// s and t are u and v in our example. so s = u and t = v
		// This isnt mathematically true, but for us, it is
		this.vertices =
		[//  X     Y  Z     s t
			-1000,0,-1000,  0,0,
			1000,0, -1000,  100,0,
			-1000,0,1000,   0,100,
			1000, 0,1000,   100,100	
		];
		
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//We only want to do this once.
		//void gl.texImage2D(target, level, internalformat, width, height, border, format, 
		//type, ArrayBufferView? pixels);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.picture));
	
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0,0,0];
		this.rot=[0,0,0];
	}
	Update()
	{
		//Do Nothing
	}
	Render(program)
	{
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		
		//MAKE SURE YOU CHANGE THIS TO 5 FOR TEXTURES
		var stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TEXTURE CHANGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//Now we have to do this for color
		var TexAttributeLocation = gl.getAttribLocation(program,"texcord");
		//We don't have to bind because we already have the correct buffer bound.
		size = 2;
		type = gl.FLOAT;
		normalize = false;
		stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(TexAttributeLocation);
		gl.vertexAttribPointer(TexAttributeLocation, size, type, normalize, stride, offset);
				
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);			
				
				
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
	 
	 //var ibuffer = gl.createBuffer();
	 //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuffer);
	 //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
	 //gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
	 gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
}
class Hex extends GameObject
{
	constructor()
	{
		super();
		this.angVelocity = [0,.025,0];
		this.isTrigger = false;
		this.buffer=gl.createBuffer();

		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		
		
		//!!!!!!!!!!!!!!!!!Changes due to texture
		this.MyPicture = CreateBrick();
		//Get vertices from announcements
		this.vertices =
		[
			//X, Y,  Z,  U,  V,
			-.5,-.5,-.25,0,0,
			-.5, .5,-.25,0,10,
			-.25,-.5,-.5,10,0,
			-.25, .5,-.5,10,10,
			.25,-.5,-.5,0,0,
			.25,.5,-.5,0,10,
			.5,-.5,-.25,10,0,
			.5, .5,-.25,10,10,
			.5,-.5,.25,0,0,
			.5, .5,.25,0,10,
			.25,-.5,.5,10,0,
			.25, .5,.5,10,10,
			-.25,-.5,.5,0,0,
			-.25, .5,.5,0,10,
			-.5,-.5,.25,10,0,
			-.5, .5,.25,10,10,
			-.5, -.5,-.25,0,0,
			-.5, .5,-.25,0,10
		];
		
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.MyPicture));
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0,0,0];
		this.rot=[0,0,0];
	}
	Update()
	{
		this.Move();
	}
	Render(program)
	{
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		
		//Make sure you change this to 5 for your TEXTURES
		var stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TEXTURE CHANGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"texcord");
		//We don't have to bind because we already have the correct buffer bound.
		size = 2;
		type = gl.FLOAT;
		normalize = false;
		stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S,gl.MIRRORED_REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.MIRRORED_REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);					
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
	 
	 //var ibuffer = gl.createBuffer();
	 //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuffer);
	 //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
	 //gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
	 gl.drawArrays(gl.TRIANGLE_STRIP, 0, 18);
	}
}
class Camera extends GameObject
{
	constructor()
	{
			super();
			
	}
	Update()
	{
		var deltaX = 0;
		var deltaZ = 0;
		var deltaR = 0;
		if( "A" in m.Keys && m.Keys["A"])
		{
			this.rot[1] -=.01;
		}
		if("D" in m.Keys && m.Keys["D"])
		{
			this.rot[1] +=.01;
		}
		if("W" in m.Keys && m.Keys["W"])
		{
			this.transform.doRotations(this.rot);
			deltaX += this.transform.forward[0]*.25;
			deltaZ += this.transform.forward[2]*.25;
		}
		if("S" in m.Keys && m.Keys["S"])
		{
			this.transform.doRotations(this.rot);
			deltaX -= this.transform.forward[0]*.25;
			deltaZ -= this.transform.forward[2]*.25;
		}
		this.loc[0] += deltaX;
		this.loc[2] += deltaZ;
	}
	Render(program)
	{
				var camLoc  = gl.getUniformLocation(program,'worldLoc');
				gl.uniform3fv(camLoc,new Float32Array(this.loc));
				var worldLoc = gl.getUniformLocation(program,'worldRotation');
				gl.uniform3fv(worldLoc,new Float32Array(this.rot));
	}
	
	
}


class Quad extends GameObject
{
	constructor()
	{
		super();
		this.angVelocity = [0,0,0];
		this.isTrigger = false;
		this.buffer=gl.createBuffer();

		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		
		
		//!!!!!!!!!!!!!!!!!Changes due to texture
		this.MyPicture = CreateCrate();

		//Get vertices from announcements
		this.vertices =
		[
			//X 	Y 	Z   S   T
			-1,		-1,	0, 0,   1,
			1,		-1, 0, 1,   1,
			-1,      1, 0, 0,   0,
			1,		1,  0, 1,   0
		];
		
		this.MyTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//We only want to do this once.
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,64,64,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.MyPicture));
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc=[0,0,0];
		this.rot=[0,0,0];
	}
	Update()
	{
		this.Move();
	}
	Render(program)
	{
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		
		//Make sure you change this to 5 for your TEXTURES
		var stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
		
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TEXTURE CHANGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//Now we have to do this for color
		var colorAttributeLocation = gl.getAttribLocation(program,"texcord");
		//We don't have to bind because we already have the correct buffer bound.
		size = 2;
		type = gl.FLOAT;
		normalize = false;
		stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element
		offset = 3*Float32Array.BYTES_PER_ELEMENT;									//size of the offset
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);
				
		gl.bindTexture(gl.TEXTURE_2D, this.MyTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE                   
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);					
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				
		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));
	 
		var FaceCamLoc = gl.getUniformLocation(program,'FaceCam');
		gl.uniform1i(FaceCamLoc,true);
	 
		 //var ibuffer = gl.createBuffer();
		 //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ibuffer);
		 //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.indexOrder),gl.STATIC_DRAW);
		 //gl.drawElements(gl.TRIANGLES,this.indexOrder.length,gl.UNSIGNED_BYTE,0);
		 gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		 
		 gl.uniform1i(FaceCamLoc,false);
	}
}



