// cdk/lib/cdk-stack.ts
import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { S3StaticWebsiteOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class FlowForgeStaticSiteStack extends Stack {
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const domainName = 'flowforge.derricknagy.dev';
    const rootDomain = 'derricknagy.dev';

    // Lookup the hosted zone
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: rootDomain,
    });

    // Retrieve the certificate ARN from SSM Parameter Store
    const certArn = this.node.tryGetContext('certArn');
    if (!certArn) {
      throw new Error('Missing certArn context value');
    }
    const certificate = acm.Certificate.fromCertificateArn(this, 'ImportedCert', certArn);

    // S3 bucket for static site
    const siteBucket = new s3.Bucket(this, 'FlowForgeSiteBucket', {
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

    // CloudFront distribution using custom domain and cert
    this.distribution = new cloudfront.Distribution(this, 'FlowForgeDistribution', {
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [domainName],
      certificate,
    });

    // Deploy files to S3
    new s3deploy.BucketDeployment(this, 'DeployStaticSite', {
      sources: [s3deploy.Source.asset('../frontend-client/dist')],
      destinationBucket: siteBucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
    });

    // Route 53 alias record for CloudFront
    new route53.ARecord(this, 'FlowForgeAliasRecord', {
      zone: hostedZone,
      recordName: 'flowforge',
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(this.distribution)),
    });

    // Output CloudFront URL and bucket name
    new CfnOutput(this, 'SiteURL', {
      value: `https://${domainName}`,
      description: 'The custom domain URL for the site',
    });

    new CfnOutput(this, 'BucketName', {
      value: siteBucket.bucketName,
      description: 'The name of the S3 bucket the site is deployed to',
    });
  }
}
