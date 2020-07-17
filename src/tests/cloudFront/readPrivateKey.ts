import getPrivateKey from '../../tools/getPrivateKey';

test('Verify Public Key File Length', async (): Promise<void> => {
  const key = await getPrivateKey();
  expect(key).toHaveLength(1706);
});
