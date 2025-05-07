import fs from 'node:fs';

export const getHttpsConfig = () => ({
  key: fs.readFileSync('ssl/server.key'),
  cert: fs.readFileSync('ssl/server.crt')
})
