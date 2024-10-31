// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private client: CognitoIdentityProviderClient;
  private readonly userPoolId: string = process.env.COGNITO_USER_POOL_ID;
  private readonly clientId: string = process.env.COGNITO_APP_CLIENT_ID;

  constructor() {
    this.client = new CognitoIdentityProviderClient({});
  }

  async login(loginDto: LoginDto) {
    const params: AdminInitiateAuthCommandInput = {
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      AuthParameters: {
        USERNAME: loginDto.username,
        PASSWORD: loginDto.password,
      },
    };

    const command = new AdminInitiateAuthCommand(params);
    const response = await this.client.send(command);
    return response.AuthenticationResult;
  }
}
