const fs = require('fs');
const url = require('url');

let rawdata = fs.readFileSync('names.json');
let names = JSON.parse(rawdata);
let output = "";

names.forEach(function (item) {
	const link = item.link.trim()
	const without_protocol = link.replace(/^https?:\/\//,'')

	if(without_protocol.startsWith("github.com")) {
	   	const sliced = url.parse(`https://${without_protocol}`).pathname.slice(1);
		if(sliced != undefined) {
			const stripped = sliced.replace(/\/$/, "")
			const matched = stripped.match(/^[a-z\d](?:[a-z\d]|-){0,38}$/i)
			
			if (matched) {
				const ghUsername = matched[0];
	
				if(ghUsername.length > 4) { //basic sanity
						output += `a[href$="${ghUsername}"], `; //remove the trailing backslash
				} else {
					return;
				}
			}
		}
	}
});

console.log(output.slice(0, -2));
console.log("\{ content-before: '\a0'; content-after: '\a0'; background-color: crimson; color: black !important; \}");
