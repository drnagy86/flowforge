import { Construct } from 'constructs';
import {
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_route53 as route53,
  aws_certificatemanager as acm,
  aws_s3_deployment as s3deploy,
  aws_route53_targets as targets,
  RemovalPolicy,
  CfnOutput,
} from 'aws-cdk-lib';
import { S3StaticWebsiteOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';

export interface StaticSiteProps {
  domainNames: string[]; 
  rootDomain: string;
  siteAssetPath: string;
  certArn: string;
  hostedZone: route53.IHostedZone;
}

export class StaticSite extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: StaticSiteProps) {
    super(scope, id);

    const certificate = acm.Certificate.fromCertificateArn(this, 'Cert', props.certArn);

    this.bucket = new s3.Bucket(this, 'SiteBucket', {
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

    this.distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: props.domainNames, // <-- fixed here
      certificate,
    });

    new s3deploy.BucketDeployment(this, 'DeploySite', {
      sources: [s3deploy.Source.asset(props.siteAssetPath)],
      destinationBucket: this.bucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
    });

    new route53.ARecord(this, 'AliasRecordWWW', {
      zone: props.hostedZone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(this.distribution)),
    });

    new CfnOutput(this, 'SiteURL', {
      value: `https://${props.domainNames[0]}`, // <-- fixed output
    });

    new CfnOutput(this, 'BucketName', {
      value: this.bucket.bucketName,
    });
  }
}
