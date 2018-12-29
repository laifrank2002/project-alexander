/** 
	Portable lightweight engine.
	@author Frank Lai 2002
	@version 2018-12-11
	https://github.com/laifrank2002
 */

var Engine = (
	function()
	{
		// private fields
		var _log = true;
		return {
			
			initialize: function()
			{
				Engine.log("Initializing Engine...");
				Game.initialize();
				Canvas.initialize();
				Mouse_Handler.initialize();
				
			},
			
			log: function(message)
			{
				if (_log)
				{
					console.log(message);
				}
			},
		}
	}
)();

function createArray(length) {
    var array = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) array[length-1 - i] = createArray.apply(this, args);
    }

    return array;
}
