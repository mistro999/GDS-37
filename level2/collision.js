function checkBoundaries(object, canvas)
{
	if (object.y < 0) 
	{
		object.y = 0;
	}
	if (object.y + object.height > canvas.height) 
	{ 
		object.y = canvas.height - object.height;
	}
}