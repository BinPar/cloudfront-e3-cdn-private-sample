import * as AWS from 'aws-sdk';
import getPrivateKey from '../../tools/getPrivateKey';

test('Get SignedURL for accessing a S3 MP3 using CloudFront', async (): Promise<
  void
> => {
  const cloudfrontAccessKeyId = '';
  const cloudFrontPrivateKey = await getPrivateKey();
  const signer = new AWS.CloudFront.Signer(
    cloudfrontAccessKeyId,
    cloudFrontPrivateKey,
  );
  const twoDays = 2 * 24 * 60 * 60 * 1000;

  const signedUrl = signer.getSignedUrl({
    url: 'https://d30rfargyoy48c.cloudfront.net/test/cedric_about_tq_brief.mp3',
    expires: Math.floor((Date.now() + twoDays) / 1000),
  });

  expect(signedUrl).toBe(3);
});
