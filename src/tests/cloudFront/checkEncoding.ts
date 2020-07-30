import axios from 'axios';
import * as util from 'util';

test('Get Encoded Text Files', async (): Promise<
  void
> => {
  const url = 'https://www.medicapanamericana.com/materialesComplementarios/Seco-Respiratorio/cap/1/4/piesImagenes.txt';
  const notificationBuffer = await axios.get(url, { responseType: 'arraybuffer' });
  const decoder = new util.TextDecoder('utf-16');
  const buffer = notificationBuffer.data as ArrayBuffer;
  const result = decoder.decode(buffer);
  expect(result.indexOf('ó')).toBeGreaterThan(0);
});
