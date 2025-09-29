import React from 'react';
import { CircleCheck as CheckCircle, CircleAlert as AlertCircle, Eye, ChartBar as BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalysisResult {
  disease_name: string;
  probability: number;
  confidence: number;
  segmented_image?: string;
  additional_info?: {
    severity?: string;
    recommendations?: string[];
    affected_areas?: string[];
  };
}

interface ResultsPanelProps {
  results: AnalysisResult;
  originalImage: string;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, originalImage }) => {
  const getSeverityColor = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'mild': return <CheckCircle className="w-4 h-4" />;
      case 'moderate': 
      case 'severe': return <AlertCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in-50 duration-500">
      {/* Main Results Card */}
      <Card className="border-2 border-teal-100">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
          <CardTitle className="flex items-center space-x-2 text-teal-800">
            <Eye className="w-5 h-5" />
            <span>Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Disease Detection */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Detected Condition
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-slate-900">
                    {results.disease_name}
                  </div>
                  {results.additional_info?.severity && (
                    <Badge className={getSeverityColor(results.additional_info.severity)}>
                      <div className="flex items-center space-x-1">
                        {getSeverityIcon(results.additional_info.severity)}
                        <span className="capitalize">{results.additional_info.severity}</span>
                      </div>
                    </Badge>
                  )}
                </div>
              </div>

              {/* Probability Score */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Detection Probability</span>
                  <span className="text-sm font-bold text-teal-600">
                    {Math.round(results.probability * 100)}%
                  </span>
                </div>
                <Progress 
                  value={results.probability * 100} 
                  className="h-3"
                />
              </div>

              {/* Confidence Score */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Model Confidence</span>
                  <span className="text-sm font-bold text-blue-600">
                    {Math.round(results.confidence * 100)}%
                  </span>
                </div>
                <Progress 
                  value={results.confidence * 100} 
                  className="h-3"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              {results.additional_info?.affected_areas && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Affected Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.additional_info.affected_areas.map((area, index) => (
                      <Badge key={index} variant="outline" className="bg-slate-50">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {results.additional_info?.recommendations && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Recommendations
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {results.additional_info.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <BarChart3 className="w-5 h-5" />
            <span>Image Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Original Image</h4>
              <div className="border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
                <img
                  src={originalImage}
                  alt="Original retinal image"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Segmented Image */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">
                {results.segmented_image ? 'Analysis Overlay' : 'Processing Complete'}
              </h4>
              <div className="border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
                {results.segmented_image ? (
                  <img
                    src={results.segmented_image}
                    alt="Segmented retinal image"
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-slate-50">
                    <div className="text-center space-y-2">
                      <CheckCircle className="w-12 h-12 text-teal-500 mx-auto" />
                      <p className="text-sm text-slate-600">
                        Analysis completed successfully
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};