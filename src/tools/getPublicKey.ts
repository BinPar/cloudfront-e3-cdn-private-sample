import * as fs from 'fs';
import {promisify} from 'util';

const readFileAsync = promisify(fs.readFile);

const getPublicKey = async (): Promise<string> => {
  const fileName = `${__dirname}/../../keys/rsa-APKAIKWN4SW4UZ4YBY5Q.pem`;
  const result = await readFileAsync(fileName, {encoding: 'utf8'});
  return result;
}

export default getPublicKey;