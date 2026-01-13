
export interface ProductionKPIs {
  planned: number;
  actual: number;
  inventory: number;
  supplied: number;
  cycleTime: StationData[];
  oee: {
    availability: number;
    performance: number;
    quality: number;
    overall: number;
  };
  downtime: {
    planned: number;
    unplanned: number;
    reasons: { reason: string; minutes: number }[];
  };
  throughputPerShift: { shift: string; count: number }[];
}

export interface QualityKPIs {
  fpy: number;
  rty: number;
  okCount: number;
  ngCount: number;
  rejectionRate: number;
  reworkRate: number;
  scrapRate: number;
  topRejectionReasons: { reason: string; count: number }[];
}

export interface StationData {
  stationName: string;
  avgCycleTime: number;
  targetCycleTime: number;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
}

export interface DataLogEntry {
  id: string;
  serialNo: string;
  timestamp: string;
  station: string;
  operator: string;
  status: 'PASS' | 'FAIL' | 'REWORK';
  parameters: string;
}

export interface DashboardState {
  lineId: string;
  status: 'RUNNING' | 'IDLE' | 'MAINTENANCE';
  timeRange: 'SHIFT' | 'DAY' | 'WEEK';
  production: ProductionKPIs;
  quality: QualityKPIs;
  logs: DataLogEntry[];
}
