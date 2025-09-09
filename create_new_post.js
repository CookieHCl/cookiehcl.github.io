const { execSync } = require('child_process');

function toSnakeCase(str) {
	return str.toLowerCase().replace(/\s+/g, '_');
}

function getDateStr() {
	const today = new Date();
	const year = String(today.getFullYear()).slice(-2);
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}${month}${day}`;
}

if (process.argv.length != 4) {
	console.error("Usage: node script.js <dir> <title>");
	process.exit(1);
}

const dir = process.argv[2];
const title = process.argv[3];

const filename = `${getDateStr()}-${toSnakeCase(title)}`;
const filePath = `${dir}/${filename}`;

const command = `npx hexo new --path "${filePath}" "${title}" && code "source/_posts/${filePath}.md" && rmdir "source/_posts/${filePath}"`;
const output = execSync(command, { encoding: 'utf-8' });
console.log(output);
