import * as AWS from 'aws-sdk';
import getPublicKey from '../../tools/getPublicKey';

test('Get SignedURL for accessing a S3 MP3 using CloudFront', async (): Promise<void> => {
  const publicKey = await getPublicKey();
  const cloudFront = new AWS.CloudFront.Signer('PUBLIC_ACCESS_KEY', publicKey);
  
  var signingParams = {
    keypairId: process.env.PUBLIC_KEY,
    privateKeyString: process.env.PRIVATE_KEY,
    privateKeyPath: '/path/to/private/key',
    expireTime: 1426625464599
  }

  const policy:  AWS.CloudFront.Signer.SignerOptionsWithoutPolicy = {
    url: 'https://d30rfargyoy48c.cloudfront.net/test/cedric_about_tq_brief.mp3',
    expires: Math.floor((new Date()).getTime() / 1000) + (60 * 60 * 1) // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
  }
  const url = await cloudFront.getSignedUrl('https://d30rfargyoy48c.cloudfront.net/test/cedric_about_tq_brief.mp3',
  , signingParams);  
  expect(url).toBe(3);
});
