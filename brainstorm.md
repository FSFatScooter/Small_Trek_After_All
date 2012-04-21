#"Tiny World" Game#
#It's a Small Trek After All (pending title)#

##Space Game (Similar to Galactic Vector concept from last year)##

 - Randomly generated galaxy
 - explorable map with fog-of-war-like feature
 - ability to "warp" anywhere on the map
 - combat system - proton torpedoes and phazers

###Galaxy/Map###

 - Procedurally generated using a grid -> one grid for each solar-system/large area
 - Grid Caching to keep memory footpront down
 - Planets, moons, suns/stars, black holes, asteroids, comets, worm holes
 - background stars for ambience

###Warp Travel###

 - Will require a cool down cycle after too much use
 - Dangerous; could fly directly into a black hole/sun/other object
 - Plotting warp coordination using the map

###Combat System###

 - Proton torpedoes for long ranged, pot-shots
 - Phazers for close range, prolonged combat
 - Targeting system uses left and right arrow keys for angle of attack
 - Up arrow for proton torpedoes
 - Down arrow for phazers
 - Both can be used in conjunction


###Grid Caching###

 - Employs an array in which all of the active map grid objects will reside
 - Only the immediately adjacent and diagonal grids will be kept in memory; Others will be stored using HTML Local Storage
 - Once the player moves from one grid to another, the previously adjacent/diagonal grids that are no longer in use will have their HTML local storage object updated, then filtered from the map grid array
 - List item