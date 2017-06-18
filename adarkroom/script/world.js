var World = {

	RADIUS: 30,
	VILLAGE_POS: [30, 30],
	TILE: {
		VILLAGE: 'A',
		IRON_MINE: 'I',
		COAL_MINE: 'C',
		SULPHUR_MINE: 'S',
		FOREST: ';',
		FIELD: ',',
		BARRENS: '.',
		ROAD: '#',
		HOUSE: 'H',
		CAVE: 'V',
		TOWN: 'O',
		CITY: 'Y',
		OUTPOST: 'P',
		SHIP: 'W',
		BOREHOLE: 'B',
		BATTLEFIELD: 'F',
		SWAMP: 'M',
		CACHE: 'U'
	},
	TILE_PROBS: {},
	LANDMARKS: {},
	STICKINESS: 0.5, // 0 <= 1="" 2="" x="" <="1" light_radius:="" 2,="" base_water:="" 10,="" moves_per_food:="" moves_per_water:="" 1,="" death_cooldown:="" 120,="" fight_chance:="" 0.20,="" base_health:="" base_hit_chance:="" 0.8,="" meat_heal:="" 8,="" meds_heal:="" 20,="" fight_delay:="" 3,="" at="" least="" three="" moves="" between="" fights="" north:="" [="" 0,="" -1],="" south:="" 1],="" west:="" [-1,="" 0],="" east:="" weapons:="" {="" 'fists':="" verb:="" _('punch'),="" type:="" 'unarmed',="" damage:="" cooldown:="" },="" 'bone="" spear':="" _('stab'),="" 'melee',="" 'iron="" sword':="" _('swing'),="" 4,="" 'steel="" _('slash'),="" 6,="" 'bayonet':="" _('thrust'),="" 'rifle':="" _('shoot'),="" 'ranged',="" 5,="" cost:="" 'bullets':="" }="" 'laser="" rifle':="" _('blast'),="" 'energy="" cell':="" 'grenade':="" _('lob'),="" 15,="" 'bolas':="" _('tangle'),="" 'stun',="" name:="" 'world',="" options:="" {},="" nothing="" for="" now="" init:="" function(options)="" this.options="$.extend(" this.options,="" options="" );="" setup="" probabilities.="" sum="" must="" equal="" 1.="" world.tile_probs[world.tile.forest]="0.15;" world.tile_probs[world.tile.field]="0.35;" world.tile_probs[world.tile.barrens]="0.5;" setpiece="" definitions="" world.landmarks[world.tile.outpost]="{" num:="" minradius:="" maxradius:="" scene:="" 'outpost',="" label:="" _('an&nbsp;outpost')="" };="" world.landmarks[world.tile.iron_mine]="{" 'ironmine',="" _('iron&nbsp;mine')="" world.landmarks[world.tile.coal_mine]="{" 'coalmine',="" _('coal&nbsp;mine')="" world.landmarks[world.tile.sulphur_mine]="{" 'sulphurmine',="" _('sulphur&nbsp;mine')="" world.landmarks[world.tile.house]="{" world.radius="" *="" 1.5,="" 'house',="" _('an&nbsp;old&nbsp;house')="" world.landmarks[world.tile.cave]="{" 'cave',="" _('a&nbsp;damp&nbsp;cave')="" world.landmarks[world.tile.town]="{" 'town',="" _('an&nbsp;abandoned&nbsp;town')="" world.landmarks[world.tile.city]="{" 'city',="" _('a&nbsp;ruined&nbsp;city')="" world.landmarks[world.tile.ship]="{" 28,="" 'ship',="" _('a&nbsp;crashed&nbsp;starship')};="" world.landmarks[world.tile.borehole]="{" 'borehole',="" _('a&nbsp;borehole')};="" world.landmarks[world.tile.battlefield]="{" 18,="" 'battlefield',="" _('a&nbsp;battlefield')};="" world.landmarks[world.tile.swamp]="{" 'swamp',="" _('a&nbsp;murky&nbsp;swamp')};="" only="" add="" the="" cache="" if="" there="" is="" prestige="" data="" if($sm.get('previous.stores'))="" world.landmarks[world.tile.cache]="{" 'cache',="" _('a&nbsp;destroyed&nbsp;village')};="" if(typeof="" $sm.get('features.location.world')="=" 'undefined')="" $sm.set('features.location.world',="" true);="" $sm.setm('game.world',="" map:="" world.generatemap(),="" mask:="" world.newmask()="" });="" create="" world="" panel="" this.panel="$('<div">').attr('id', "worldPanel").addClass('location').appendTo('#outerSlider');

		// Create the shrink wrapper
		var outer = $('<div>').attr('id', 'worldOuter').appendTo(this.panel);

		// Create the bag panel
		$('<div>').attr('id', 'bagspace-world').append($('<div>')).appendTo(outer);
		$('<div>').attr('id', 'backpackTitle').appendTo(outer);
		$('<div>').attr('id', 'backpackSpace').appendTo(outer);
		$('<div>').attr('id', 'healthCounter').appendTo(outer);

		Engine.updateOuterSlider();

		// Map the ship and show compass tooltip
		World.ship = World.mapSearch(World.TILE.SHIP,$SM.get('game.world.map'),1);
		World.dir = World.compassDir(World.ship[0]);
		// compass tooltip text
		Room.compassTooltip(World.dir);

		// Check if everything has been seen
		World.testMap();

		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(World.handleStateUpdates);
	},

	clearDungeon: function() {
		Engine.event('progress', 'dungeon cleared');
		World.state.map[World.curPos[0]][World.curPos[1]] = World.TILE.OUTPOST;
		World.drawRoad();
	},

	drawRoad: function() {
		var findClosestRoad = function(startPos) {
			// We'll search in a spiral to find the closest road tile
			// We spiral out along manhattan distance contour
			// lines to ensure we draw the shortest road possible.
			// No attempt is made to reduce the search space for
			// tiles outside the map.
			var searchX, searchY, dtmp,
				x = 0,
				y = 0,
				dx = 1,
				dy = -1;
			for (var i = 0; i < Math.pow(World.getDistance(startPos, World.VILLAGE_POS) + 2, 2); i++) {
				searchX = startPos[0] + x;
				searchY = startPos[1] + y;
				if (0 < searchX && searchX < World.RADIUS * 2 && 0 < searchY && searchY < World.RADIUS * 2) {
					// check for road
					var tile = World.state.map[searchX][searchY];
					if (
					 	tile === World.TILE.ROAD ||
						(tile === World.TILE.OUTPOST && !(x === 0 && y === 0))  || // outposts are connected to roads
						tile === World.TILE.VILLAGE // all roads lead home
					 ) {
						return [searchX, searchY];
					}
				}
				if (x === 0 || y === 0) {
					// Turn the corner
					dtmp = dx;
					dx = -dy;
					dy =  dtmp;
				}
				if (x === 0 && y <= 0)="" {="" x++;="" }="" else="" x="" +="dx;" y="" return="" world.village_pos;="" };="" var="" closestroad="findClosestRoad(World.curPos);" xdist="World.curPos[0]" -="" closestroad[0];="" ydist="World.curPos[1]" closestroad[1];="" xdir="Math.abs(xDist)/xDist;" ydir="Math.abs(yDist)/yDist;" xintersect,="" yintersect;="" if(math.abs(xdist)=""> Math.abs(yDist)) {
			xIntersect = closestRoad[0];
			yIntersect = closestRoad[1] + yDist;
		} else {
			xIntersect = closestRoad[0] + xDist;
			yIntersect = closestRoad[1];
		}

		for(var x = 0; x < Math.abs(xDist); x++) {
			if(World.isTerrain(World.state.map[closestRoad[0] + (xDir*x)][yIntersect])) {
				World.state.map[closestRoad[0] + (xDir*x)][yIntersect] = World.TILE.ROAD;
			}
		}
		for(var y = 0; y < Math.abs(yDist); y++) {
			if(World.isTerrain(World.state.map[xIntersect][closestRoad[1] + (yDir*y)])) {
				World.state.map[xIntersect][closestRoad[1] + (yDir*y)] = World.TILE.ROAD;
			}
		}
		World.drawMap();
	},

	updateSupplies: function() {
		var supplies = $('div#bagspace-world > div');

		if(!Path.outfit) {
			Path.outfit = {};
		}

		// Add water
		var water = $('div#supply_water');
		if(World.water > 0 && water.length === 0) {
			water = World.createItemDiv('water', World.water);
			water.prependTo(supplies);
		} else if(World.water > 0) {
			$('div#supply_water', supplies).text(_('water:{0}' , World.water));
		} else {
			water.remove();
		}

		var total = 0;
		for(var k in Path.outfit) {
			var item = $('div#supply_' + k.replace(' ', '-'), supplies);
			var num = Path.outfit[k];
			total += num * Path.getWeight(k);
			if(num > 0 && item.length === 0) {
				item = World.createItemDiv(k, num);
				if(k == 'cured meat' && World.water > 0) {
					item.insertAfter(water);
				} else if(k == 'cured meat') {
					item.prependTo(supplies);
				} else {
					item.appendTo(supplies);
				}
			} else if(num > 0) {
				$('div#' + item.attr('id'), supplies).text(_(k) + ':' + num);
			} else {
				item.remove();
			}
		}

		// Update label
		var t = _('pockets');
		if($SM.get('stores.rucksack', true) > 0) {
			t = _('rucksack');
		}
		$('#backpackTitle').text(t);

		// Update bagspace
		$('#backpackSpace').text(_('free {0}/{1}', Math.floor(Path.getCapacity() - total) , Path.getCapacity()));
	},

	setWater: function(w) {
		World.water = w;
		if(World.water > World.getMaxWater()) {
			World.water = World.getMaxWater();
		}
		World.updateSupplies();
	},

	setHp: function(hp) {
		if(typeof hp == 'number' && !isNaN(hp)) {
			World.health = hp;
			if(World.health > World.getMaxHealth()) {
				World.health = World.getMaxHealth();
			}
			$('#healthCounter').text(_('hp: {0}/{1}', World.health , World.getMaxHealth()));
		}
	},

	createItemDiv: function(name, num) {
		var div = $('<div>').attr('id', 'supply_' + name.replace(' ', '-'))
			.addClass('supplyItem')
			.text(_('{0}:{1}',_(name), num));

		return div;
	},

	moveNorth: function() {
		Engine.log('North');
		if(World.curPos[1] > 0) World.move(World.NORTH);
	},

	moveSouth: function() {
		Engine.log('South');
		if(World.curPos[1] < World.RADIUS * 2) World.move(World.SOUTH);
	},

	moveWest: function() {
		Engine.log('West');
		if(World.curPos[0] > 0) World.move(World.WEST);
	},

	moveEast: function() {
		Engine.log('East');
		if(World.curPos[0] < World.RADIUS * 2) World.move(World.EAST);
	},

	move: function(direction) {
		var oldTile = World.state.map[World.curPos[0]][World.curPos[1]];
		World.curPos[0] += direction[0];
		World.curPos[1] += direction[1];
		World.narrateMove(oldTile, World.state.map[World.curPos[0]][World.curPos[1]]);
		World.lightMap(World.curPos[0], World.curPos[1], World.state.mask);
		World.drawMap();
		World.doSpace();
		if(World.checkDanger()) {
			if(World.danger) {
				Notifications.notify(World, _('dangerous to be this far from the village without proper protection'));
			} else {
				Notifications.notify(World, _('safer here'));
			}
		}
	},

	keyDown: function(event) {
		switch(event.which) {
			case 38: // Up
			case 87:
				World.moveNorth();
				break;
			case 40: // Down
			case 83:
				World.moveSouth();
				break;
			case 37: // Left
			case 65:
				World.moveWest();
				break;
			case 39: // Right
			case 68:
				World.moveEast();
				break;
			default:
				break;
		}
	},

	swipeLeft: function(e) {
		World.moveWest();
	},

	swipeRight: function(e) {
		World.moveEast();
	},

	swipeUp: function(e) {
		World.moveNorth();
	},

	swipeDown: function(e) {
		World.moveSouth();
	},

	click: function(event) {
		var map = $('#map'),
			// measure clicks relative to the centre of the current location
			centreX = map.offset().left + map.width() * World.curPos[0] / (World.RADIUS * 2),
			centreY = map.offset().top + map.height() * World.curPos[1] / (World.RADIUS * 2),
			clickX = event.pageX - centreX,
			clickY = event.pageY - centreY;
		if (clickX > clickY && clickX < -clickY) {
			World.moveNorth();
		}
		if (clickX < clickY && clickX > -clickY) {
			World.moveSouth();
		}
		if (clickX < clickY && clickX < -clickY) {
			World.moveWest();
		}
		if (clickX > clickY && clickX > -clickY) {
			World.moveEast();
		}
	},

	checkDanger: function() {
		World.danger = typeof World.danger == 'undefined' ? false: World.danger;
		if(!World.danger) {
			if($SM.get('stores["i armour"]', true) === 0 && World.getDistance() >= 8) {
				World.danger = true;
				return true;
			}
			if($SM.get('stores["s armour"]', true) === 0 && World.getDistance() >= 18) {
				World.danger = true;
				return true;
			}
		} else {
			if(World.getDistance() < 8) {
				World.danger = false;
				return true;
			}
			if(World.getDistance < 18 && $SM.get('stores["i armour"]', true) > 0) {
				World.danger = false;
				return true;
			}
		}
		return false;
	},

	useSupplies: function() {
		World.foodMove++;
		World.waterMove++;
		// Food
		var movesPerFood = World.MOVES_PER_FOOD;
		movesPerFood *= $SM.hasPerk('slow metabolism') ? 2 : 1;
		if(World.foodMove >= movesPerFood) {
			World.foodMove = 0;
			var num = Path.outfit['cured meat'];
			num--;
			if(num === 0) {
				Notifications.notify(World, _('the meat has run out'));
			} else if(num < 0) {
				// Starvation! Hooray!
				num = 0;
				if(!World.starvation) {
					Notifications.notify(World, _('starvation sets in'));
					World.starvation = true;
				} else {
					$SM.set('character.starved', $SM.get('character.starved', true));
					$SM.add('character.starved', 1);
					if($SM.get('character.starved') >= 10 && !$SM.hasPerk('slow metabolism')) {
						$SM.addPerk('slow metabolism');
					}
					World.die();
					return false;
				}
			} else {
				World.starvation = false;
				World.setHp(World.health + World.meatHeal());
			}
			Path.outfit['cured meat'] = num;
		}
		// Water
		var movesPerWater = World.MOVES_PER_WATER;
		movesPerWater *= $SM.hasPerk('desert rat') ? 2 : 1;
		if(World.waterMove >= movesPerWater) {
			World.waterMove = 0;
			var water = World.water;
			water--;
			if(water === 0) {
				Notifications.notify(World, _('there is no more water'));
			} else if(water < 0) {
				water = 0;
				if(!World.thirst) {
					Notifications.notify(World, _('the thirst becomes unbearable'));
					World.thirst = true;
				} else {
					$SM.set('character.dehydrated', $SM.get('character.dehydrated', true));
					$SM.add('character.dehydrated', 1);
					if($SM.get('character.dehydrated') >= 10 && !$SM.hasPerk('desert rat')) {
						$SM.addPerk('desert rat');
					}
					World.die();
					return false;
				}
			} else {
				World.thirst = false;
			}
			World.setWater(water);
			World.updateSupplies();
		}
		return true;
	},

	meatHeal: function() {
		return World.MEAT_HEAL * ($SM.hasPerk('gastronome') ? 2 : 1);
	},

	medsHeal: function() {
		return World.MEDS_HEAL;
	},

	checkFight: function() {
		World.fightMove = typeof World.fightMove == 'number' ? World.fightMove : 0;
		World.fightMove++;
		if(World.fightMove > World.FIGHT_DELAY) {
			var chance = World.FIGHT_CHANCE;
			chance *= $SM.hasPerk('stealthy') ? 0.5 : 1;
			if(Math.random() < chance) {
				World.fightMove = 0;
				Events.triggerFight();
			}
		}
	},

	doSpace: function() {
		var curTile = World.state.map[World.curPos[0]][World.curPos[1]];

		if(curTile == World.TILE.VILLAGE) {
			World.goHome();
		} else if(typeof World.LANDMARKS[curTile] != 'undefined') {
			if(curTile != World.TILE.OUTPOST || !World.outpostUsed()) {
				Events.startEvent(Events.Setpieces[World.LANDMARKS[curTile].scene]);
			}
		} else {
			if(World.useSupplies()) {
				World.checkFight();
			}
		}
	},

	getDistance: function(from, to) {
		from = from || World.curPos;
		to = to || World.VILLAGE_POS;
		return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
	},

	getTerrain: function() {
		return World.state.map[World.curPos[0]][World.curPos[1]];
	},

	getDamage: function(thing) {
		return World.Weapons[thing].damage;
	},

	narrateMove: function(oldTile, newTile) {
		var msg = null;
		switch(oldTile) {
			case World.TILE.FOREST:
				switch(newTile) {
					case World.TILE.FIELD:
						msg = _("the trees yield to dry grass. the yellowed brush rustles in the wind.");
						break;
					case World.TILE.BARRENS:
						msg = _("the trees are gone. parched earth and blowing dust are poor replacements.");
						break;
				}
				break;
			case World.TILE.FIELD:
				switch(newTile) {
					case World.TILE.FOREST:
						msg = _("trees loom on the horizon. grasses gradually yield to a forest floor of dry branches and fallen leaves.");
						break;
					case World.TILE.BARRENS:
						msg = _("the grasses thin. soon, only dust remains.");
						break;
				}
				break;
			case World.TILE.BARRENS:
				switch(newTile) {
					case World.TILE.FIELD:
						msg = _("the barrens break at a sea of dying grass, swaying in the arid breeze.");
						break;
					case World.TILE.FOREST:
						msg = _("a wall of gnarled trees rises from the dust. their branches twist into a skeletal canopy overhead.");
						break;
				}
				break;
		}
		if(msg != null) {
			Notifications.notify(World, msg);
		}
	},

	newMask: function() {
		var mask = new Array(World.RADIUS * 2 + 1);
		for(var i = 0; i <= 2="" world.radius="" *="" 2;="" i++)="" {="" mask[i]="new" array(world.radius="" +="" 1);="" }="" world.lightmap(world.radius,="" world.radius,="" mask);="" return="" mask;="" },="" lightmap:="" function(x,="" y,="" mask)="" var="" r="World.LIGHT_RADIUS;" ?="" :="" 1;="" world.uncovermap(x,="" r,="" uncovermap:="" mask[x][y]="true;" for(var="" i="-r;" <="r;" j="-r" math.abs(i);="" -="" j++)="" if(y="">= 0 && y + j <= 2="" world.radius="" *="" &&="" x="" +="" i="" <="World.RADIUS">= 0) {
					mask[x+i][y+j] = true;
				}
			}
		}
	},

	testMap: function() {
		if(!World.seenAll) {
			var dark; 
			var mask = $SM.get('game.world.mask');
			loop:
			for(var i = 0; i < mask.length; i++) {
				for(var j = 0; j < mask[i].length; j++) {
					if(!mask[i][j]) {
						dark = true;
						break loop;
					}
				}
			}
			World.seenAll = !dark;
		}
	},

	applyMap: function() {
		if(!World.seenAll){
			var x,y,mask = $SM.get('game.world.mask');
			do {
				x = Math.floor(Math.random() * (World.RADIUS * 2) + 1);
				y = Math.floor(Math.random() * (World.RADIUS * 2) + 1);
			} while (mask[x][y]);
			World.uncoverMap(x, y, 5, mask);
		}
		World.testMap();
	},

	generateMap: function() {
		var map = new Array(World.RADIUS * 2 + 1);
		for(var i = 0; i <= 0="" 2="" 4="" 6="" world.radius="" *="" 2;="" i++)="" {="" map[i]="new" array(world.radius="" +="" 1);="" }="" the="" village="" is="" always="" at="" exact="" center="" spiral="" out="" from="" there="" map[world.radius][world.radius]="World.TILE.VILLAGE;" for(var="" r="1;" <="World.RADIUS;" r++)="" t="0;" 8;="" t++)="" var="" x,="" y;="" if(t="" r)="" x="World.RADIUS" -="" t;="" y="World.RADIUS" r;="" else="" (3="" (5="" (7="" map[x][y]="World.chooseTile(x," y,="" map);="" place="" landmarks="" k="" in="" world.landmarks)="" landmark="World.LANDMARKS[k];" l="0;" landmark.num;="" l++)="" pos="World.placeLandmark(landmark.minRadius," landmark.maxradius,="" k,="" return="" map;="" },="" mapsearch:="" function(target,map,required){="" max="World.LANDMARKS[target].num;" if(!max){="" this="" restrict="" research="" to="" numerable="" null;="" if="" only="" a="" fixed="" number="" (usually="" 1)="" required ?="" math.min(required,max)="" :="" max;="" index="0;" targets="[];" search:="" label="" for="" coordinate="" i="0;" i++){="" j="0;" j++){="" if(map[i][j].charat(0)="==" target){="" search="" result="" stored="" as="" an="" object;="" items="" are="" listed="" they="" appear="" map,="" tl-br="" each="" item="" has="" relative="" coordinates="" and="" compass-type="" direction="" targets[index]="{" world.radius,="" };="" index++;="" if(index="==" max){="" optimisation:="" stop="" maximum="" of="" been="" reached="" break="" search;="" targets;="" compassdir:="" function(pos){="" dir="" ;="" horz="pos.x" 'west'="" 'east';="" vert="pos.y" 'north'="" 'south';="" if(math.abs(pos.x)=""> Math.abs(pos.y)) {
			dir = horz;
		} else if(Math.abs(pos.y) / 2 > Math.abs(pos.x)){
			dir = vert;
		} else {
			dir = vert + horz;
		}
		return dir;
	},

	placeLandmark: function(minRadius, maxRadius, landmark, map) {

		var x = World.RADIUS, y = World.RADIUS;
		while(!World.isTerrain(map[x][y])) {
			var r = Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
			var xDist = Math.floor(Math.random() * r);
			var yDist = r - xDist;
			if(Math.random() < 0.5) xDist = -xDist;
			if(Math.random() < 0.5) yDist = -yDist;
			x = World.RADIUS + xDist;
			if(x < 0) x = 0;
			if(x > World.RADIUS * 2) x = World.RADIUS * 2;
			y = World.RADIUS + yDist;
			if(y < 0) y = 0;
			if(y > World.RADIUS * 2) y = World.RADIUS * 2;
		}
		map[x][y] = landmark;
		return [x, y];
	},

	isTerrain: function(tile) {
		return tile == World.TILE.FOREST || tile == World.TILE.FIELD || tile == World.TILE.BARRENS;
	},

	chooseTile: function(x, y, map) {

		var adjacent = [
			y > 0 ? map[x][y-1] : null,
			y < World.RADIUS * 2 ? map[x][y+1] : null,
			x < World.RADIUS * 2 ? map[x+1][y] : null,
			x > 0 ? map[x-1][y] : null
		];

		var chances = {};
		var nonSticky = 1;
		for(var i in adjacent) {
			if(adjacent[i] == World.TILE.VILLAGE) {
				// Village must be in a forest to maintain thematic consistency, yo.
				return World.TILE.FOREST;
			} else if(typeof adjacent[i] == 'string') {
				var cur = chances[adjacent[i]];
				cur = typeof cur == 'number' ? cur : 0;
				chances[adjacent[i]] = cur + World.STICKINESS;
				nonSticky -= World.STICKINESS;
			}
		}
		for(var t in World.TILE) {
			var tile = World.TILE[t];
			if(World.isTerrain(tile)) {
				var cur = chances[tile];
				cur = typeof cur == 'number' ? cur : 0;
				cur += World.TILE_PROBS[tile] * nonSticky;
				chances[tile] = cur;
			}
		}

		var list = [];
		for(var j in chances) {
			list.push(chances[j] + '' + j);
		}
		list.sort(function(a, b) {
			var n1 = parseFloat(a.substring(0, a.length - 1));
			var n2 = parseFloat(b.substring(0, b.length - 1));
			return n2 - n1;
		});

		var c = 0;
		var r = Math.random();
		for(var l in list) {
			var prob = list[l];
			c += parseFloat(prob.substring(0,prob.length - 1));
			if(r < c) {
				return prob.charAt(prob.length - 1);
			}
		}

		return World.TILE.BARRENS;
	},

	markVisited: function(x, y) {
		World.state.map[x][y] = World.state.map[x][y] + '!';
	},

	drawMap: function() {
		var map = $('#map');
		if(map.length === 0) {
			map = new $('<div>').attr('id', 'map').appendTo('#worldOuter');
			// register click handler
			map.click(World.click);
		}
		var mapString = "";
		for(var j = 0; j <= world.radius="" *="" 2;="" j++)="" {="" for(var="" i="0;" <="World.RADIUS" i++)="" var="" ttclass="" ;="" if(i=""> World.RADIUS) {
					ttClass += " left";
				} else {
					ttClass += " right";
				}
				if(j > World.RADIUS) {
					ttClass += " top";
				} else {
					ttClass += " bottom";
				}
				if(World.curPos[0] == i && World.curPos[1] == j) {
					mapString += '<span class="landmark">@<div class="tooltip ' + ttClass + '">'+_('Wanderer')+'</div></span>';
				} else if(World.state.mask[i][j]) {
					var c = World.state.map[i][j];
					switch(c) {
						case World.TILE.VILLAGE:
							mapString += '<span class="landmark">' + c + '<div class="tooltip' + ttClass + '">'+_('The&nbsp;Village')+'</div></span>';
							break;
						default:
							if(typeof World.LANDMARKS[c] != 'undefined' && (c != World.TILE.OUTPOST || !World.outpostUsed(i, j))) {
								mapString += '<span class="landmark">' + c + '<div class="tooltip' + ttClass + '">' + World.LANDMARKS[c].label + '</div></span>';
							} else {
								if(c.length > 1) {
									c = c[0];
								}
								mapString += c;
							}
							break;
					}
				} else {
					mapString += '&nbsp;';
				}
			}
			mapString += '<br>';
		}
		map.html(mapString);
	},

	die: function() {
		if(!World.dead) {
			World.dead = true;
			Engine.log('player death');
			Engine.event('game event', 'death');
			Engine.keyLock = true;
			// Dead! Discard any world changes and go home
			Notifications.notify(World, _('the world fades'));
			World.state = null;
			Path.outfit = {};
			$SM.remove('outfit');
			$('#outerSlider').animate({opacity: '0'}, 600, 'linear', function() {
				$('#outerSlider').css('left', '0px');
				$('#locationSlider').css('left', '0px');
				$('#storesContainer').css({'top': '0px', 'right': '0px'});
				Engine.activeModule = Room;
				$('div.headerButton').removeClass('selected');
				Room.tab.addClass('selected');
				Engine.setTimeout(function(){
					Room.onArrival();
					$('#outerSlider').animate({opacity:'1'}, 600, 'linear');
					Button.cooldown($('#embarkButton'));
					Engine.keyLock = false;
					Engine.tabNavigation = true;
				}, 2000, true);
			});
		}
	},

	goHome: function() {
		// Home safe! Commit the changes.
		$SM.setM('game.world', World.state);
		World.testMap();

		if(World.state.sulphurmine && $SM.get('game.buildings["sulphur mine"]', true) === 0) {
			$SM.add('game.buildings["sulphur mine"]', 1);
			Engine.event('progress', 'sulphur mine');
		}
		if(World.state.ironmine && $SM.get('game.buildings["iron mine"]', true) === 0) {
			$SM.add('game.buildings["iron mine"]', 1);
			Engine.event('progress', 'iron mine');
		}
		if(World.state.coalmine && $SM.get('game.buildings["coal mine"]', true) === 0) {
			$SM.add('game.buildings["coal mine"]', 1);
			Engine.event('progress', 'coal mine');
		}
		if(World.state.ship && !$SM.get('features.location.spaceShip')) {
			Ship.init();
			Engine.event('progress', 'ship');
		}
		World.state = null;

		if(Path.outfit['cured meat'] > 0) {
			Button.setDisabled($('#embarkButton'), false);
		}

		for(var k in Path.outfit) {
			$SM.add('stores["'+k+'"]', Path.outfit[k]);
			if(World.leaveItAtHome(k)) {
				Path.outfit[k] = 0;
			}
		}

		$('#outerSlider').animate({left: '0px'}, 300);
		Engine.activeModule = Path;
		Path.onArrival();
		Engine.restoreNavigation = true;
	},

	leaveItAtHome: function(thing) {
		 return thing != 'cured meat' && thing != 'bullets' && thing != 'energy cell'  && thing != 'charm' && thing != 'medicine' &&
		 typeof World.Weapons[thing] == 'undefined' && typeof Room.Craftables[thing] == 'undefined';
	},

	getMaxHealth: function() {
		if($SM.get('stores["s armour"]', true) > 0) {
			return World.BASE_HEALTH + 35;
		} else if($SM.get('stores["i armour"]', true) > 0) {
			return World.BASE_HEALTH + 15;
		} else if($SM.get('stores["l armour"]', true) > 0) {
			return World.BASE_HEALTH + 5;
		}
		return World.BASE_HEALTH;
	},

	getHitChance: function() {
		if($SM.hasPerk('precise')) {
			return World.BASE_HIT_CHANCE + 0.1;
		}
		return World.BASE_HIT_CHANCE;
	},

	getMaxWater: function() {
		if($SM.get('stores["water tank"]', true) > 0) {
			return World.BASE_WATER + 50;
		} else if($SM.get('stores.cask', true) > 0) {
			return World.BASE_WATER + 20;
		} else if($SM.get('stores.waterskin', true) > 0) {
			return World.BASE_WATER + 10;
		}
		return World.BASE_WATER;
	},

	outpostUsed: function(x, y) {
		x = typeof x == 'number' ? x : World.curPos[0];
		y = typeof y == 'number' ? y : World.curPos[1];
		var used = World.usedOutposts[x + ',' + y];
		return typeof used != 'undefined' && used === true;
	},

	useOutpost: function() {
		Notifications.notify(null, _('water replenished'));
		World.setWater(World.getMaxWater());
		// Mark this outpost as used
		World.usedOutposts[World.curPos[0] + ',' + World.curPos[1]] = true;
	},

	onArrival: function() {
		Engine.tabNavigation = false;
		// Clear the embark cooldown
		Button.clearCooldown($('#embarkButton'));
		Engine.keyLock = false;
		// Explore in a temporary world-state. We'll commit the changes if you return home safe.
		World.state = $.extend(true, {}, $SM.get('game.world'));
		World.setWater(World.getMaxWater());
		World.setHp(World.getMaxHealth());
		World.foodMove = 0;
		World.waterMove = 0;
		World.starvation = false;
		World.thirst = false;
		World.usedOutposts = {};
		World.curPos = World.copyPos(World.VILLAGE_POS);
		World.drawMap();
		World.setTitle();
		World.dead = false;
		$('div#bagspace-world > div').empty();
		World.updateSupplies();
		$('#bagspace-world').width($('#map').width());
	},

	setTitle: function() {
		document.title = _('A Barren World');
	},

	copyPos: function(pos) {
		return [pos[0], pos[1]];
	},

	handleStateUpdates: function(e){

	}
};
</=></div></=></=></=></div></=></div></div></div></div></div></div></=>