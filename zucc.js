
class nibbler
{	constructor()
	{
		this.meals			= 0;
		this.level			= 1;
		this.points			= 0;
		this.gameComplete	= false;
		this.levelComplete  = false;
	}
}

class snake
{	constructor(size, clr)
	{
		this.name		= "Zucc";
		this.alive 		= true;
		this.speed 		= 150;
		this.topspeed	= 150;
		this.direction	= 'd';
		this.colour 	= "green";
		this.spurt 		= 0;
		this.tail 		= 0;
		this.head 		= 0;
		this.meals		= 0;
		this.coords 	= [ 1,2,3,4,5 ];
	}

	clear()		{ this.coords= []; }
	add(where)	{ this.coords.push(where); }

	paint()
	{	for(let ctr = 0; ctr < this.coords.length; ctr++)
			{ getMe(this.coords[ctr]).style.backgroundColor = this.colour; }
	}
}

class food
{	constructor()
	{
		this.visible	= true;
		this.colour		= "red";
		this.eaten		= false;
		this.grow		= 1;
		this.timer		= 60;
		this.life		= 60;
		this.coord		= 0;
		this.value		= 4;
		this.count		= 0;
	}
	
	age()
	{
		this.timer--;
		let fade = this.timer / this.life * 100;
		switch(true)
		{
			case fade == 0:
			{	setColour(this.coord, lair.colour);
				this.conjure();
			}
			
			case fade >0 && fade <= 25:
			{	this.colour = "#fbb";
				this.value = 1;
				break;				}

			case fade >25 && fade <=50:
			{	this.colour = "#f99";
				this.value = 2;
				break;				}
			
			case fade >50 && fade <=75:
			{	this.colour = "#f66";
				this.value = 3;
				break;				}
			
			case fade >75 && fade <=100:
			{	this.colour = "#f00";
				this.value = 4;
				break;				}
				
			default:		{break; }
			
		}	this.paint();
	}

	paint()
	{	if(this.visible)	{ setColour(this.coord, this.colour); }
		else				{ setColour(this.coord, getColour(this.coord)); }
	}
	
	conjure()
	{	let ok = true;
		do
		{	ok = true;
			this.coord = Math.floor( Math.random() * lair.last );
			
			for( let z of zucc.coords )
			{	if( this.coord == z )
				{	ok = false;
					break; }}
	
			for (let w of walls.coords )
			{	if( this.coord == w )
				{	ok = false;
					break; }}			
		} while(!ok);
		
		this.timer = this.life;
		this.value = 4;
		this.paint();
		this.count++;
		this.eaten = false;
	}
}
	
class obstacle
{	constructor()
	{
		this.coords	=	[];
		this.colour	=	"black";
	}
	
	add(where)	{ this.coords.push(where); }
	clear()		{ this.coords = []; }
	paint()		{ for(let i of this.coords)		{ setColour(i, this.colour); } }
}

class hGrid
{	constructor()
	{
		this.cols 		= 36;
		this.rows 		= 36;
		this.last		= 0;
		this.colour		= "#444";
		this.timer  	= 0;
		this.turntime	= 0;
	}

	paint()	
	{	let pixels = document.getElementsByClassName("pixl");
		for(let ctr=0; ctr< pixels.length; ctr++)
			{ pixels[ctr].style.backgroundColor = pixels[ctr].value; }
	}
}

//***** Global Variables *****
//****************************
let host  = new nibbler();
let lair  = new hGrid();
let zucc  = new snake();
let apple = new food();
let walls = new obstacle();
let black 	= "black";
let white	= "white";

let levels = 
[
	[],
	[ ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"black",,,,,,,"black",,,"black",,,,,,,"black",,,"black",,,,,,,"black",,,"black",,,,,,,"black",,,"black",,,,,,,"black",,,"black",,,,,,,"black",,,"black",,,,,,,"black",,,"black",,,,,,,"black",,,"black","black","black","black","black","black","black","black",,,,,,,,,,,,10,20 ],
	[ "black",,,,,,,,,,,,,,,,,,,"black",,,,,,,,,,,,,,,,,,,,,,,"black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black",,,,,"black",,,,,,,,,,,,,,,"black",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"black",,,,,,,,,,,,,,,"black",,,,,"black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black",,,,,,,,,,,,,,,,,,,,,,,"black",,,,,,,,,,,,,,,,,,,"black",20,10 ],
	[ ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,black,black,black,black,black,black,black,black,black,black,black,black,black,black,black,black,,,,,black,,,,,,,,,,,,,,,black,,,,,black,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,,black,,,,,black,,,,,,,,,,,,,,,black,,,,,black,,,,,,,,,,,,,,,black,,,,,black,black,black,black,black,black,black,black,black,black,black,black,black,black,black,black,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,black,black,black,black,black,black,black,black,black,black,black,black,black,black,black,black,,,,,black,,,,,,,,,,,,,,,black,,,,,black,,,,,,,,,,,,,,,black,,,,,black,,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,black,,,,,black,,,,,,,,,,,,,,,black,,,,,black,black,black,black,black,black,black,black,black,black,black,black,black,black,black,black,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,20,22 ],
	[ ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,black,black,black,black,black,black,black,black,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,black,black,black,black,black,black,black,black,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,black,black,black,black,black,black,black,black,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,black,black,black,black,black,black,black,black,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,11,19 ],
	[ ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,black,black,black,black,black,black,,black,black,black,black,black,black,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,black,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,19,19 ],

];
	

//*****  Executable Code *****
//****************************
level();
go();


//***** Global functions *****
//****************************
function Lionel()		{ confirm("Hello, Is it me you're looking for?"); }
function getMe(id)		{ return document.getElementById(id); }	
function getColour(id)		{ return getMe(id).value; }
function setColour(id, colour)	{ getMe(id).style.backgroundColor= colour; }


function level()
{	switch(host.level)
	{
		case 1:		getMe("level").innerHTML =   "1- The Beginning";
					getMe("mission").innerHTML = "Eat a dozen apples. \u0020 Avoid hitting any snakes or walls.";
					paintBoard();

					zucc.clear();
					for(let z=1; z < 5; z++)	{ zucc.add(Number(z)); }
					zucc.meals		= 0;
					zucc.topspeed	= 175;
					zucc.speed 		= 175;
					zucc.direction 	= "d";
					zucc.paint();
				
					host.meals 		= 4;
					apple.life 		= 60;
					apple.count 	= 0;
					apple.conjure();
					break;

		case 2:		getMe("level").innerHTML =   "2- Getting Somewhere";
					getMe("mission").innerHTML = "Eat half dozen apples. \u0020 Avoid hitting any snakes or walls.";
					paintBoard();					
					
					zucc.clear();
					for(let z=1; z < 6; z++)	{ zucc.add(Number(z)); }
					zucc.meals 		= 0;
					zucc.topspeed	= 175;
					zucc.speed 		= 175;
					zucc.direction 	= "r";
					zucc.colour		= "yellow";
					zucc.paint();

					host.meals		= 4;
					apple.life		= 48;
					apple.count		= 0;
					apple.conjure();
					break;

		case 3:		getMe("level").innerHTML =   "3- Kabinets";
					getMe("mission").innerHTML = "Eat five apples. \u0020 Avoid hitting any snakes or walls.";
					paintBoard();					
					
					zucc.clear();
					for(let z=135; z > 129; z--)	{ zucc.add(Number(z)); }
					zucc.meals 		= 0;
					zucc.topspeed	= 125;
					zucc.speed 		= 175;
					zucc.direction 	= "l";
					zucc.colour		= "orange";
					zucc.paint();

					host.meals		= 5;
					apple.life		= 60;
					apple.count		= 60;
					apple.conjure();
					break;

		case 4: 	getMe("level").innerHTML =   "4- Ziggy Zaggy";
					getMe("mission").innerHTML = "Eat three apples. \u0020 Avoid hitting any snakes or walls.";
					paintBoard();					
					
					zucc.clear();
					for(let z=12; z < 17; z++)	{ zucc.add(Number(z)); }
					zucc.meals 		= 0;
					zucc.topspeed	= 100;
					zucc.speed 		= 175;
					zucc.direction 	= "r";
					zucc.colour		= "white";
					zucc.paint();

					host.meals		= 3;
					apple.life		= 40;
					apple.count		= 40;
					apple.conjure();
					break;						
		
		case 5:		getMe("level").innerHTML =   "5- Cross";
					getMe("mission").innerHTML = "Eat 10 apples. \u0020 Avoid hitting any snakes or walls.";
					paintBoard();					
					
					zucc.clear();
					for(let z=322; z >312; z--)	{ zucc.add(Number(z)); }
					zucc.meals 		= 0;
					zucc.topspeed	= 130;
					zucc.speed 		= 175;
					zucc.direction 	= "l";
					zucc.colour		= "yellow";
					zucc.paint();

					host.meals		= 10;
					apple.life		= 60;
					apple.count		= 60;
					apple.conjure();
					break;

		default:	break;
	} }

	
function paintBoard()
{
	let thislevel	= levels[host.level];
	lair.rows  		= thislevel[thislevel.length-1];
	lair.cols 		= thislevel[thislevel.length-2];
	lair.last 		= lair.rows * lair.cols -1;

	host.levelComplete = false;
	while (getMe("board").hasChildNodes())		{ getMe("board").removeChild( getMe("board").firstChild ); }
	for(let row=1; row <= lair.rows; row++) {
		for(let col=1; col <= lair.cols; col++) {
					
			let pixl= document.createElement("button");
			pixl.id= lair.cols * (row-1) + (col-1);
			pixl.style.backgroundColor = "#444";
			pixl.className= "pixl";
			pixl.value= "#444";
			getMe("board").appendChild(pixl); 
			if (col==lair.cols) { getMe("board").appendChild(document.createElement("br")); }
	} } lair.paint();

	walls.clear();
	for(let i= 0; i <= lair.last; i++)
	{	switch( thislevel[i] )
		{
			case "black":	walls.add(i);
							break;
			case "green":	break;
			default:		break;
		}
	} walls.paint();
}


function go()
{	setTimeout(function()
	{	
		zucc.tail = zucc.coords[0];
		zucc.head = zucc.coords[ zucc.coords.length -1 ];
		setColour(zucc.tail, getColour( zucc.tail ));			// replace old tail colour with lair colour

		switch(zucc.direction) {
			case "r":	if ( ((zucc.head +1) % lair.cols != 0)  && !collision(zucc.head +1) )
								{ zucc.coords.push(zucc.head + 1); 
								  apple.eaten = (zucc.head +1) == apple.coord ? true : false; }
						else 	{ zucc.alive = false; }
						break;
						
			case "l":	if ( ((zucc.head) % lair.cols != 0) && !collision(zucc.head -1) )
								{ zucc.coords.push(zucc.head -1); 
								  apple.eaten = (zucc.head -1) == apple.coord ? true : false; }
						else	{ zucc.alive = false; }
						break;
						
			case "u":	if (zucc.head >= lair.cols && !collision(zucc.head - lair.cols) )
								{ zucc.coords.push(zucc.head - lair.cols); 
								  apple.eaten = (zucc.head - lair.cols) == apple.coord ? true : false; }
						else	{ zucc.alive = false; }
						break;
			
			case "d":	if ((lair.last - zucc.head) >= lair.cols && !collision(zucc.head + lair.cols) ) 
								{ zucc.coords.push( zucc.head + lair.cols ); 
								  apple.eaten = (zucc.head +lair.cols) == apple.coord ? true : false; }
						else	{ zucc.alive = false; }
						break;
						
			default:	break; }	
			
		if (zucc.alive)							// if Zucc is still alive, check for apples eaten
		{
			if(apple.eaten)						// if apple eaten, award points and increase zucc speed
			{	host.points+= apple.value;		
				zucc.meals++;
				apple.conjure(); 				// place a new apple on board
				zucc.speed--;
				if(zucc.meals>= host.meals)		// set levelComplete to true when zucc eats enough apples
				{	host.levelComplete = true;
					host.level++; }
			}
			else{	zucc.coords.shift();		// remove zucc tail and age apple if an apple was NOT eaten
					apple.age(); }
			
			zucc.paint();						// draw zucc and dump game stats
			lair.timer++;
			getMe("name").innerHTML 	= zucc.name;
			getMe("speed").innerHTML	= zucc.topspeed - zucc.speed;
			getMe("points").innerHTML 	= host.points;
			getMe("apples").innerHTML 	= zucc.meals;
			getMe("clock").innerHTML	= lair.timer;

			if(!host.levelComplete)				// call this function recursively until level is complete
			{	go(); }
			else								// restore game defaults for next level before calling this function recursively 
			{	if(confirm("You did it! Continue?"))
				{	if(host.level < levels.length)
					{	level();
						go();	
					}
					else { alert("thx for playing homie"); }
				}
			}
		}
		else	{ alert("you dead homie"); }	// alert player when zucc dies
	},	zucc.speed );
}

function direct(direction)
{	if ((zucc.direction == "l" && direction != "r") || (zucc.direction == "r" && direction != "l") ||
		(zucc.direction == "u" && direction != "d") || (zucc.direction == "d" && direction != "u") )
			{ 	if(lair.timer != lair.turntime)
				{	zucc.direction = direction; 
					lair.turntime  = lair.timer;	}
				else
				{	}
			}
}

function collision(destination)
{	
	let ok= false;
	for (let i=1; i <= zucc.coords.length; i ++)		// do not consider hitting tail at zucc.coords[0]
	{	if (destination == zucc.coords[i])				// since tail will be gone next move
		{	ok = true;
			break;
		} 
	}
	for (let i of walls.coords)							// loop through walls coords array for collision
	{	if (destination == i)
		{	ok = true;
			break;
		}
	}	
	return ok;
}

window.addEventListener( "keydown", function(event)
{
	if(event.defaultPrevented)	{ return; }

	switch(event.key)
	{
		case "ArrowRight":		direct('r');
								break;
		
		case "ArrowLeft":		direct('l');
								break;
		
		case "ArrowUp":			direct('u');
								break;
		
		case "ArrowDown":		direct('d');
								break;
	
		default:				return;
	}	event.preventDefault();
	
}, true);

// 		BUG >>  change direction more than once per clock tick
//				limit one direction per clock tick and BEEP rejected keystrokes
//		
//		if levelComplete && host.level < levels.length
//		gameComplete added
