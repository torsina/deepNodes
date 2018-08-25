const _array = [];
const _mapArray = [];
const arrayIndexOfResult = [];
const arrayMapResult = [];
const map = new Map();
const iteration = 25000;

function makeid(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function shuffle(array) {
	var result = [], source = array.concat([]);

	while (source.length) {
		let index = Math.floor(Math.random() * source.length);
		result.push(source.splice(index, 1)[0]);
	}

	return result;
}
console.time("array with map generation");
for (let i = 0; i < iteration; i++) {
	const string = makeid(10);
	_mapArray.push(string);
	map.set(string, i);
}
console.timeEnd("array with map generation");

console.time("array w/e generation");
for (let i = 0; i < iteration; i++) {
	const string = makeid(10);
	_array.push(string);
}
console.timeEnd("array w/e generation");

const arrayCopy = shuffle(_array);

console.time("indexOf");
for (let i = 0, n = arrayCopy.length; i < n; i++) {
	const element = arrayCopy[i];
	arrayIndexOfResult.push(_array.indexOf(element));
}
console.timeEnd("indexOf");

console.time("map");
for (let i = 0, n = arrayCopy.length; i < n; i++) {
	const element = arrayCopy[i];
	arrayMapResult.push(map.get(element));
}
console.timeEnd("map");
