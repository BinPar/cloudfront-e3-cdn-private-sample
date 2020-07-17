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

  const signedCookies = signer.getSignedCookie({
    url: 'https://d3tuovxue5pcj7.cloudfront.net/test',
    expires: Math.floor((Date.now() + twoDays) / 1000),
  });
  expect(signedCookies["CloudFront-Signature"].length).toBeGreaterThan(10);
  // eslint-disable-next-line no-console
  console.log(`Cookies to Use:
    CloudFront-Expires=${signedCookies["CloudFront-Expires"]}
    CloudFront-Key-Pair-Id=${signedCookies["CloudFront-Key-Pair-Id"]}
    CloudFront-Signature=${signedCookies["CloudFront-Signature"]}
    CURL:
    curl -v --cookie "CloudFront-Expires=${signedCookies["CloudFront-Expires"]};CloudFront-Key-Pair-Id=${signedCookies["CloudFront-Key-Pair-Id"]};CloudFront-Signature=${signedCookies["CloudFront-Signature"]}" https://d3tuovxue5pcj7.cloudfront.net/test/cedric_about_tq_brief.mp3
  `);
});
