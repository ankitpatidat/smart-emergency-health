import React from 'react';

export default function HospitalCard({ hospital }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-extrabold text-xl text-slate-800">{hospital.name}</h3>
        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
          📍 {hospital.distance}
        </span>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Beds</p>
          <p className="font-black text-lg text-slate-700">{hospital.beds}</p>
        </div>
        <div className={`flex-1 p-3 rounded-2xl text-center border ${hospital.icu ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
          <p className="text-xs uppercase font-bold mb-1 opacity-70">ICU Status</p>
          <p className={`font-black text-lg ${hospital.icu ? 'text-emerald-600' : 'text-rose-600'}`}>
            {hospital.icu ? 'Available' : 'Full'}
          </p>
        </div>
      </div>

      <button onClick={() => alert(`Check-in successful at ${hospital.name}!`)} className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-2xl shadow-md transition-all">
        Send Emergency Data
      </button>
    </div>
  );
}



// import React from 'react';

// export default function HospitalCard({ hospital }) {
//   const handleCheckIn = () => {
//     alert(`Check-in successful at ${hospital.name}. No form needed!`);
//   };

//   return (
//     <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
//       <h3 className="font-bold text-xl text-gray-800 mb-1">{hospital.name}</h3>
//       <div className="flex justify-between text-gray-600 text-sm mb-4">
//         <p>🚗 Distance: <span className="font-bold">{hospital.distance}</span></p>
//         <p>🛏️ Beds: <span className="font-bold">{hospital.beds}</span></p>
//         <p>🏥 ICU: <span className={hospital.icu ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
//           {hospital.icu ? 'Available' : 'Full'}
//         </span></p>
//       </div>
//       <button 
//         onClick={handleCheckIn}
//         className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl shadow transition-all">
//         Send My Data
//       </button>
//     </div>
//   );
// }