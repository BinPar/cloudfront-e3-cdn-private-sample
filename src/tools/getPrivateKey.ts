import * as fs from 'fs';
import {promisify} from 'util';

const readFileAsync = promisify(fs.readFile);

const getPrivateKey = async (): Promise<string> => {
  const fileName = `${__dirname}/../../keys/pk-APKAJ6LPF43JSDM6FYNQ.pem`;
  const result = await readFileAsync(fileName, {encoding: 'utf8'});
  return result;
}

export default getPrivateKey;