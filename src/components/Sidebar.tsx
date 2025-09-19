
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  User, 
  Calendar, 
  FileText, 
  Users,
  Heart,
  Info,
  Upload,
  BarChart,
  Settings,
  Activity,
  IdCard
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const medicalOfficerTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Heart },
    { id: 'population', label: 'Population Analytics', icon: Users },
    { id: 'ame-management', label: 'AME Management', icon: Calendar },
    { id: 'alerts', label: 'Health Alerts', icon: Info },
    { id: 'health-data-collection', label: 'Health Data Collection', icon: Activity },
    { id: 'personnel-details', label: 'Personnel Details', icon: User },
    { id: 'other-patient-details', label: 'Other Patient Details', icon: IdCard },
    { id: 'upload', label: 'Document Upload', icon: Upload },
    { id: 'reports', label: 'Health Reports', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const personnelTabs = [
    { id: 'dashboard', label: 'My Health', icon: Heart },
    { id: 'ame', label: 'AME Schedule', icon: Calendar },
    { id: 'records', label: 'Health Records', icon: FileText },
    { id: 'health-data', label: 'Health Data', icon: Activity },
    { id: 'upload', label: 'Upload Documents', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const tabs = user?.role === 'medical_officer' ? medicalOfficerTabs : personnelTabs;

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 animate-fade-in">
          Navigation
        </h2>
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-sm",
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700 border border-blue-200 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0 transition-transform duration-200 hover:scale-110" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
