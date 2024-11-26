'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  const [credentials, setCredentials] = useState({
    marketplaceId: process.env.NEXT_PUBLIC_AMAZON_MARKETPLACE_ID || '',
    sellerId: process.env.NEXT_PUBLIC_AMAZON_SELLER_ID || '',
    accessKey: '',
    secretKey: '',
    roleArn: '',
    appId: '',
    region: process.env.AMAZON_AWS_REGION || 'us-east-1',
    refreshToken: '',
    accessToken: '',
    clientSecret: '',
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('idle')

    try {
      // In a real app, you'd want to securely store these credentials
      // For now, we'll just save to localStorage as an example
      localStorage.setItem('amazonCredentials', JSON.stringify(credentials))
      setSaveStatus('success')
    } catch (error) {
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Amazon Seller API Settings
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Marketplace ID
                    </label>
                    <input
                      type="text"
                      value={credentials.marketplaceId}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        marketplaceId: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Seller ID
                    </label>
                    <input
                      type="text"
                      value={credentials.sellerId}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        sellerId: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Access Key
                    </label>
                    <input
                      type="password"
                      value={credentials.accessKey}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        accessKey: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Secret Key
                    </label>
                    <input
                      type="password"
                      value={credentials.secretKey}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        secretKey: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role ARN
                    </label>
                    <input
                      type="text"
                      value={credentials.roleArn}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        roleArn: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      App ID
                    </label>
                    <input
                      type="text"
                      value={credentials.appId}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        appId: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      AWS Region
                    </label>
                    <select
                      value={credentials.region}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        region: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="us-east-1">US East (N. Virginia)</option>
                      <option value="us-west-2">US West (Oregon)</option>
                      <option value="eu-west-1">EU (Ireland)</option>
                      <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Refresh Token
                    </label>
                    <input
                      type="password"
                      value={credentials.refreshToken}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        refreshToken: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Access Token
                    </label>
                    <input
                      type="password"
                      value={credentials.accessToken}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        accessToken: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Client Secret
                    </label>
                    <input
                      type="password"
                      value={credentials.clientSecret}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        clientSecret: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {saveStatus === 'success' && (
                      <p className="text-sm text-green-600">Settings saved successfully!</p>
                    )}
                    {saveStatus === 'error' && (
                      <p className="text-sm text-red-600">Failed to save settings. Please try again.</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                How to Get Your Amazon Seller API Credentials
              </h3>
              
              <div className="prose prose-sm text-gray-500">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Go to <a href="https://sellercentral.amazon.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">Seller Central</a></li>
                  <li>Navigate to Settings → Account Info</li>
                  <li>Click on "Developer Settings" or "Developer Access"</li>
                  <li>Create a new developer application if you haven't already</li>
                  <li>Copy your credentials and paste them here</li>
                  <li>For detailed instructions, visit the <a href="https://developer-docs.amazon.com/sp-api/docs/creating-and-configuring-iam-policies" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">Amazon SP-API documentation</a></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
