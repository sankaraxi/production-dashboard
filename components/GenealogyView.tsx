
import React, { useState } from 'react';

const MOCK_GENEALOGY = {
  batterySerialNo: 'BAT-IND-2024-000123',
  model: '48V Lithium-Ion Pack',
  productionOrderNo: 'PRD-45001234',
  assemblyLine: 'Line-2',
  shiftDateTime: 'Shift-B / 10-Jan-2026 / 14:32',
  finalQCStatus: 'PASS',
  subAssemblies: [
    { name: 'Cell Module', serialBatch: 'CM-BAT-0923', supplier: 'ABC Cells Pvt Ltd' },
    { name: 'BMS', serialBatch: 'BMS-778899', supplier: 'XYZ Electronics' },
    { name: 'Wiring Harness', serialBatch: 'WH-4567', supplier: 'LMN Auto' },
    { name: 'Cooling Plate', serialBatch: 'CP-8899', supplier: 'ThermoTech' }
  ],
  rawMaterials: [
    { name: 'Cells', batchLot: 'CELL-B-0923', supplier: 'ABC Cells Pvt Ltd', expiryDate: '30-Dec-2027' },
    { name: 'Electrolyte', batchLot: 'EL-5566', supplier: 'ChemSource Ltd', expiryDate: '15-Aug-2026' },
    { name: 'Adhesive', batchLot: 'ADH-8890', supplier: 'BondIt Chemicals', expiryDate: '10-Jul-2026' },
    { name: 'Fasteners', batchLot: 'FST-3322', supplier: 'FastenPro', expiryDate: 'NA' }
  ],
  procurement: {
    supplierCode: 'SUP-10234',
    supplierName: 'ABC Cells Pvt Ltd',
    poNumber: '4500012345',
    asnNumber: 'ASN-987654',
    grnNumber: '5000456789',
    qualityInspectionLot: 'QL-332211'
  },
  processHistory: [
    { station: 'S01', operation: 'Cell Welding', parameters: 'Voltage: 3.65V', result: 'OK', timestamp: '10-Jan-2026 13:10' },
    { station: 'S03', operation: 'Module Assembly', parameters: 'Torque: 6Nm', result: 'OK', timestamp: '10-Jan-2026 13:45' },
    { station: 'S05', operation: 'Final Testing', parameters: 'Pack Voltage: 48.2V', result: 'OK', timestamp: '10-Jan-2026 14:25' }
  ],
  ncrCapa: {
    ncrNo: 'NCR-2024-014',
    description: 'Voltage deviation at initial test',
    rootCause: 'Loose terminal connection',
    capaRef: 'CAPA-2024-009',
    disposition: 'Reworked and Accepted'
  }
};

export const GenealogyView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const report = MOCK_GENEALOGY;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Genealogy Traceability Report</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">End-to-End Battery Life Cycle Data</p>
        </div>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Enter Battery Serial No (e.g. BAT-IND-2024...)" 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section 1: Finished Battery Details */}
        <div className="lg:col-span-1 bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">1. Finished Battery Details</h3>
          <div className="space-y-4">
            {[
              { label: 'Battery Serial No', val: report.batterySerialNo, isHighlight: true },
              { label: 'Model / Variant', val: report.model },
              { label: 'Production Order No', val: report.productionOrderNo },
              { label: 'Assembly Line', val: report.assemblyLine },
              { label: 'Shift / Date / Time', val: report.shiftDateTime },
            ].map((d, i) => (
              <div key={i} className="flex justify-between items-start">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">{d.label}</span>
                <span className={`text-sm font-black text-right ${d.isHighlight ? 'text-indigo-600' : 'text-slate-900'}`}>{d.val}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">Final QC Status</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest">{report.finalQCStatus}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Supplier & Procurement Reference */}
        <div className="lg:col-span-2 bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">4. Supplier & Procurement Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 flex-1">
            {[
              { label: 'Supplier Code', val: report.procurement.supplierCode },
              { label: 'Supplier Name', val: report.procurement.supplierName },
              { label: 'PO Number', val: report.procurement.poNumber },
              { label: 'ASN Number', val: report.procurement.asnNumber },
              { label: 'GRN Number', val: report.procurement.grnNumber },
              { label: 'Quality Inspection Lot', val: report.procurement.qualityInspectionLot },
            ].map((d, i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">{d.label}</span>
                <span className="text-sm font-black text-slate-900">{d.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 2: Sub-Assembly Traceability */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50/50 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">2. Sub-Assembly Traceability</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100">
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sub-Assembly</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Serial / Batch No</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {report.subAssemblies.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-slate-700">{item.name}</td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-indigo-600">{item.serialBatch}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-900">{item.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Raw Material Traceability */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50/50 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">3. Raw Material Traceability</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100">
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Material</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch / Lot No</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Supplier</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {report.rawMaterials.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-slate-700">{item.name}</td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-indigo-600">{item.batchLot}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-900">{item.supplier}</td>
                  <td className="px-6 py-4 text-[10px] font-black text-slate-400">{item.expiryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 5: Process & Quality History */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-7 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">5. Process & Quality History</h3>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Line-2 Sequence</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/30 border-b border-slate-100">
              <th className="px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Station No</th>
              <th className="px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operation</th>
              <th className="px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Parameters</th>
              <th className="px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Result</th>
              <th className="px-7 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {report.processHistory.map((h, i) => (
              <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-7 py-5 text-sm font-black text-slate-800">{h.station}</td>
                <td className="px-7 py-5 text-sm font-bold text-slate-700">{h.operation}</td>
                <td className="px-7 py-5 text-xs font-mono font-bold text-indigo-500">{h.parameters}</td>
                <td className="px-7 py-5">
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${h.result === 'OK' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                    {h.result}
                  </span>
                </td>
                <td className="px-7 py-5 text-[11px] font-bold text-slate-400 uppercase">{h.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 6: NCR / CAPA Reference (If Applicable) */}
      {report.ncrCapa && (
        <div className="bg-rose-50/50 border-2 border-rose-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-rose-600 rounded-2xl text-white shadow-lg shadow-rose-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-rose-800 tracking-tight">6. NCR / CAPA Reference</h3>
              <p className="text-[10px] text-rose-600 font-bold uppercase tracking-widest">Quality Deviation Flagged</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: 'NCR No', val: report.ncrCapa.ncrNo },
              { label: 'Defect Description', val: report.ncrCapa.description },
              { label: 'Root Cause', val: report.ncrCapa.rootCause },
              { label: 'CAPA Reference', val: report.ncrCapa.capaRef },
              { label: 'Disposition', val: report.ncrCapa.disposition },
            ].map((d, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest">{d.label}</p>
                <p className="text-sm font-black text-slate-900">{d.val}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
