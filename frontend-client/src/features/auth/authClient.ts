// src/features/auth/authClient.ts
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { config } from '../../config';

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});
