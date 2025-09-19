
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'medical_officer' | 'personnel';
  employeeId: string;
  department?: string;
}

export interface HealthMetrics {
  id: string;
  userId: string;
  date: string;
  height: number;
  weight: number;
  bmi: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
}

export interface LabResults {
  id: string;
  userId: string;
  date: string;
  testType: string;
  results: {
    parameter: string;
    value: number;
    unit: string;
    normalRange: string;
    status: 'normal' | 'abnormal' | 'critical';
  }[];
}

export interface AMEAppointment {
  id: string;
  userId: string;
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'missed' | 'cancelled';
  type: 'annual' | 'follow_up' | 'emergency';
  notes?: string;
}

export interface HealthAlert {
  id: string;
  userId: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface PopulationStats {
  totalEmployees: number;
  healthyEmployees: number;
  atRiskEmployees: number;
  criticalEmployees: number;
  pendingAMEs: number;
  completedAMEs: number;
  commonHealthIssues: {
    condition: string;
    count: number;
    percentage: number;
  }[];
}
