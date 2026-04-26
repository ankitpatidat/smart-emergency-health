import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryApi from '../api/index';

export default function Profile({ user, setCurrentPage }) {
  const [formData, setFormData] = useState({
    dob: '', bloodGroup: '', allergies: '', diseases: '',
    contacts: [{ name: '', phone: '', relation: '' }]
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${SummaryApi.getProfile.url}/${user.userId}`);
        if (res.data && Object.keys(res.data).length > 0) setFormData(res.data);
      } catch (err) { console.log("New profile"); }
    };
    fetchProfile();
  }, [user.userId]);

  const handleContactChange = (index, field, value) => {
    const newContacts = [...formData.contacts];
    newContacts[index][field] = value;
    setFormData({ ...formData, contacts: newContacts });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: SummaryApi.saveProfile.method,
        url: SummaryApi.saveProfile.url,
        data: { ...formData, userId: user.userId }
      });
      alert("Medical Profile Updated in Database! 🔒");
      setCurrentPage('dashboard');
    } catch (err) { alert("Error saving profile"); }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
      <h2 className="text-3xl font-black text-slate-800 mb-8">Medical Profile</h2>
      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
            <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4 w-full" />
            <select value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4 w-full font-bold">
              <option value="">Blood Group</option><option>A+</option><option>O+</option><option>B+</option><option>AB+</option>
            </select>
        </div>
        <input placeholder="Allergies" value={formData.allergies} onChange={(e) => setFormData({...formData, allergies: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4 w-full" />
        <input placeholder="Diseases" value={formData.diseases} onChange={(e) => setFormData({...formData, diseases: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4 w-full" />
        
        <h3 className="text-sm font-bold text-slate-400 uppercase border-b pb-2">Emergency Contacts</h3>
        {formData.contacts.map((contact, index) => (
          <div key={index} className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-2xl border">
            <input required placeholder="Name" value={contact.name} onChange={(e)=>handleContactChange(index, 'name', e.target.value)} className="p-3 outline-none rounded-xl border bg-white" />
            <input required placeholder="Phone" value={contact.phone} onChange={(e)=>handleContactChange(index, 'phone', e.target.value)} className="p-3 outline-none rounded-xl border bg-white" />
            <input required placeholder="Relation" value={contact.relation} onChange={(e)=>handleContactChange(index, 'relation', e.target.value)} className="p-3 outline-none rounded-xl border bg-white" />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl">Save Profile Data</button>
      </form>
    </div>
  );
}


// import React, { useState } from 'react';

// export default function Profile({ user, profile, setProfiles, setCurrentPage }) {
//   // Fallback structure to prevent bugs
//   const defaultData = {
//     dob: '', bloodGroup: '', allergies: '', diseases: '',
//     contacts: [{ name: '', phone: '', relation: '' }]
//   };
  
//   const [formData, setFormData] = useState(profile || defaultData);

//   const handleContactChange = (index, field, value) => {
//     const newContacts = [...formData.contacts];
//     newContacts[index][field] = value;
//     setFormData({ ...formData, contacts: newContacts });
//   };

//   const addContact = () => {
//     setFormData({ ...formData, contacts: [...formData.contacts, { name: '', phone: '', relation: '' }] });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     // Profile save karna
//     setProfiles(prev => ({ ...prev, [user.userId]: formData }));
//     alert("Medical Profile Updated Securely! 🔒");
//     setCurrentPage('dashboard');
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
//       <h2 className="text-3xl font-black text-slate-800 mb-8">Medical Profile</h2>
      
//       <form onSubmit={handleSave} className="space-y-8">
//         {/* Basic Med Info */}
//         <div className="space-y-4">
//           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Vitals & History</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4 outline-none w-full" />
//             <select value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4 outline-none w-full font-bold">
//               <option value="">Blood Group</option>
//               <option>A+</option><option>O+</option><option>B+</option><option>AB+</option>
//             </select>
//           </div>
//           <input placeholder="Known Allergies (e.g. Peanuts)" value={formData.allergies} onChange={(e) => setFormData({...formData, allergies: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4 outline-none w-full" />
//           <input placeholder="Chronic Diseases (e.g. Diabetes)" value={formData.diseases} onChange={(e) => setFormData({...formData, diseases: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-xl p-4 outline-none w-full" />
//         </div>

//         {/* Emergency Contacts */}
//         <div className="space-y-4">
//           <div className="flex justify-between items-end border-b pb-2">
//             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Emergency Contacts</h3>
//             <button type="button" onClick={addContact} className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg text-sm">+ Add</button>
//           </div>
          
//           {formData.contacts.map((contact, index) => (
//             <div key={index} className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
//               <input required placeholder="Name" value={contact.name} onChange={(e)=>handleContactChange(index, 'name', e.target.value)} className="bg-white border rounded-xl p-3 outline-none" />
//               <input required placeholder="Phone" value={contact.phone} onChange={(e)=>handleContactChange(index, 'phone', e.target.value)} className="bg-white border rounded-xl p-3 outline-none" />
//               <input required placeholder="Relation" value={contact.relation} onChange={(e)=>handleContactChange(index, 'relation', e.target.value)} className="bg-white border rounded-xl p-3 outline-none" />
//             </div>
//           ))}
//         </div>

//         <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-lg">
//           Save Profile Data
//         </button>
//       </form>
//     </div>
//   );
// }


// import React, { useState } from 'react';

// export default function Profile({ profile, setProfile, setCurrentPage }) {
//   // Agar pehle se profile hai toh usko load karo, warna empty rakho
//   const [formData, setFormData] = useState(profile || {
//     fullName: '', dob: '', address: '', bloodGroup: '', diseases: '', allergies: '', medications: '', surgeries: ''
//   });
  
//   // Contacts ka dynamic array banaya hai
//   const [contacts, setContacts] = useState(profile?.contacts || [{ name: '', phone: '', relation: '' }]);

//   const handleContactChange = (index, field, value) => {
//     const newContacts = [...contacts];
//     newContacts[index][field] = value;
//     setContacts(newContacts);
//   };

//   const addContact = () => {
//     setContacts([...contacts, { name: '', phone: '', relation: '' }]);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     // App.jsx ke state me data save karo
//     setProfile({ ...formData, contacts });
//     alert("Profile saved successfully!");
//     setCurrentPage('dashboard');
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow-sm border mb-10">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Medical Profile</h2>
//       <form onSubmit={handleSave} className="flex flex-col gap-4">
        
//         {/* Personal Details */}
//         <h3 className="font-semibold text-blue-600">Personal Details</h3>
//         <input required type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="border p-3 rounded-lg" />
//         <input required type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="border p-3 rounded-lg" />
//         <textarea placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="border p-3 rounded-lg" />

//         {/* Medical Details */}
//         <h3 className="font-semibold text-blue-600 mt-4">Medical Data</h3>
//         <select value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="border p-3 rounded-lg">
//           <option value="">Select Blood Group</option>
//           <option>A+</option><option>O+</option><option>B+</option><option>AB+</option><option>A-</option><option>O-</option><option>B-</option><option>AB-</option>
//         </select>
//         <input type="text" placeholder="Diseases" value={formData.diseases} onChange={(e) => setFormData({...formData, diseases: e.target.value})} className="border p-3 rounded-lg" />
//         <input type="text" placeholder="Allergies" value={formData.allergies} onChange={(e) => setFormData({...formData, allergies: e.target.value})} className="border p-3 rounded-lg" />
//         <input type="text" placeholder="Current Medications" value={formData.medications} onChange={(e) => setFormData({...formData, medications: e.target.value})} className="border p-3 rounded-lg" />
//         <input type="text" placeholder="Past Surgeries" value={formData.surgeries} onChange={(e) => setFormData({...formData, surgeries: e.target.value})} className="border p-3 rounded-lg" />

//         {/* Emergency Contacts Array */}
//         <h3 className="font-semibold text-blue-600 mt-4">Emergency Contacts</h3>
//         {contacts.map((contact, index) => (
//           <div key={index} className="flex flex-col sm:flex-row gap-2 bg-gray-50 p-3 rounded-lg border">
//             <input required placeholder="Name" value={contact.name} onChange={(e)=>handleContactChange(index, 'name', e.target.value)} className="border p-2 rounded flex-1" />
//             <input required placeholder="Phone" value={contact.phone} onChange={(e)=>handleContactChange(index, 'phone', e.target.value)} className="border p-2 rounded flex-1" />
//             <input required placeholder="Relation" value={contact.relation} onChange={(e)=>handleContactChange(index, 'relation', e.target.value)} className="border p-2 rounded flex-1" />
//           </div>
//         ))}
//         <button type="button" onClick={addContact} className="text-blue-600 font-bold self-start text-sm bg-blue-50 px-3 py-1 rounded">
//           + Add Another Contact
//         </button>

//         <button type="submit" className="bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 mt-6">
//           Save Complete Profile
//         </button>
//       </form>
//     </div>
//   );
// }