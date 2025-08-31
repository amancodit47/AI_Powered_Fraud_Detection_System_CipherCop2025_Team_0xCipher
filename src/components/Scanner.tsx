import React, { useState } from 'react';
import { Search, Upload, Globe, Smartphone, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import ScanResult from './ScanResult';

const Scanner: React.FC = () => {
  const [scanUrl, setScanUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanMode, setScanMode] = useState<'url' | 'file'>('url');

  const simulateScan = async (target: string) => {
    setIsScanning(true);
    
    // Simulate AI analysis stages
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock analysis result
    const suspiciousPatterns = [
      'paypal', 'amazon', 'microsoft', 'apple', 'google', 'bank', 'secure', 'login',
      'update', 'verify', 'suspended', 'urgent', 'limited', 'confirm'
    ];
    
    const isSuspicious = suspiciousPatterns.some(pattern => 
      target.toLowerCase().includes(pattern)
    );
    
    const riskScore = isSuspicious ? 
      Math.floor(Math.random() * 30) + 70 : 
      Math.floor(Math.random() * 40) + 10;
    
    const detectionReasons = [];
    if (isSuspicious) {
      detectionReasons.push('Domain contains suspicious keywords');
      detectionReasons.push('SSL certificate irregularities detected');
      detectionReasons.push('Content similarity to known phishing sites');
      if (riskScore > 85) {
        detectionReasons.push('Active malware signatures found');
      }
    }
    
    const result = {
      target,
      riskScore,
      classification: riskScore > 70 ? 'High Risk' : riskScore > 40 ? 'Medium Risk' : 'Low Risk',
      threatType: riskScore > 70 ? 'Phishing' : riskScore > 40 ? 'Suspicious' : 'Clean',
      detectionReasons,
      timestamp: new Date().toISOString(),
      analysisDetails: {
        nlpConfidence: Math.floor(Math.random() * 20) + 80,
        visualSimilarity: Math.floor(Math.random() * 30) + 60,
        domainReputation: Math.floor(Math.random() * 25) + 75,
        behavioralScore: Math.floor(Math.random() * 35) + 65
      }
    };
    
    setScanResult(result);
    setIsScanning(false);
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (scanUrl.trim()) {
      simulateScan(scanUrl);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Scanner</h1>
        <p className="text-gray-600">Analyze websites, apps, and digital content for fraudulent patterns</p>
      </div>

      {/* Scan Mode Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setScanMode('url')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              scanMode === 'url' 
                ? 'bg-blue-100 text-blue-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>URL/Website</span>
          </button>
          <button
            onClick={() => setScanMode('file')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              scanMode === 'file' 
                ? 'bg-blue-100 text-blue-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile App</span>
          </button>
        </div>

        {/* URL Scanner */}
        {scanMode === 'url' && (
          <form onSubmit={handleScan} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Enter URL or Domain
              </label>
              <div className="flex space-x-3">
                <input
                  type="url"
                  id="url"
                  value={scanUrl}
                  onChange={(e) => setScanUrl(e.target.value)}
                  placeholder="https://example.com or example.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isScanning}
                />
                <button
                  type="submit"
                  disabled={isScanning || !scanUrl.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isScanning ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Scanning</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>Scan</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* File Upload */}
        {scanMode === 'file' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload APK or App Package</h3>
            <p className="text-gray-500 mb-4">Drag and drop or click to select files</p>
            <button
              onClick={() => simulateScan('uploaded-app.apk')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Select Files
            </button>
          </div>
        )}
      </div>

      {/* Scanning Progress */}
      {isScanning && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis in Progress</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>🔍 Analyzing domain patterns and reputation...</p>
              <p>🧠 Running NLP content analysis...</p>
              <p>👁️ Checking visual similarity to known brands...</p>
              <p>🛡️ Cross-referencing threat databases...</p>
            </div>
          </div>
        </div>
      )}

      {/* Scan Results */}
      {scanResult && !isScanning && (
        <ScanResult result={scanResult} onNewScan={() => setScanResult(null)} />
      )}

      {/* Quick Examples */}
      {!scanResult && !isScanning && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Try These Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { url: 'paypal-secure-login.net', description: 'Suspicious PayPal clone' },
              { url: 'amazom-deals.com', description: 'Amazon typosquatting' },
              { url: 'microsoft-security-update.org', description: 'Fake Microsoft site' },
              { url: 'apple-id-verification.net', description: 'Apple phishing attempt' }
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setScanUrl(example.url);
                  simulateScan(example.url);
                }}
                className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="font-medium text-gray-900">{example.url}</div>
                <div className="text-sm text-gray-500">{example.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;