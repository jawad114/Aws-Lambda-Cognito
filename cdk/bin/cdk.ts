#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyCdkStack } from '../lib/cdk-stack';
import * as dotenv from 'dotenv';

dotenv.config();
const app = new cdk.App();

new MyCdkStack(app, 'CdkStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION,   
  },
});
