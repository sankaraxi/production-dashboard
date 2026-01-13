
const generateLogs = (prefix) => [
  { id: '1', serialNo: `${prefix}-8821`, timestamp: '2023-10-24 14:20:11', station: 'Leak Test', operator: 'Rajesh K.', status: 'PASS', parameters: 'Pres: 0.2bar' },
  { id: '2', serialNo: `${prefix}-8822`, timestamp: '2023-10-24 14:21:45', station: 'Weld Check', operator: 'Anita S.', status: 'FAIL', parameters: 'Depth: 0.1mm' },
  { id: '3', serialNo: `${prefix}-8823`, timestamp: '2023-10-24 14:22:30', station: 'Final Assy', operator: 'System', status: 'PASS', parameters: 'V: 48.2V' },
  { id: '4', serialNo: `${prefix}-8824`, timestamp: '2023-10-24 14:23:15', station: 'BMS Mount', operator: 'Vijay M.', status: 'REWORK', parameters: 'Torque Low' },
  { id: '5', serialNo: `${prefix}-8825`, timestamp: '2023-10-24 14:25:02', station: 'Leak Test', operator: 'Rajesh K.', status: 'PASS', parameters: 'Pres: 0.21bar' },
];

const hourlyData = [
  { time: '08:00', units: 42 },
  { time: '09:00', units: 68 },
  { time: '10:00', units: 55 },
  { time: '11:00', units: 72 },
  { time: '12:00', units: 88 },
  { time: '13:00', units: 92 },
  { time: '14:00', units: 78 },
  { time: '15:00', units: 62 },
  { time: '16:00', units: 48 },
  { time: '17:00', units: 82 },
  { time: '18:00', units: 98 },
  { time: '19:00', units: 91 },
];

export const mockDashboardData = {
  'Line-1': {
    lineId: 'Line-1',
    status: 'RUNNING',
    timeRange: 'SHIFT',
    production: {
      planned: 1200,
      actual: 1142,
      inventory: 450,
      supplied: 692,
      cycleTime: [
        { stationName: 'Cell Loading', avgCycleTime: 42, targetCycleTime: 40, status: 'WARNING' },
        { stationName: 'Weld Check', avgCycleTime: 35, targetCycleTime: 40, status: 'OPTIMAL' },
        { stationName: 'BMS Mount', avgCycleTime: 38, targetCycleTime: 40, status: 'OPTIMAL' },
        { stationName: 'Leak Test', avgCycleTime: 55, targetCycleTime: 45, status: 'CRITICAL' },
        { stationName: 'Final Assembly', avgCycleTime: 39, targetCycleTime: 40, status: 'OPTIMAL' },
      ],
      oee: { availability: 92, performance: 88, quality: 98, overall: 79.4 },
      downtime: {
        planned: 30,
        unplanned: 45,
        reasons: [{ reason: 'Material Shortage', minutes: 20 }, { reason: 'Station Jam', minutes: 15 }],
      },
      throughputPerShift: [
        { shift: 'Shift A', count: 380 },
        { shift: 'Shift B', count: 410 },
        { shift: 'Shift C', count: 352 },
      ],
      hourlyData: hourlyData,
    },
    quality: {
      fpy: 96.4, rty: 94.2, okCount: 1098, ngCount: 44, rejectionRate: 3.8, reworkRate: 2.1, scrapRate: 1.7,
      topRejectionReasons: [{ reason: 'Welding Defect', count: 18 }, { reason: 'BMS Comms Fail', count: 12 }, { reason: 'Voltage Imbal', count: 8 }, { reason: 'Mechanical', count: 6 }],
    },
    logs: generateLogs('BAT1'),
  },
  'Line-2': {
    lineId: 'Line-2',
    status: 'RUNNING',
    timeRange: 'SHIFT',
    production: {
      planned: 1000,
      actual: 1015,
      inventory: 120,
      supplied: 895,
      cycleTime: [
        { stationName: 'Cell Loading', avgCycleTime: 38, targetCycleTime: 40, status: 'OPTIMAL' },
        { stationName: 'Leak Test', avgCycleTime: 42, targetCycleTime: 45, status: 'OPTIMAL' },
      ],
      oee: { availability: 96, performance: 92, quality: 99, overall: 87.4 },
      downtime: { planned: 15, unplanned: 10, reasons: [{ reason: 'Conveyor Sync', minutes: 10 }] },
      throughputPerShift: [
        { shift: 'Shift A', count: 340 },
        { shift: 'Shift B', count: 355 },
        { shift: 'Shift C', count: 320 },
      ],
      hourlyData: hourlyData.map(d => ({ ...d, units: Math.max(0, d.units - 10) })),
    },
    quality: {
      fpy: 98.8, rty: 97.5, okCount: 1004, ngCount: 11, rejectionRate: 1.1, reworkRate: 0.8, scrapRate: 0.3,
      topRejectionReasons: [{ reason: 'Label Mismatch', count: 5 }, { reason: 'Housing Gap', count: 4 }, { reason: 'Glue Overspill', count: 2 }],
    },
    logs: generateLogs('BAT2'),
  },
  'Line-3': {
    lineId: 'Line-3',
    status: 'MAINTENANCE',
    timeRange: 'SHIFT',
    production: {
      planned: 800,
      actual: 0,
      inventory: 50,
      supplied: 0,
      cycleTime: [],
      oee: { availability: 0, performance: 0, quality: 0, overall: 0 },
      downtime: { planned: 480, unplanned: 0, reasons: [{ reason: 'Annual Maintenance', minutes: 480 }] },
      throughputPerShift: [],
      hourlyData: hourlyData.map(d => ({ ...d, units: 0 })),
    },
    quality: {
      fpy: 0, rty: 0, okCount: 0, ngCount: 0, rejectionRate: 0, reworkRate: 0, scrapRate: 0,
      topRejectionReasons: [],
    },
    logs: [],
  }
};
