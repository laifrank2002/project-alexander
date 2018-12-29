/** 
	Wrapper for canvas object. Does much of the animation.
	Some code taken from clocks-in-a-cooler.
	https://github.com/Clocks-in-a-Cooler
	@author Frank Lai 2002
	@version 2018-12-11
	https://github.com/laifrank2002
 */

var Canvas = (
	function()
	{
		// constants 
		var DEFAULT_CANVAS = "main_canvas";
		var TILE_SIZE = 64;
		
		// private fields
		var canvas;
		var context;
		var map;
		var pause;
		
		var offset_x;
		var offset_y;
		
		var selected_tile;
		return {
			initialize: function()
			{
				Engine.log("Initializing Canvas...");
				canvas = document.getElementById(DEFAULT_CANVAS);
				context = canvas.getContext("2d");
				
				offset_x = 20;
				offset_y = 0;
				
				pause = false;
				selected_tile = {x:0,y:0}
				// MUST ALWAYS BE THE LAST 
				Canvas.request_frame();
			},
			
			request_frame: function()
			{				
				map = Game.get_map("testing");
				selected_tile = Game.get_selected_tile();
				//up to this point, nothing has been drawn yet!
				
				// clear and draw
				context.clearRect(0, 0, canvas.width, canvas.height);
				
				// draw grid
				
				for (var x = 0; x < map.width; x++)
				{
					for (var y = 0; y < map.height; y++)
					{
						Canvas.draw_tile(x,y)
						// draw tile
						context.fillText(map.get_tile(x,y), offset_x + x*TILE_SIZE + TILE_SIZE/2, offset_y + (y)*TILE_SIZE + TILE_SIZE/2);
						if (image_library[map.get_tile(x,y)])
						{
							context.drawImage(image_library[map.get_tile(x,y)],offset_x + x*TILE_SIZE, offset_y + y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
						}
						// render all map objects if availible
						var tile_map_objects = map.get_map_objects(x,y);
						for (var index = 0; index < tile_map_objects.length; index++)
						{
							if (image_library[tile_map_objects[index].image])
							{
								context.drawImage(image_library[tile_map_objects[index].image],offset_x + x*TILE_SIZE, offset_y + y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
								// if type is unit, draw unit info 
								if (tile_map_objects[index].type === "unit")
								{
										context.drawImage(image_library["hitpoints"],offset_x + x*TILE_SIZE, offset_y + y*TILE_SIZE, TILE_SIZE/4, TILE_SIZE/4);
										context.fillText(tile_map_objects[index]["hitpoints"], offset_x + x*TILE_SIZE + TILE_SIZE/24, offset_y + y*TILE_SIZE + TILE_SIZE/6);
								}
							}
						} // end for index 
					} // end for y
				} // end for x
				
				// draw selected tile over top
				
				Canvas.draw_tile(selected_tile.x,selected_tile.y, "red");
				
				// display movement
			},
			
			draw_tile: function(x, y, line_style)
			{
				if (x !== null && y !== null) // if values not null
				{
					// reset
					context.strokeStyle = line_style || "black";

					// draw square
					context.beginPath();
					context.moveTo(offset_x + x*TILE_SIZE, offset_y + y*TILE_SIZE);
					context.lineTo(offset_x + (x+1)*TILE_SIZE,offset_y + (y)*TILE_SIZE);
					context.lineTo(offset_x + (x+1)*TILE_SIZE,offset_y + (y+1)*TILE_SIZE);
					context.lineTo(offset_x + (x)*TILE_SIZE,offset_y + (y+1)*TILE_SIZE);
					context.closePath();
					
					// finish
					context.stroke();
				}
			},
			
			handle_left_click: function(mouse_x, mouse_y)
			{
				selected_tile = Game.get_selected_tile();
				tile_x = Math.floor((mouse_x - offset_x) / TILE_SIZE);
				tile_y = Math.floor((mouse_y - offset_y) / TILE_SIZE);
				
				if (tile_x >= map.width || tile_y >= map.height || tile_x < 0 || tile_y < 0)
				{
					Engine.log("Mouse clicked at tile: " + tile_x + "," + tile_y)
					Engine.log("Out of bounds.");
				}
				else
				{
					Engine.log("Mouse clicked at tile: " + tile_x + "," + tile_y)
					if (tile_x === selected_tile.x && tile_y === selected_tile.y)
					{
						Game.cycle_selected_object();
					}
					else 
					{
						if (Game.get_selected_object())
						{
							Game.move_selected_object(tile_x,tile_y);
						}
						Game.set_selected_tile(tile_x, tile_y);
					}
					Canvas.request_frame();
				}
			},
			
			handle_right_click: function(mouse_x, mouse_y)
			{
				// simply deselects
				Game.deselect();
				Canvas.request_frame();
			},
		}
	}
)();