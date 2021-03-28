const fs = require('fs');

let rawdata = fs.readFileSync('names.json');
let names = JSON.parse(rawdata);
let output = "";

names.forEach(function (item) {
	var link = item.link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
	link = link.split("?")[0];
	ghUsername = link.split("github.com/")[1];
	if(ghUsername != undefined) {
		if(ghUsername.length > 4 && ghUsername != "event") { //basic sanity check
			output += `a[href*="${ghUsername.replace(/\/+$/, '')}"]:after, `; //remove the trailing backslash
		} else {
			return;
		}
	}
	else {
		if(link.length > 4) { //basic sanity check
			output += `a[href*="${link}"]:after, `;
		} else {
			return;
		}
	}
});

console.log(output.slice(0, -2));
console.log("\{ content: 'Based!'; display: inline-block; margin-left: 1em; padding: 0 7px; font-size: 12px; font-weight: 500; line-height: 18px; border-radius: 2em; border: 1px solid transparent; color: var(--color-pr-state-open-text); background-color: var(--color-pr-state-open-bg);    border-color: var(--color-pr-state-open-border);} \}");
