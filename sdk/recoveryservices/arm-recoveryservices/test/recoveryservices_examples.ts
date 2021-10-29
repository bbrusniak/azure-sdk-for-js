/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  record,
  RecorderEnvironmentSetup,
  Recorder
} from "@azure-tools/test-recorder";
import * as assert from "assert";
import { ClientSecretCredential } from "@azure/identity";
import { RecoveryServicesClient } from "../src/recoveryServicesClient";

const recorderEnvSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
    SUBSCRIPTION_ID: "azure_subscription_id"
  },
  customizationsOnRecordings: [
    (recording: any): any =>
      recording.replace(
        /"access_token":"[^"]*"/g,
        `"access_token":"access_token"`
      )
  ],
  queryParametersToSkip: []
};

describe("Recoveryservices test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: RecoveryServicesClient;
  let location: string;
  let resourceGroup: string;
  let vaultsName: string;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    subscriptionId = env.SUBSCRIPTION_ID;
    // This is an example of how the environment variables are used
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );
    client = new RecoveryServicesClient(credential, subscriptionId);
    location = "eastus";
    resourceGroup = "myjstest";
    vaultsName = "myvaultxxx";
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("vaults create test", async function() {
    const res = await client.vaults.beginCreateOrUpdateAndWait(resourceGroup,vaultsName,{
      location: location,
        properties: {},
        sku: {
            name: "Standard"
        },
        identity: {
            type: "SystemAssigned"
        }
    });
    assert.equal(res.name,vaultsName);
  });

  it("vaults get test", async function() {
    const res = await client.vaults.get(resourceGroup,vaultsName);
    assert.equal(res.name,vaultsName);
  });

  it("vaults list test", async function() {
    const resArray = new Array();
    for await (let item of client.vaults.listByResourceGroup(resourceGroup)){
        resArray.push(item);
    }
    assert.equal(resArray.length,1);
  });

  it("vaultExtendedInfo create test", async function() {
    const res = await client.vaultExtendedInfo.createOrUpdate(resourceGroup,vaultsName,{
      algorithm: "None"
    });
    assert.equal(res.algorithm,"None");
  });

  it("vaultExtendedInfo get test", async function() {
    const res = await client.vaultExtendedInfo.get(resourceGroup,vaultsName);
    assert.equal(res.type,"Microsoft.RecoveryServices/vaults/extendedInformation")
  });

  it("vaults delete test", async function() {
    const res = await client.vaults.delete(resourceGroup,vaultsName);
    const resArray = new Array();
    for await (let item of client.vaults.listByResourceGroup(resourceGroup)){
        resArray.push(item);
    }
    assert.equal(resArray.length,0);
  });
});