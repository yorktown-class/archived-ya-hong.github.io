/**
 * Events that can occur when wandering around the world
 **/
Events.Encounters = [
	/* Tier 1 */
	{ /* Snarling Beast */
		title: _('A Snarling Beast'),
		isAvailable: function() {
			return World.getDistance() <= 1="" 10="" &&="" world.getterrain()="=" world.tile.forest;="" },="" scenes:="" {="" 'start':="" combat:="" true,="" enemy:="" 'snarling="" beast',="" enemyname:="" _('snarling="" beast'),="" deathmessage:="" _('the="" snarling="" beast="" is="" dead'),="" chara:="" 'r',="" damage:="" 1,="" hit:="" 0.8,="" attackdelay:="" health:="" 5,="" loot:="" 'fur':="" min:="" max:="" 3,="" chance:="" 'meat':="" 'teeth':="" 0.8="" }="" notification:="" _('a="" leaps="" out="" of="" the="" underbrush')="" *="" gaunt="" man="" title:="" man'),="" isavailable:="" function()="" return="" world.getdistance()="" <="10" world.tile.barrens;="" 'gaunt="" man',="" _('gaunt="" 'e',="" 2,="" 6,="" 'cloth':="" 'leather':="" 0.5="" approaches,="" a="" crazed="" look="" in="" his="" eye')="" strange="" bird="" bird'),="" world.tile.field;="" 'strange="" bird',="" _('strange="" 4,="" 'scales':="" looking="" speeds="" across="" plains')="" tier="" 2*="" shivering=""> 10 && World.getDistance() <= 20="" &&="" world.getterrain()="=" world.tile.barrens;="" },="" scenes:="" {="" 'start':="" combat:="" true,="" enemy:="" 'shivering="" man',="" enemyname:="" _('shivering="" man'),="" deathmessage:="" _('the="" shivering="" man="" is="" dead'),="" chara:="" 'e',="" damage:="" 5,="" hit:="" 0.5,="" attackdelay:="" 1,="" health:="" 20,="" loot:="" 'cloth':="" min:="" max:="" chance:="" 0.2="" 'teeth':="" 2,="" 0.8="" 'leather':="" 'medicine':="" 3,="" 0.7="" }="" notification:="" _('a="" approaches="" and="" attacks="" with="" surprising="" strength')="" *="" man-eater="" title:="" man-eater'),="" isavailable:="" function()="" return="" world.getdistance()=""> 10 && World.getDistance() <= 1="" 20="" &&="" world.getterrain()="=" world.tile.forest;="" },="" scenes:="" {="" 'start':="" combat:="" true,="" enemy:="" 'man-eater',="" enemyname:="" _('man-eater'),="" deathmessage:="" _('the="" man-eater="" is="" dead'),="" chara:="" 't',="" damage:="" 3,="" hit:="" 0.8,="" attackdelay:="" 1,="" health:="" 25,="" loot:="" 'fur':="" min:="" 5,="" max:="" 10,="" chance:="" 'meat':="" 'teeth':="" 0.8="" }="" notification:="" _('a="" large="" creature="" attacks,="" claws="" freshly="" bloodied')="" *="" scavenger="" title:="" scavenger'),="" isavailable:="" function()="" return="" world.getdistance()=""> 10 && World.getDistance() <= 20="" &&="" world.getterrain()="=" world.tile.barrens;="" },="" scenes:="" {="" 'start':="" combat:="" true,="" enemy:="" 'scavenger',="" enemyname:="" _('scavenger'),="" deathmessage:="" _('the="" scavenger="" is="" dead'),="" chara:="" 'e',="" damage:="" 4,="" hit:="" 0.8,="" attackdelay:="" 2,="" health:="" 30,="" loot:="" 'cloth':="" min:="" 5,="" max:="" 10,="" chance:="" 0.8="" 'leather':="" 'iron':="" 1,="" 0.5="" 'medicine':="" 0.1="" }="" notification:="" _('a="" draws="" close,="" hoping="" for="" an="" easy="" score')="" *="" huge="" lizard="" title:="" lizard'),="" isavailable:="" function()="" return="" world.getdistance()=""> 10 && World.getDistance() <= 20="" &&="" world.getterrain()="=" world.tile.field;="" },="" scenes:="" {="" 'start':="" combat:="" true,="" enemy:="" 'lizard',="" enemyname:="" _('lizard'),="" deathmessage:="" _('the="" lizard="" is="" dead'),="" chara:="" 't',="" damage:="" 5,="" hit:="" 0.8,="" attackdelay:="" 2,="" health:="" 20,="" loot:="" 'scales':="" min:="" max:="" 10,="" chance:="" 0.8="" 'teeth':="" 0.5="" 'meat':="" }="" notification:="" grass="" thrashes="" wildly="" as="" a="" huge="" pushes="" through')="" *="" tier="" 3*="" feral="" terror="" title:="" _('a="" terror'),="" isavailable:="" function()="" return="" world.getdistance()=""> 20 && World.getTerrain() == World.TILE.FOREST;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'feral terror',
				enemyName: _('feral terror'),
				deathMessage: _('the feral terror is dead'),
				chara: 'T',
				damage: 6,
				hit: 0.8,
				attackDelay: 1,
				health: 45,
				loot: {
					'fur': {
						min: 5,
						max: 10,
						chance: 1
					},
					'meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'teeth': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				notification: _('a beast, wilder than imagining, erupts out of the foliage')
			}
		}
	},
	{ /* Soldier */
	title: _('A Soldier'),
		isAvailable: function() {
			return World.getDistance() > 20 && World.getTerrain() == World.TILE.BARRENS;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'soldier',
				enemyName: _('soldier'),
				deathMessage: _('the soldier is dead'),
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.1
					}
				},
				notification: _('a soldier opens fire from across the desert')
			}
		}
	},
	{ /* Sniper */
	title: _('A Sniper'),
		isAvailable: function() {
			return World.getDistance() > 20 && World.getTerrain() == World.TILE.FIELD;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'sniper',
				enemyName: _('sniper'),
				deathMessage: _('the sniper is dead'),
				chara: 'D',
				damage: 15,
				hit: 0.8,
				attackDelay: 4,
				health: 30,
				ranged: true,
				loot: {
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.1
					}
				},
				notification: _('a shot rings out, from somewhere in the long grass')
			}
		}
	}
];
</=></=></=></=></=>