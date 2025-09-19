
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import PersonnelDashboard from '@/components/personnel/PersonnelDashboard';
import AMESchedule from '@/components/personnel/AMESchedule';
import HealthRecords from '@/components/personnel/HealthRecords';
import PersonnelProfile from '@/components/personnel/PersonnelProfile';
import PersonnelDetails from '@/components/personnel/PersonnelDetails';
import DocumentUpload from '@/components/personnel/DocumentUpload';
import AIHealthPrediction from '@/components/personnel/AIHealthPrediction';
import SettingsPage from '@/components/personnel/SettingsPage';
import MedicalOfficerDashboard from '@/components/medical/MedicalOfficerDashboard';
import PopulationAnalytics from '@/components/medical/PopulationAnalytics';
import AMEManagement from '@/components/medical/AMEManagement';
import HealthAlerts from '@/components/medical/HealthAlerts';
import HealthReports from '@/components/medical/HealthReports';
import OtherPatientDetails from '@/components/medical/OtherPatientDetails';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    if (user?.role === 'medical_officer') {
      switch (activeTab) {
        case 'dashboard':
          return <MedicalOfficerDashboard />;
        case 'population':
          return <PopulationAnalytics />;
        case 'ame-management':
          return <AMEManagement />;
        case 'alerts':
          return <HealthAlerts />;
        case 'personnel-details':
          return <PersonnelDetails />;
        case 'other-patient-details':
          return <OtherPatientDetails />;
        case 'upload':
          return <DocumentUpload />;
        case 'reports':
          return <HealthReports />;
        case 'settings':
          return <SettingsPage />;
        default:
          return <MedicalOfficerDashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard':
          return <PersonnelDashboard onTabChange={setActiveTab} />;
        case 'ame':
          return <AMESchedule />;
        case 'records':
          return <HealthRecords />;
        case 'ai-health-prediction':
          return <AIHealthPrediction />;
        case 'upload':
          return <DocumentUpload />;
        case 'settings':
          return <SettingsPage />;
        case 'profile':
          return <PersonnelProfile />;
        default:
          return <PersonnelDashboard onTabChange={setActiveTab} />;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }} 
          />
        </div>
        
        {/* Main content */}
        <main className="flex-1 flex flex-col min-h-0 lg:ml-0">
          <div className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6 max-w-7xl mx-auto animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Dashboard;
