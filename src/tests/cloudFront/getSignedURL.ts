import * as AWS from 'aws-sdk';
import getPrivateKey from '../../tools/getPrivateKey';

test('Get SignedURL for accessing a S3 MP3 using CloudFront', async (): Promise<
  void
> => {
  const cloudfrontAccessKeyId = 'APKAJ6LPF43JSDM6FYNQ';
  const cloudFrontPrivateKey = await getPrivateKey();
  const signer = new AWS.CloudFront.Signer(
    cloudfrontAccessKeyId,
    cloudFrontPrivateKey,
  );
  const twoDays = 2 * 24 * 60 * 60 * 1000;

  const signedUrl = signer.getSignedUrl({
    url: 'https://d3tuovxue5pcj7.cloudfront.net/test/cedric_about_tq_brief.mp3',
    expires: Math.floor((Date.now() + twoDays) / 1000),
  });

  expect(signedUrl.split(':')[0]).toBe('https');

  // eslint-disable-next-line no-console
  console.log(`The URL IS:\r\n${signedUrl}`);

});
