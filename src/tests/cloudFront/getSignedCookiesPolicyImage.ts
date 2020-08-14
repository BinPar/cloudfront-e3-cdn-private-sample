import * as AWS from 'aws-sdk';
import getPrivateKey from '../../tools/getPrivateKey';

test('Get SignedURL for accessing all the contents of an S3 test folder using CloudFront During 2 days for a specific IP Address', async (): Promise<
  void
> => {
  const cloudfrontAccessKeyId = 'APKAJ6LPF43JSDM6FYNQ';
  const cloudFrontPrivateKey = await getPrivateKey();
  const signer = new AWS.CloudFront.Signer(
    cloudfrontAccessKeyId,
    cloudFrontPrivateKey,
  );
  const twoDays = 2 * 24 * 60 * 60 * 1000;

  const policy = JSON.stringify({
    Statement: [
      {
        Domain: 'cdn.read.garden',
        Path: 'books/9788401019715/5f314fac08b39700139f2f98',
        Condition: {
          IpAddress: { 'AWS:SourceIp': '2.136.101.9/32' },
          DateLessThan: {
            'AWS:EpochTime': Math.floor((Date.now() + twoDays) / 1000),
          },
        },
      },
    ],
  });
  const signedCookies = signer.getSignedCookie({
    policy,
  });
  expect(signedCookies['CloudFront-Signature'].length).toBeGreaterThan(10);

  // eslint-disable-next-line no-console
  console.log(`Cookies to Use:
    CloudFront-Policy=${signedCookies['CloudFront-Policy']}
    CloudFront-Key-Pair-Id=${signedCookies['CloudFront-Key-Pair-Id']}
    CloudFront-Signature=${signedCookies['CloudFront-Signature']}
    CURL:
    curl -v --cookie "CloudFront-Policy=${signedCookies['CloudFront-Policy']};CloudFront-Key-Pair-Id=${signedCookies['CloudFront-Key-Pair-Id']};CloudFront-Signature=${signedCookies['CloudFront-Signature']}" https://cdn.read.garden/books/9788401019715/5f314fac08b39700139f2f98/multimedia/Image_001.jpg
  `);
});
