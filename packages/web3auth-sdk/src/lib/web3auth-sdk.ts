import axios, { AxiosInstance } from 'axios';
import FormData from 'form-data';

type ClientConfigs = {
  endpointUrl?: string;
  accessKey?: string;
  version?: string;
  headers?: Record<string, string>;
};

const initClientOptions: ClientConfigs = {
  endpointUrl: 'https://web3auth.djuno.cloud',
  version: 'v1',
};

export class Client {
  private httpClient: AxiosInstance;
  private readonly basePath = '/web3-auth';

  constructor(configs: ClientConfigs = {}) {
    const { endpointUrl, version, accessKey, headers } = {
      ...initClientOptions,
      ...configs,
    };

    if (!accessKey) {
      throw new Error('Access Key is required');
    }

    this.httpClient = axios.create({
      baseURL: endpointUrl + '/' + version,
      headers: {
        'x-api-key': accessKey,
        ...headers,
      },
    });
  }

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: false,
        message: error.response?.data?.message || error.message,
        code: error.response?.status || 500,
        data: null,
      };
    }
    return {
      status: false,
      message: 'An unknown error occurred',
      code: 500,
      data: null,
    };
  }

  setAccessKey(newAccessKey: string) {
    this.httpClient.defaults.headers['x-api-key'] = newAccessKey;
  }

  async networks() {
    try {
      const response = await this.httpClient.get(this.basePath + '/networks');
      return {
        data: response.data.Result,
        status: true,
        message: response.data.Message,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async handshake(networkId: string, public_key: string) {
    try {
      const response = await this.httpClient.post(
        this.basePath + '/handshake',
        {
          NetworkId: networkId,
          WalletAddress: public_key,
        }
      );
      return {
        data: response.data.Message,
        status: true,
        message: response.data.Message,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async verify(networkId: string, public_key: string, signature: string) {
    try {
      const response = await this.httpClient.put(this.basePath + '/verify', {
        WalletAddress: public_key,
        Signature: signature,
        NetworkId: networkId,
      });
      return {
        data: response.data.Result,
        status: true,
        message: response.data.Message,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getProfile(token: string) {
    try {
      const response = await this.httpClient.get(this.basePath + '/profile', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return {
        data: response.data.Result,
        status: true,
        message: response.data.Message,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateProfile(token: string, data: unknown) {
    try {
      if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid data');
      }

      const response = await this.httpClient.put(
        this.basePath + '/profile',
        data,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      return {
        data: response.data.Result,
        status: true,
        message: response.data.Message,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getProfileAvatar(token: string) {
    try {
      const response = await this.httpClient.get(
        this.basePath + '/profile/avatar',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          responseType: 'blob',
        }
      );

      const blobUrl = URL.createObjectURL(response.data);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);

      return {
        data: blobUrl,
        status: true,
        message: 'Profile avatar fetched successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async saveProfileAvatar(token: string, formData: FormData) {
    try {
      const headers: Record<string, string> = {
        Authorization: 'Bearer ' + token,
      };

      // Check if running in Node.js
      if (typeof global !== 'undefined' && 'getHeaders' in formData) {
        Object.assign(headers, formData.getHeaders());
      }

      const response = await this.httpClient.post(
        this.basePath + '/profile/avatar',
        formData,
        {
          headers,
        }
      );

      return {
        data: response.data.Result,
        status: true,
        message: response.data.Message,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
