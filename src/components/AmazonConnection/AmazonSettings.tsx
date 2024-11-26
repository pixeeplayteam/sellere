import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle, Save } from 'lucide-react';
import { AmazonCredentials } from '@/types';

interface AmazonSettingsProps {
  onSave: (credentials: AmazonCredentials) => void;
  onTest: (credentials: AmazonCredentials) => Promise<boolean>;
}

export default function AmazonSettings({ onSave, onTest }: AmazonSettingsProps) {
  const [credentials, setCredentials] = useState<AmazonCredentials>({
    marketplaceId: process.env.NEXT_PUBLIC_AMAZON_MARKETPLACE_ID || '',
    sellerId: process.env.NEXT_PUBLIC_AMAZON_SELLER_ID || '',
    accessKey: '',
    secretKey: '',
    roleArn: '',
    appId: '',
    region: process.env.AMAZON_AWS_REGION || 'us-east-1',
    refreshToken: '',
  });

  const [status, setStatus] = useState<'disconnected' | 'connected' | 'testing' | 'error'>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(true); // Start in editing mode

  useEffect(() => {
    // Load saved credentials from localStorage
    const savedCredentials = localStorage.getItem('amazonCredentials');
    if (savedCredentials) {
      try {
        const parsed = JSON.parse(savedCredentials);
        setCredentials(parsed);
        setStatus('connected');
        setIsEditing(false); // If we have saved credentials, start in view mode
      } catch (err) {
        console.error('Failed to parse saved credentials:', err);
      }
    }
  }, []);

  const handleInputChange = (key: keyof AmazonCredentials) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [key]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      const requiredFields: (keyof AmazonCredentials)[] = [
        'marketplaceId',
        'sellerId',
        'accessKey',
        'secretKey',
        'roleArn',
        'appId'
      ];

      const missingFields = requiredFields.filter(field => !credentials[field]);
      if (missingFields.length > 0) {
        setError(`Required fields missing: ${missingFields.join(', ')}`);
        return;
      }

      onSave(credentials);
      setIsEditing(false);
      setError(null);
      setStatus('connected');
    } catch (err) {
      setError('Failed to save credentials');
      setStatus('error');
    }
  };

  const handleTest = async () => {
    setStatus('testing');
    setError(null);
    
    try {
      const success = await onTest(credentials);
      setStatus(success ? 'connected' : 'error');
      if (!success) {
        setError('Connection test failed. Please check your credentials.');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Connection test failed');
    }
  };

  const renderStatusBadge = () => {
    switch (status) {
      case 'connected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-4 h-4 mr-1" />
            Connected
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="w-4 h-4 mr-1" />
            Error
          </span>
        );
      case 'testing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-4 h-4 mr-1 animate-pulse" />
            Testing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            Disconnected
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Amazon Seller API Configuration</h3>
          {renderStatusBadge()}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Configuration Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Marketplace ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marketplace ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={credentials.marketplaceId}
              onChange={handleInputChange('marketplaceId')}
              disabled={!isEditing}
              placeholder="e.g., ATVPDKIKX0DER"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          {/* Seller ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seller ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={credentials.sellerId}
              onChange={handleInputChange('sellerId')}
              disabled={!isEditing}
              placeholder="Your Amazon Seller ID"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          {/* Access Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Access Key <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={credentials.accessKey}
              onChange={handleInputChange('accessKey')}
              disabled={!isEditing}
              placeholder="AWS Access Key"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          {/* Secret Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Secret Key <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={credentials.secretKey}
              onChange={handleInputChange('secretKey')}
              disabled={!isEditing}
              placeholder="AWS Secret Key"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          {/* Role ARN */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role ARN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={credentials.roleArn}
              onChange={handleInputChange('roleArn')}
              disabled={!isEditing}
              placeholder="arn:aws:iam::..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          {/* App ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              App ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={credentials.appId}
              onChange={handleInputChange('appId')}
              disabled={!isEditing}
              placeholder="amzn1.application-oa2-client..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              AWS Region <span className="text-red-500">*</span>
            </label>
            <select
              value={credentials.region}
              onChange={handleInputChange('region')}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="us-west-2">US West (Oregon)</option>
              <option value="eu-west-1">EU (Ireland)</option>
              <option value="eu-central-1">EU (Frankfurt)</option>
              <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
            </select>
          </div>

          {/* Refresh Token */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Refresh Token
            </label>
            <input
              type="password"
              value={credentials.refreshToken}
              onChange={handleInputChange('refreshToken')}
              disabled={!isEditing}
              placeholder="Optional refresh token"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  // Reload saved credentials
                  const savedCredentials = localStorage.getItem('amazonCredentials');
                  if (savedCredentials) {
                    setCredentials(JSON.parse(savedCredentials));
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
            </>
          )}
          <button
            onClick={handleTest}
            disabled={status === 'testing'}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {status === 'testing' ? (
              <>
                <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Test Connection'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
