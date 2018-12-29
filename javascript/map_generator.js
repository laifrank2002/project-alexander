var Map_Generator = (
	function()
	{
		return {
			generate_plains: function(width, height)
			{
				var map_string = "";
				for (var index = 0; index < width*height; index++)
				{
					map_string += getProbability({"grass1":5,"grass2":1});
					if(index != width*height -1)
					{
						map_string += ",";
					}
					else
					{
						map_string += "";
					}
				}
				return new Map(map_string,width,height);
			}
		}
	}
)();