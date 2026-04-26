import React, { useState } from 'react';
import axios from 'axios';
import SummaryApi from '../api/index';

export default function FetchProfile() {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      const res = await axios.get(`${SummaryApi.scanProfile.url}/${searchId}`);
      setResult(res.data); 
      setError('');
    } catch (err) {
      setResult(null);
      setError('No patient found with this ID.');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-rose-500 rounded-[2rem] p-8 text-white text-center">
        <h2 className="text-3xl font-black mb-2">Emergency Scanner</h2>
        <div className="flex gap-2 mt-6">
          <input type="text" placeholder="Enter Patient ID" className="flex-1 rounded-2xl px-5 py-4 text-slate-800 font-mono font-bold outline-none" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          <button onClick={handleFetch} className="bg-slate-900 text-white font-bold px-8 rounded-2xl">Search</button>
        </div>
      </div>
      {error && <div className="bg-white border-2 border-rose-100 text-rose-600 p-4 rounded-2xl text-center font-bold">{error}</div>}
      {result && (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-black mb-6 border-b pb-4">Patient File</h3>
          <p className="mb-2"><strong>Name:</strong> {result.user.name} | <strong>Age:</strong> {result.user.age}</p>
          {result.profile ? (
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 mt-4">
              <p><strong>Blood Group:</strong> <span className="text-rose-600 font-bold">{result.profile.bloodGroup}</span></p>
              <p><strong>Allergies:</strong> {result.profile.allergies || 'None'}</p>
            </div>
          ) : (
            <p className="text-yellow-600 mt-4 font-medium">Profile incomplete.</p>
          )}
        </div>
      )}
    </div>
  );
}

// import React, { useState } from 'react';

// export default function FetchProfile({ usersDb, profiles }) {
//   const [searchId, setSearchId] = useState('');
//   const [result, setResult] = useState(null); // { user, profile }
//   const [error, setError] = useState('');

//   const handleFetch = () => {
//     const foundUser = usersDb.find(u => u.userId === searchId);
//     if (foundUser) {
//       setResult({ user: foundUser, profile: profiles[searchId] || null });
//       setError('');
//     } else {
//       setResult(null);
//       setError('No patient found with this ID.');
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto space-y-6">
//       <div className="bg-rose-500 rounded-[2rem] p-8 text-white shadow-lg text-center">
//         <h2 className="text-3xl font-black mb-2">Emergency Scanner</h2>
//         <p className="text-rose-100 font-medium">Enter ID manually or scan QR</p>
        
//         <div className="flex gap-2 mt-6">
//           <input type="text" placeholder="Enter Patient ID" className="flex-1 rounded-2xl px-5 py-4 text-slate-800 font-mono font-bold outline-none" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
//           <button onClick={handleFetch} className="bg-slate-900 text-white font-bold px-8 rounded-2xl shadow hover:bg-black transition-colors">Search</button>
//         </div>
//       </div>

//       {error && <div className="bg-white border-2 border-rose-100 text-rose-600 p-4 rounded-2xl text-center font-bold">{error}</div>}

//       {result && (
//         <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 animate-fade-in">
//           <h3 className="text-2xl font-black text-slate-800 mb-6 border-b pb-4">Patient File</h3>
          
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div className="bg-slate-50 p-4 rounded-2xl border"><p className="text-xs font-bold text-slate-400 uppercase">Name</p><p className="font-bold text-lg">{result.user.name}</p></div>
//             <div className="bg-slate-50 p-4 rounded-2xl border"><p className="text-xs font-bold text-slate-400 uppercase">Age</p><p className="font-bold text-lg">{result.user.age}</p></div>
//           </div>

//           {result.profile ? (
//             <>
//               <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl mb-6">
//                 <p className="text-rose-500 font-bold uppercase text-xs tracking-widest mb-2">Critical Med Info</p>
//                 <p className="font-bold text-slate-800 mb-1">Blood Group: <span className="text-rose-600 text-xl">{result.profile.bloodGroup || 'N/A'}</span></p>
//                 <p className="font-medium text-slate-600">Allergies: {result.profile.allergies || 'None'}</p>
//                 <p className="font-medium text-slate-600">Diseases: {result.profile.diseases || 'None'}</p>
//               </div>

//               <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
//                 <p className="text-blue-500 font-bold uppercase text-xs tracking-widest mb-2">Emergency Contact</p>
//                 <p className="font-bold text-lg text-slate-800">{result.profile.contacts[0]?.name || 'N/A'}</p>
//                 <p className="font-bold text-blue-600">{result.profile.contacts[0]?.phone || 'N/A'}</p>
//                 <p className="text-sm text-slate-500 mt-1">Relation: {result.profile.contacts[0]?.relation || 'N/A'}</p>
//               </div>
//             </>
//           ) : (
//             <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200 text-yellow-700 font-bold text-center">
//               Detailed medical profile not completed by user yet.
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from 'react';

// export default function FetchProfile({ savedUser, savedProfile }) {
//   const [searchId, setSearchId] = useState('');
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(false);

//   const handleFetch = () => {
//     // Agar id match hui, tabhi data show karo
//     if (searchId === savedUser.userId) {
//       setData({ user: savedUser, profile: savedProfile });
//       setError(false);
//     } else {
//       setData(null);
//       setError(true);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-red-600">Scan / Fetch Profile</h2>
      
//       <div className="flex gap-2 mb-6">
//         <input 
//           type="text" 
//           placeholder="Enter User ID (e.g. user_123)" 
//           className="border p-3 rounded-xl flex-1 bg-white outline-red-500 shadow-sm"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//         />
//         <button onClick={handleFetch} className="bg-red-600 text-white font-bold px-6 rounded-xl shadow hover:bg-red-700">
//           Fetch
//         </button>
//       </div>

//       {error && <p className="text-red-500 font-bold bg-red-50 p-3 rounded-lg text-center">User not found!</p>}

//       {data && (
//         <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-red-100">
//           <h3 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">Patient Details</h3>
//           <p><strong>Name:</strong> {data.user.name}</p>
//           <p><strong>Age:</strong> {data.user.age} | <strong>Gender:</strong> {data.user.gender}</p>
          
//           <div className="mt-4 pt-4 border-t">
//             <h4 className="font-bold text-red-600 mb-2">Medical Highlights</h4>
//             <p><strong>Blood Group:</strong> <span className="text-red-500 font-bold">{data.profile?.bloodGroup || 'Not provided'}</span></p>
//             <p><strong>Allergies:</strong> {data.profile?.allergies || 'None'}</p>
//             <p><strong>Diseases:</strong> {data.profile?.diseases || 'None'}</p>
//           </div>

//           <div className="mt-4 pt-4 border-t bg-gray-50 p-3 rounded-lg">
//             <h4 className="font-bold text-gray-700 mb-2">Primary Emergency Contact</h4>
//             <p><strong>Name:</strong> {data.profile?.contacts?.[0]?.name || 'Not provided'}</p>
//             <p><strong>Phone:</strong> {data.profile?.contacts?.[0]?.phone || 'N/A'}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }