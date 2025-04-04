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