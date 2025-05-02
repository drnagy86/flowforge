import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

export class DevSiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const rootDomain = 'derricknagy.dev';
    const wwwDomain = `www.${rootDomain}`;

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: rootDomain,
    });

    const certArn = this.node.tryGetContext('certArnUnified');
    if (!certArn) throw new Error('Missing certArnUnified context value');

    const certificate = acm.Certificate.fromCertificateArn(this, 'ImportedCert', certArn);

    const siteBucket = new s3.Bucket(this, 'DevSiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }),
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const distribution = new cloudfront.Distribution(this, 'DevSiteDistribution', {
      defaultBehavior: {
        origin: new S3Origin(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [wwwDomain, rootDomain], // <-- now both www and root
      certificate,
    });

    new s3deploy.BucketDeployment(this, 'DeployDevSite', {
      sources: [s3deploy.Source.asset('../devsite/dist')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // A Record for www
    new route53.ARecord(this, 'DevSiteAliasRecordWWW', {
      zone: hostedZone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });

    // A Record for root domain
    new route53.ARecord(this, 'DevSiteAliasRecordRoot', {
      zone: hostedZone,
      recordName: '', // root domain
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });

    new CfnOutput(this, 'DevSiteURLWWW', {
      value: `https://${wwwDomain}`,
      description: 'Dev Site URL (www)',
    });

    new CfnOutput(this, 'DevSiteURLRoot', {
      value: `https://${rootDomain}`,
      description: 'Dev Site URL (root)',
    });

    new CfnOutput(this, 'DevSiteBucketName', {
      value: siteBucket.bucketName,
      description: 'S3 Bucket name for Dev Site',
    });
  }
}
