import '../plugins/aws-sdk-2.831.0.min.js';

export const AWSS3_ACCESS_POINT = 'arn:aws:s3:us-east-2:266624589417:accesspoint/titanfrontend';

export const AWS_CLOUDFRONT_BASEURL = 'https://d1i6h0k565wt9n.cloudfront.net/';


export function S3()
{
    AWS.config.region = 'us-east-2' // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:648c55da-43b4-4aea-8bd0-9425c3061c3f',
    })


    let s3 = new AWS.S3(AWS.config);
    return s3;
}

