// src/features/auth/__tests__/authService.test.ts
import { vi, describe, it, expect, beforeEach } from 'vitest';
import {
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { signIn, signUp, confirmSignUp } from '../authService';
import { cognitoClient } from '../authClient';

// ✅ Mock the Cognito client
vi.mock('../authClient', () => ({
  cognitoClient: {
    send: vi.fn(),
  },
}));

// ✅ Shared beforeEach for all tests
beforeEach(() => {
  vi.clearAllMocks();
  sessionStorage.clear();
});

describe('authService', () => {
  describe('signIn', () => {
    const mockTokens = {
      IdToken: 'fake-id-token',
      AccessToken: 'fake-access-token',
      RefreshToken: 'fake-refresh-token',
    };

    it('stores tokens in sessionStorage on successful sign-in', async () => {
      const mockSend = cognitoClient.send as ReturnType<typeof vi.fn>;
      mockSend.mockResolvedValue({
        AuthenticationResult: mockTokens,
      });

      const result = await signIn('test@example.com', 'TestPassword123!');

      expect(mockSend).toHaveBeenCalledWith(expect.any(InitiateAuthCommand));
      expect(sessionStorage.getItem('idToken')).toBe(mockTokens.IdToken);
      expect(sessionStorage.getItem('accessToken')).toBe(mockTokens.AccessToken);
      expect(sessionStorage.getItem('refreshToken')).toBe(mockTokens.RefreshToken);
      expect(result).toEqual(mockTokens);
    });

    it('throws an error and logs on failure', async () => {
      const mockError = new Error('User not found');
      const mockSend = cognitoClient.send as ReturnType<typeof vi.fn>;
      mockSend.mockRejectedValue(mockError);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(signIn('wrong@example.com', 'badpass')).rejects.toThrow('User not found');
      expect(consoleSpy).toHaveBeenCalledWith('Error signing in: ', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('signUp', () => {
    it('sends SignUpCommand with correct params and returns response', async () => {
      const mockResponse = { UserConfirmed: false };
      const mockSend = cognitoClient.send as ReturnType<typeof vi.fn>;
      mockSend.mockResolvedValue(mockResponse);

      const result = await signUp('test@example.com', 'password123');

      expect(mockSend).toHaveBeenCalledWith(expect.any(SignUpCommand));
      expect(result).toEqual(mockResponse);
    });

    it('logs and throws error on failed sign-up', async () => {
      const mockError = new Error('Email already exists');
      const mockSend = cognitoClient.send as ReturnType<typeof vi.fn>;
      mockSend.mockRejectedValue(mockError);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(signUp('dupe@example.com', 'password123')).rejects.toThrow('Email already exists');
      expect(consoleSpy).toHaveBeenCalledWith('Error signing up: ', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('confirmSignUp', () => {
    it('sends ConfirmSignUpCommand and returns true on success', async () => {
      const mockSend = cognitoClient.send as ReturnType<typeof vi.fn>;
      mockSend.mockResolvedValue({});

      const result = await confirmSignUp('test@example.com', '123456');

      expect(mockSend).toHaveBeenCalledWith(expect.any(ConfirmSignUpCommand));
      expect(result).toBe(true);
    });

    it('logs and throws error on failed confirmation', async () => {
      const mockError = new Error('Code mismatch');
      const mockSend = cognitoClient.send as ReturnType<typeof vi.fn>;
      mockSend.mockRejectedValue(mockError);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(confirmSignUp('test@example.com', '000000')).rejects.toThrow('Code mismatch');
      expect(consoleSpy).toHaveBeenCalledWith('Error confirming sign up: ', mockError);

      consoleSpy.mockRestore();
    });
  });
});
