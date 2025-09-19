
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface HealthTrendsProps {
  trends: {
    [key: string]: {
      current: number;
      trend: string;
      change: number;
    };
  };
}

const HealthTrends: React.FC<HealthTrendsProps> = ({ trends }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />;
      case 'down': return <TrendingDown className="h-4 w-4" />;
      case 'stable': return <ArrowRight className="h-4 w-4" />;
      default: return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-red-600';
      case 'down': return 'text-green-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Condition Trends</CardTitle>
        <CardDescription>Prevalence of common health conditions (percentage of population)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(trends).map(([condition, data]) => (
            <div key={condition} className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 capitalize">{condition}</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">{data.current}%</p>
              <div className={`flex items-center justify-center mt-2 ${getTrendColor(data.trend)}`}>
                {getTrendIcon(data.trend)}
                <span className="text-sm ml-1">
                  {data.change > 0 ? '+' : ''}{data.change}% vs last quarter
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTrends;
