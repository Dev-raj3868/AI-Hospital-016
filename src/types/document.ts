export interface DocumentNlpEntity {
  entity: string;
  text: string;
  confidence: number;
}

export interface DocumentInnerDetails {
  documentStructure?: {
    sections: string[];
    totalPages: number;
    testDate: string;
    labFacility: string;
  };
  clinicalValues?: Array<{
    parameter: string;
    value: string;
    unit: string;
    range: string;
    status: string;
  }>;
  riskAssessment?: {
    cardiovascularRisk: string;
    diabeticRisk: string;
    overallHealth: string;
  };
  imagingDetails?: {
    studyType: string;
    views: string[];
    technique: string;
    contrast: string;
    quality: string;
  };
  anatomicalFindings?: Array<{
    structure: string;
    finding: string;
    status: string;
  }>;
  clinicalCorrelation?: string;
  vaccinationSchedule?: {
    covidVaccines: Array<{
      dose: number | string;
      date: string;
      manufacturer: string;
      lotNumber: string;
    }>;
    otherVaccines: Array<{
      vaccine: string;
      date?: string;
      lastDose?: string;
      status?: string;
      nextDue?: string;
    }>;
  };
  immunityStatus?: {
    [key: string]: string;
  };
}

export interface MedicalDocument {
  id: number;
  name: string;
  type: string;
  status: string;
  extractedData: string;
  uploadDate: string;
  nlpEntities: DocumentNlpEntity[];
  summary: string;
  innerDetails?: DocumentInnerDetails;
}