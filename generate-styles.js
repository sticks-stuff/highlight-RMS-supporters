const fs = require('fs');
const url = require('url');

let rawdata = fs.readFileSync('names.json');
let names = JSON.parse(rawdata);
let output = "";

function absolute(parts) {
	const stack = [];

	for (const part of parts) {
		if (part === "" || part === ".") {
			continue;
		}
		
		if (part === "..") {
			stack.pop();
		} else {
			stack.push(part);
		}
	}

	return stack;
}

function linkToGithubUsername(rawLink) {
	// if the link is a link to a GitHub user, return the username in
	// URI-escaped form. otherwise, return `null`.

	if (!(typeof rawLink === 'string' || rawLink instanceof String)) {
		// the link is not a string
		return null;
	}

	let link = url.parse(rawLink);

	if (!(link.protocol == 'http:' || link.protocol == 'https:')) {
		// link is not HTTP(S)
		return null;
	}
	if (!(link.host == 'github.com' || link.host == 'www.github.com')) {
		// link is not github.com
		return null;
	}

	// we `.slice(1)` to remove the leading backslash.
	let pathParts = absolute(link.pathname.split('/'));

	if (pathParts.length == 0) {
		// link has the wrong number of path parts
		return null;
	}

	// url.parse automatically performs URI escaping
	if (pathParts[0] === "orgs" && pathParts.length >= 2) { // orgs check
		return pathParts[1];
	} else {
		return pathParts[0];
	}
}

function isGithubUsernameReasonable(username) {
	// collection of sanity checks on github usernames.
	// returns `true` if passes all sanity checks.

	if (username.length <= 2) {
		// username is too short
		return false;
	}

	return true;
}

names.forEach(function (item) {
	let ghUsername = linkToGithubUsername(item.link);
	if (ghUsername !== null && isGithubUsernameReasonable(ghUsername)) {
		output += `a[href$="${ghUsername}"], `;
	}
});

console.log(output.slice(0, -2));
console.log("\{ content-before: '\a0'; content-after: '\a0'; background-color: crimson; color: black !important; \}");
