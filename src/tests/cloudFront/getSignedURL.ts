import * as AWS from 'aws-sdk';
import getPublicKey from '../../tools/getPublicKey';

test('Get SignedURL for accessing a S3 MP3 using CloudFront', async (): Promise<void> => {
  const publicKey = await getPublicKey();
  const cloudFront = new AWS.CloudFront.Signer('PUBLIC_ACCESS_KEY', publicKey);
  const policy = JSON.stringify({
    "Statement": [
      {
        "Resource": "https://d30rfargyoy48c.cloudfront.net/test/cedric_about_tq_brief.mp3",
        "Condition": {
          "DateLessThan": {
            "AWS:EpochTime": Math.floor((new Date()).getTime() / 1000) + (60 * 60 * 1) // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
          }
        }
      }
    ]
  });
  const url = await cloudFront.getSignedUrl({ policy });  
  expect(url).toBe(3);
});
