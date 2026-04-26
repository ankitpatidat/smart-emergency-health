import React from 'react';

export default function MedicineCard({ medicine, updateStatus }) {
  const isPending = medicine.status === 'pending';
  const isTaken = medicine.status === 'taken';

  return (
    <div className={`p-5 rounded-3xl border shadow-sm transition-all hover:-translate-y-1 ${
      isPending ? 'bg-white border-slate-200' : 
      isTaken ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-xl text-slate-800">{medicine.name}</h4>
          <p className="text-slate-500 font-medium mt-1">🕒 {medicine.time} &nbsp;•&nbsp; 💊 {medicine.dosage}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          isPending ? 'bg-slate-100 text-slate-500' : 
          isTaken ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
        }`}>
          {medicine.status}
        </span>
      </div>

      {isPending && (
        <div className="flex gap-3">
          <button onClick={() => updateStatus(medicine.id, 'taken')} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-bold shadow-md transition-colors">
            Take Pill
          </button>
          <button onClick={() => updateStatus(medicine.id, 'missed')} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-xl font-bold shadow-md transition-colors">
            Missed
          </button>
        </div>
      )}
    </div>
  );
}


// import React from 'react';

// export default function MedicineCard({ medicine, updateStatus }) {
//   // Status ke hisaab se card ka background color decide karo
//   const bgColors = {
//     pending: 'bg-white border-gray-200',
//     taken: 'bg-green-50 border-green-300',
//     missed: 'bg-red-50 border-red-300'
//   };

//   return (
//     <div className={`p-4 rounded-xl border shadow-sm flex justify-between items-center ${bgColors[medicine.status]}`}>
//       <div>
//         <h4 className="font-bold text-lg text-gray-800">{medicine.name}</h4>
//         <p className="text-gray-600 text-sm">Time: {medicine.time} | Dosage: {medicine.dosage}</p>
//         <span className="text-xs font-bold uppercase mt-1 inline-block text-gray-500">Status: {medicine.status}</span>
//       </div>

//       {/* Sirf pending medicines pe buttons dikhao */}
//       {medicine.status === 'pending' && (
//         <div className="flex gap-2 flex-col sm:flex-row">
//           <button 
//             onClick={() => updateStatus(medicine.id, 'taken')} 
//             className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-green-600">
//             Taken
//           </button>
//           <button 
//             onClick={() => updateStatus(medicine.id, 'missed')} 
//             className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-red-600">
//             Missed
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }