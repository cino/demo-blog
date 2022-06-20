#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoBlogStack } from '../lib/main';

const app = new cdk.App();

new DemoBlogStack(app, 'ServerlessBlog', {
  env: {
    account: '556615446840',
    region: 'eu-west-1',
  },
});
