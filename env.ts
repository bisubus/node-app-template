import * as url from 'node:url';
import * as path from 'node:path';
import dotenvx from '@dotenvx/dotenvx';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const allowedEnvs = ['development', 'production', 'test'];
const nodeEnv = allowedEnvs.includes(process.env.NODE_ENV!)
  ? process.env.NODE_ENV
  : 'development';

process.env.NODE_ENV = nodeEnv;

dotenvx.config({
  quiet: nodeEnv === 'production',
  // suppress errors
  convention: 'nextjs',
  // dotenv-flow behavior
  path: [
    path.join(__dirname, '.', `.env.${nodeEnv}.local`),
    path.join(__dirname, '.', `.env.local`),
    path.join(__dirname, '.', `.env.${nodeEnv}`),
    path.join(__dirname, '.', '.env'),
  ],
});
