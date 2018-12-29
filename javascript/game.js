var Game = (
	function()
	{
		var selected_tile;
		var maps;
		var current_map;
		return {
			initialize: function()
			{
				Engine.log("Initializing Game...");
				maps = {}
				selected_tile = {x:null,y:null,map_object:null, index: null};
				
				// TESTING
				maps["testing"] = (Map_Generator.generate_plains(10,10));
				maps["testing"].add_map_object(3,0,{name:"musketeer",type:"unit",image:"musketeer",hitpoints:10});
				maps["testing"].add_map_object(3,1,{name:"british_infantry",type:"unit",image:"british_infantry",hitpoints:30});
				maps["testing"].add_map_object(3,2,{name:"british_infantry",type:"unit",image:"british_infantry",hitpoints:30});
				maps["testing"].add_map_object(3,3,{name:"british_infantry",type:"unit",image:"british_infantry",hitpoints:30});
				maps["testing"].add_map_object(4,2,{name:"british_cannon",type:"unit",image:"british_cannon",hitpoints:20});
				
				current_map = Game.get_map("testing");
			},
			
			get_map: function(index)
			{
				return maps[index];
			},
			
			get_selected_tile: function()
			{
				return {x:selected_tile.x,y:selected_tile.y};
			},
			
			set_selected_tile: function(x, y)
			{
				selected_tile.x = x;
				selected_tile.y = y;
				if(current_map.get_map_objects(x,y).length > 0)
				{
					selected_tile.map_object = current_map.get_map_objects(x,y)[0];
					selected_tile.index = 0;
					Engine.log ("Selected: " + selected_tile.map_object.name);
				}
				else 
				{
					selected_tile.index = null;
					selected_tile.map_object = null;
					Engine.log ("Selected: " + "null");
				}
				
			},
			
			get_selected_object: function()
			{
				return selected_tile.map_object;
			},
			
			move_selected_object: function(new_x, new_y)
			{
				if (selected_tile.map_object !== null)
				{
					current_map.move_map_object(selected_tile.x, selected_tile.y, new_x, new_y, selected_tile.index);
				}
			},
			
			cycle_selected_object: function()
			{
				if (current_map.get_map_objects(selected_tile.x,selected_tile.y).length > 0)
				{
					selected_tile.index++;
					if (selected_tile.index >= current_map.get_map_objects(selected_tile.x,selected_tile.y).length)
					{
						selected_tile.index = 0;
					}
					selected_tile.map_object = current_map.get_map_object(selected_tile.x, selected_tile.y, selected_tile.index);
					Engine.log ("Selected: " + selected_tile.map_object.name);
				}
			},
			
			deselect: function()
			{
				selected_tile = {x:null,y:null,map_object:null, index: null};
			},
		}
	}
)();

/**
 * For a model like this:
 * {"item": 1, "item2": 1, "item3": 5}
 * Evenly splits the outcomes according to the weights
 * Returns the item selected
 */
function getProbability (probability)
{
	var total = 0;
	for (var chance in probability)
	{
		total += probability[chance];
	}
	// roll the die
	var result = Math.random() * total;
	var currentIndex = 0;
	for (var chance in probability)
	{
		currentIndex += probability[chance];
		if (result < currentIndex)
		{
			return chance;
		}
	}
}