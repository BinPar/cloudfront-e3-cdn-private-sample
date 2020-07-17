import getPublicKey from '../../tools/getPublicKey';

test('Verify Public Key File Length', async (): Promise<void> => {
  const key = await getPublicKey();
  expect(key).toHaveLength(458);
});
