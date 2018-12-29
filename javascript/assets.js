// loads assets
var image_library = {
	"musketeer": create_image("image/musketeer.png"),
	"musketeer2": create_image("image/musketeer2.png"),
	"musketeer3": create_image("image/musketeer3.png"),
	"british_infantry": create_image("image/3xmusketeer.png"),
	"british_cannon": create_image("image/cannon1.png"),
	"hitpoints": create_image("image/hitpoints.png"),
	"grass1": create_image("image/grass1.png"),
	"grass2": create_image("image/grass2.png"),
}

function create_image(path) 
{
	var image = document.createElement("IMG");
	image.src = path;

	return image;
}