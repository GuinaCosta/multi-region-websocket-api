#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { WebsocketsTdcStack } from '../lib/websockets-tdc-stack';

const app = new cdk.App();

const regionsToDeploy = ['sa-east-1'];

// Regional stacks
regionsToDeploy.forEach((regionCode) => {
  const stack = new WebsocketsTdcStack(app, `WSTdcStack-${regionCode}`, {
    env: { region: regionCode },
    regionCodesToReplicate: regionsToDeploy.filter((replicationRegion) => replicationRegion !== regionCode),
    description: 'Deploys the regional Stack for multi-region Websocket API demo',
  });
  Tags.of(stack).add('project', 'iteris-tdc-business');
  Tags.of(stack).add('topic', 'multi-region-websocket-api');
});
