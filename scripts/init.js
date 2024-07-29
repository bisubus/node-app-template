import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const params = new Map(
  args
    .filter((arg) => arg.startsWith('--'))
    .map((arg) => {
      arg = arg.replace(/^--/, '');
      const [paramName, ...paramValue] = arg.split('=');
      return [paramName, paramValue.join('=')];
    }),
);

const authorName = params.get('author');
const packageName = params.get('package');

assert.ok(packageName, 'package');
assert.ok(authorName, 'author');

// Update package.json similarly to `npm pkg set`
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJsonData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJsonData.name = packageName;
packageJsonData.author = authorName;
delete packageJsonData.scripts.init;

fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(packageJsonData, null, 2),
  'utf8',
);

// Update license
const licensePath = path.join(__dirname, '..', 'LICENSE');
let licenseData = fs.readFileSync(licensePath, 'utf8');
const year = new Date().getFullYear();

licenseData = licenseData
  .replace('{{year}}', year)
  .replace('{{author}}', authorName);

fs.writeFileSync(licensePath, licenseData, 'utf8');

// Clean up
fs.rmSync(__filename);

if (!fs.readdirSync(__dirname).length) {
  fs.rmdirSync(__dirname);
}
