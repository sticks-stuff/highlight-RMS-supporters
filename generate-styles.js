const fs = require('fs');
const url = require('url');

let rawdata = fs.readFileSync('names.json');
let names = JSON.parse(rawdata);
let output = "";

names.forEach(function (item) {
	if(item.link.includes("github.com")) {
	   	ghUsername = url.parse(item.link).pathname.slice(1);
		if(ghUsername != undefined) {
			if(ghUsername.length > 4) { //basic sanity check
				output += `a[href$="${encodeURI(ghUsername)}"], `; //remove the trailing backslash
			} else {
				return;
			}
		}
	}
});

console.log(output.slice(0, -2));
console.log("\{ content-before: '\a0'; content-after: '\a0'; background-color: crimson; color: black !important; \}");
