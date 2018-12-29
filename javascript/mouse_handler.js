var Mouse_Handler = (
	function()
	{
		var DEFAULT_PANEL = "main_canvas";
		var panel;
		return {
			initialize: function()
			{
				Engine.log("Initializing Mouse Handler...");
				panel = document.getElementById(DEFAULT_PANEL);
				Mouse_Handler.activate();
			},
			
			activate: function()
			{
				panel.addEventListener("click", Mouse_Handler.handle_click, false);
				panel.addEventListener("contextmenu", Mouse_Handler.handle_click, false);
			},
			
			deactivate: function()
			{
				panel.removeEventListener("click", Mouse_Handler.handle_click, false);
				panel.removeEventListener("contextmenu", Mouse_Handler.handle_click, false);
			},
			
			handle_click: function(event)
			{
				var rectangle = panel.getBoundingClientRect();
				var mouse_x = event.clientX - rectangle.left;
				var mouse_y = event.clientY - rectangle.top;
				//Engine.log("Mouse clicked at: " + mouse_x + "," + mouse_y);
				Engine.log(event.button);
				if (event.button === 0)
				{
					Canvas.handle_left_click(mouse_x,mouse_y);
				}
				else if (event.button === 2)
				{
					event.preventDefault(); // stop right click context menu
					Canvas.handle_right_click(mouse_x,mouse_y);
				}
			},
		}
	}
)();