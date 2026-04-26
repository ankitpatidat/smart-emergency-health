import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryApi from '../api/index';
import MedicineCard from '../components/MedicineCard';

export default function Reminder({ user }) {
  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [dosage, setDosage] = useState('');

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${SummaryApi.medicines.url}/${user.userId}`);
      setMedicines(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchMedicines(); }, [user.userId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(SummaryApi.medicines.url, { userId: user.userId, name, time, dosage });
      fetchMedicines(); 
      setName(''); setTime(''); setDosage('');
    } catch (err) { alert("Failed to add medicine"); }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${SummaryApi.medicines.url}/${id}`, { status: newStatus });
      fetchMedicines(); 
    } catch (err) { alert("Update failed"); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-black text-slate-800 mb-6">Pill Tracker</h2>
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <input required placeholder="Medicine Name" value={name} onChange={(e)=>setName(e.target.value)} className="bg-slate-50 border rounded-2xl p-4 w-full" />
        <input required type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="bg-slate-50 border rounded-2xl p-4 w-full md:w-32" />
        <input required placeholder="Dosage" value={dosage} onChange={(e)=>setDosage(e.target.value)} className="bg-slate-50 border rounded-2xl p-4 w-full md:w-32" />
        <button type="submit" className="bg-blue-600 text-white w-full md:w-auto px-6 py-4 rounded-2xl font-bold">+ Add</button>
      </form>
      <div className="space-y-4">
        {medicines.map(med => (
          <MedicineCard key={med._id} medicine={{...med, id: med._id}} updateStatus={updateStatus} />
        ))}
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import MedicineCard from '../components/MedicineCard';

// export default function Reminder({ medicines, setMedicines }) {
//   const [name, setName] = useState('');
//   const [time, setTime] = useState('');
//   const [dosage, setDosage] = useState('');

//   const handleAdd = (e) => {
//     e.preventDefault();
//     const newMed = { id: Date.now(), name, time, dosage, status: 'pending' };
//     setMedicines([newMed, ...medicines]); // Naya medicine upar dikhega
//     setName(''); setTime(''); setDosage('');
//   };

//   const updateStatus = (id, newStatus) => {
//     setMedicines(medicines.map(med => med.id === id ? { ...med, status: newStatus } : med));
//     if (newStatus === 'missed') {
//       alert("⚠️ Alert SMS has been dispatched to emergency contact!");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-black text-slate-800">Pill Tracker</h2>
//       </div>

//       <form onSubmit={handleAdd} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
//         <input required placeholder="Medicine Name" value={name} onChange={(e)=>setName(e.target.value)} className="bg-slate-50 border rounded-2xl p-4 w-full outline-blue-500 font-bold" />
//         <input required type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="bg-slate-50 border rounded-2xl p-4 w-full md:w-32 outline-blue-500 font-bold" />
//         <input required placeholder="Dosage" value={dosage} onChange={(e)=>setDosage(e.target.value)} className="bg-slate-50 border rounded-2xl p-4 w-full md:w-32 outline-blue-500 font-bold" />
//         <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto px-6 py-4 rounded-2xl font-bold shadow-md transition-all whitespace-nowrap">
//           + Add
//         </button>
//       </form>

//       <div className="space-y-4">
//         {medicines.map(med => (
//           <MedicineCard key={med.id} medicine={med} updateStatus={updateStatus} />
//         ))}
//         {medicines.length === 0 && (
//           <div className="text-center p-10 bg-white rounded-3xl border border-dashed border-slate-300">
//             <p className="text-slate-400 font-bold text-lg">No medicines added yet. Stay healthy! 🍏</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import MedicineCard from '../components/MedicineCard';

// export default function Reminder({ medicines, setMedicines }) {
//   const [name, setName] = useState('');
//   const [time, setTime] = useState('');
//   const [dosage, setDosage] = useState('');

//   const handleAdd = (e) => {
//     e.preventDefault();
//     const newMed = { id: Date.now(), name, time, dosage, status: 'pending' };
//     setMedicines([...medicines, newMed]); // Array update
//     setName(''); setTime(''); setDosage(''); // Form clear
//   };

//   const updateStatus = (id, newStatus) => {
//     // Array ko map karo aur sirf us id ka status change karo
//     setMedicines(medicines.map(med => med.id === id ? { ...med, status: newStatus } : med));
    
//     // Alert logic
//     if (newStatus === 'missed') {
//       alert("⚠️ Alert sent to emergency contact: Patient missed medicine!");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">💊 Medicine Reminders</h2>

//       {/* Add Form */}
//       <form onSubmit={handleAdd} className="bg-white p-5 rounded-2xl shadow-sm border mb-6 flex flex-col gap-3">
//         <input required placeholder="Medicine Name" value={name} onChange={(e)=>setName(e.target.value)} className="border p-3 rounded-lg bg-gray-50 outline-blue-500" />
//         <div className="flex gap-3">
//           <input required type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="border p-3 rounded-lg bg-gray-50 outline-blue-500 flex-1" />
//           <input required placeholder="Dosage (e.g. 1 Pill)" value={dosage} onChange={(e)=>setDosage(e.target.value)} className="border p-3 rounded-lg bg-gray-50 outline-blue-500 flex-1" />
//         </div>
//         <button type="submit" className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow mt-2">
//           Add Medicine
//         </button>
//       </form>

//       {/* Medicine List */}
//       <div className="flex flex-col gap-4">
//         {medicines.map(med => (
//           <MedicineCard key={med.id} medicine={med} updateStatus={updateStatus} />
//         ))}
//         {medicines.length === 0 && <p className="text-gray-500 text-center">No medicines added.</p>}
//       </div>
//     </div>
//   );
// }
