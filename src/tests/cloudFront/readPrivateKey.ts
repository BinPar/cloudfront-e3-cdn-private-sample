import getPublicKey from '../../tools/getPrivateKey';

test('Verify Public Key File Length', async (): Promise<void> => {
  const key = await getPublicKey();
  expect(key).toHaveLength(458);
});
