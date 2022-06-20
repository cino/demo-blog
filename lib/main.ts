import { DockerImage, Stack, StackProps } from 'aws-cdk-lib';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import path = require('path');
import { ServerlessBlog } from 'serverless-blog';

export class DemoBlogStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ServerlessBlog(this, 'ServerlessBlog', {
      hostedZone: HostedZone.fromLookup(this, 'Zone', { domainName: 'cino.io' }),

      admin: {
        alias: 'demo-blog-admin.cino.io',
      },

      frontEnd: {
        source: Source.asset(path.join(__dirname, '../app'), {
          bundling: {
            image: DockerImage.fromRegistry('node:16-alpine'),
            command: [
              'sh',
              '-c',
              `npm ci && npm run build && cp -a /asset-input/dist/* /asset-output`,
            ],
          },
        }),
        alias: 'demo-blog.cino.io',
      },
    });
  }
}
