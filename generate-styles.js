const fs = require('fs');

let rawdata = fs.readFileSync('names.json');
let names = JSON.parse(rawdata);
let output = "";

names.forEach(function (item) {
	var link = item.link.replace(/(^\w+:|^)\/\//, '');
	ghUsername = item.link.split("github.com/")[1];
	if(ghUsername != undefined) {
		output += `a[href*="${ghUsername.replace(/\/+$/, '')}"], `; //remove the trailing backslash
	}
	else {
		output += `a[href*="${link}"], `;
	}
});

output = output.slice(0, -2)
console.log(output);
console.log("\{background-color: Crimson;\}");