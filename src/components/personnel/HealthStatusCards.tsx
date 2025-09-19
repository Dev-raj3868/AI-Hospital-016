
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, FileText, Info } from 'lucide-react';

interface HealthStatus {
  overall: string;
  lastCheckup: string;
  nextAME: string;
  completionRate: number;
}

interface HealthStatusCardsProps {
  healthStatus: HealthStatus;
}

const HealthStatusCards: React.FC<HealthStatusCardsProps> = ({ healthStatus }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div className="ml-4 min-w-0">
              <p className="text-sm font-medium text-gray-600">Overall Health</p>
              <Badge className={getStatusColor(healthStatus.overall)}>
                {healthStatus.overall.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-600 flex-shrink-0" />
            <div className="ml-4 min-w-0">
              <p className="text-sm font-medium text-gray-600">Next AME</p>
              <p className="text-lg font-bold text-gray-900 truncate">{healthStatus.nextAME}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-600 flex-shrink-0" />
            <div className="ml-4 min-w-0">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-lg font-bold text-gray-900">{healthStatus.completionRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Info className="h-8 w-8 text-orange-600 flex-shrink-0" />
            <div className="ml-4 min-w-0">
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-lg font-bold text-gray-900">2</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthStatusCards;
