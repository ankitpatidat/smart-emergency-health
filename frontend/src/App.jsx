import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import MedicineCard from './components/MedicineCard';
import HospitalCard from './components/HospitalCard';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import QRPage from './pages/QRPage';
import FetchProfile from './pages/FetchProfile';
import Reminder from './pages/Reminder';
import Assistant from './pages/Assistant';
import Hospital from './pages/Hospital';

export default function App() {
  // LOCAL STORAGE LOGIC (Page refresh hone par data bacha rahega)
  const [usersDb, setUsersDb] = useState(() => JSON.parse(localStorage.getItem('usersDb')) || []);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);
  const [profiles, setProfiles] = useState(() => JSON.parse(localStorage.getItem('profiles')) || {});
  
  const [currentPage, setCurrentPage] = useState(currentUser ? 'dashboard' : 'login');
  
  const [medicines, setMedicines] = useState(() => JSON.parse(localStorage.getItem('medicines')) || []);

  // Jab bhi data change ho, Local Storage me save kar do
  useEffect(() => { localStorage.setItem('usersDb', JSON.stringify(usersDb)); }, [usersDb]);
  useEffect(() => { localStorage.setItem('currentUser', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('profiles', JSON.stringify(profiles)); }, [profiles]);
  useEffect(() => { localStorage.setItem('medicines', JSON.stringify(medicines)); }, [medicines]);

  // Auth Handle karne ke functions
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  // Agar user logged in nahi hai, toh Register ya Login dikhao
  if (!currentUser) {
    if (currentPage === 'register') {
      return <Register usersDb={usersDb} setUsersDb={setUsersDb} setCurrentPage={setCurrentPage} />;
    }
    return <Login usersDb={usersDb} setCurrentUser={setCurrentUser} setCurrentPage={setCurrentPage} />;
  }

  // Current user ki profile fetch karo
  const currentProfile = profiles[currentUser.userId] || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-10 font-sans text-slate-800">
      <Navbar setCurrentPage={setCurrentPage} handleLogout={handleLogout} currentPage={currentPage} />

      <div className="pt-6 px-4 max-w-5xl mx-auto transition-all duration-300">
        {currentPage === 'dashboard' && <Dashboard user={currentUser} medicines={medicines} setCurrentPage={setCurrentPage} />}
        {currentPage === 'profile' && <Profile user={currentUser} profile={currentProfile} setProfiles={setProfiles} setCurrentPage={setCurrentPage} />}
        {currentPage === 'qr' && <QRPage user={currentUser} />}
        {currentPage === 'fetch' && <FetchProfile usersDb={usersDb} profiles={profiles} />}
        {currentPage === 'reminder' && <Reminder medicines={medicines} setMedicines={setMedicines} />}
        {currentPage === 'assistant' && <Assistant />}
        {currentPage === 'hospital' && <Hospital />}
      </div>
    </div>
  );
}








// import React, { useState } from 'react';

// // Components Import
// import Navbar from './components/Navbar';

// // Pages Import
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import QRPage from './pages/QRPage';
// import FetchProfile from './pages/FetchProfile';
// import Reminder from './pages/Reminder';
// import Assistant from './pages/Assistant';
// import Hospital from './pages/Hospital';

// export default function App() {
//   // GLOBAL STATES - Ye states pure app mein use hongi
//   const [currentPage, setCurrentPage] = useState('register'); // Navigation ke liye
//   const [user, setUser] = useState(null); // Basic Info (Name, ID, etc)
//   const [profile, setProfile] = useState(null); // Detailed Medical Info
  
//   // Dummy Data for medicines initially
//   const [medicines, setMedicines] = useState([
//     { id: 1, name: 'Paracetamol', time: '08:00', dosage: '1 Tablet', status: 'pending' },
//     { id: 2, name: 'Vitamin C', time: '13:00', dosage: '1 Gummy', status: 'taken' }
//   ]);

//   // Agar user login/register nahi hai, toh Register page dikhao
//   if (!user) {
//     return <Register setUser={setUser} setCurrentPage={setCurrentPage} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-10">
//       {/* Navbar sabhi pages pe dikhega */}
//       <Navbar setCurrentPage={setCurrentPage} setUser={setUser} currentPage={currentPage} />

//       {/* State-based Navigation (Switching pages based on currentPage value) */}
//       <div className="pt-4 px-2">
//         {currentPage === 'dashboard' && <Dashboard user={user} medicines={medicines} setCurrentPage={setCurrentPage} />}
//         {currentPage === 'profile' && <Profile profile={profile} setProfile={setProfile} setCurrentPage={setCurrentPage} />}
//         {currentPage === 'qr' && <QRPage user={user} />}
//         {currentPage === 'fetch' && <FetchProfile savedUser={user} savedProfile={profile} />}
//         {currentPage === 'reminder' && <Reminder medicines={medicines} setMedicines={setMedicines} />}
//         {currentPage === 'assistant' && <Assistant />}
//         {currentPage === 'hospital' && <Hospital />}
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import QRCode from 'react-qr-code';

// export default function App() {
//   const [currentPage, setCurrentPage] = useState('register');
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [medicines, setMedicines] = useState([]);

//   // --- PREMIUM NAVBAR (Scrollable & Active States) ---
//   const NavBar = () => {
//     const navItems = [
//       { id: 'dashboard', label: '🏠 Dashboard' },
//       { id: 'profile', label: '👤 Profile' },
//       { id: 'qr', label: '🔲 My QR' },
//       { id: 'fetch', label: '🔍 Scan' },
//       { id: 'medicine', label: '💊 Medicines' },
//       { id: 'ai', label: '🤖 AI Bot' },
//       { id: 'hospital', label: '🏥 Hospitals' },
//     ];

//     return (
//       <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 p-4 flex gap-3 overflow-x-auto shadow-sm no-scrollbar">
//         {navItems.map(item => (
//           <button
//             key={item.id}
//             onClick={() => setCurrentPage(item.id)}
//             className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all duration-300 ${
//               currentPage === item.id 
//               ? 'bg-indigo-600 text-white shadow-md transform scale-105' 
//               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {item.label}
//           </button>
//         ))}
//         <button 
//           onClick={() => { setUser(null); setCurrentPage('register'); }} 
//           className="whitespace-nowrap px-4 py-2 rounded-full font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all ml-auto"
//         >
//           Logout
//         </button>
//       </div>
//     );
//   };

//   // ==========================================
//   // PAGE 1: REGISTER PAGE (Modern Card & Gradients)
//   // ==========================================
//   const RegisterPage = () => {
//     const [formData, setFormData] = useState({ name: '', mobile: '', password: '', gender: 'Male', age: '' });

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       setUser({ ...formData, userId: "user_" + Date.now() });
//       setCurrentPage('dashboard');
//     };

//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4">
//         <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-white">
//           <div className="text-center mb-8">
//             <h1 className="text-4xl mb-2">🏥</h1>
//             <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
//               Smart Health
//             </h2>
//             <p className="text-gray-500 text-sm mt-1">Your Emergency Medical Companion</p>
//           </div>
          
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <input required type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all bg-gray-50"
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//             <input required type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all bg-gray-50"
//               onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
//             <input required type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all bg-gray-50"
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            
//             <div className="flex gap-4">
//               <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50" 
//                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
//                 <option>Male</option><option>Female</option><option>Other</option>
//               </select>
//               <input required type="number" placeholder="Age" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                 onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
//             </div>

//             <button type="submit" className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all transform hover:-translate-y-0.5">
//               Create Account
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   // ==========================================
//   // PAGE 2: DASHBOARD (Widgets UI)
//   // ==========================================
//   const Dashboard = () => {
//     const totalMeds = medicines.length;
//     const takenMeds = medicines.filter(m => m.status === 'taken').length;
//     const missedMeds = medicines.filter(m => m.status === 'missed').length;

//     return (
//       <div className="p-6 max-w-lg mx-auto animate-fade-in">
//         <div className="mb-8">
//           <h2 className="text-3xl font-extrabold text-gray-800">Hi, {user.name.split(' ')[0]} 👋</h2>
//           <p className="text-gray-500 font-medium mt-1">ID: <span className="text-indigo-500 font-mono">{user.userId}</span></p>
//         </div>

//         {/* Medicine Summary Cards */}
//         <h3 className="font-bold text-gray-700 mb-3">Today's Overview</h3>
//         <div className="grid grid-cols-3 gap-4 mb-8">
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200 text-center shadow-sm">
//             <p className="text-2xl font-black text-blue-700">{totalMeds}</p>
//             <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mt-1">Total</p>
//           </div>
//           <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200 text-center shadow-sm">
//             <p className="text-2xl font-black text-green-700">{takenMeds}</p>
//             <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mt-1">Taken</p>
//           </div>
//           <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-2xl border border-red-200 text-center shadow-sm">
//             <p className="text-2xl font-black text-red-700">{missedMeds}</p>
//             <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mt-1">Missed</p>
//           </div>
//         </div>

//         {/* Quick Actions Grid */}
//         <h3 className="font-bold text-gray-700 mb-3">Quick Actions</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <button onClick={() => setCurrentPage('profile')} className="flex flex-col items-center justify-center gap-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all">
//             <span className="text-3xl">📝</span>
//             <span className="font-semibold text-gray-700">Profile</span>
//           </button>
//           <button onClick={() => setCurrentPage('qr')} className="flex flex-col items-center justify-center gap-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all">
//             <span className="text-3xl">🔲</span>
//             <span className="font-semibold text-gray-700">My QR</span>
//           </button>
//           <button onClick={() => setCurrentPage('medicine')} className="flex flex-col items-center justify-center gap-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
//             <span className="text-3xl">💊</span>
//             <span className="font-semibold text-gray-700">Reminders</span>
//           </button>
//           <button onClick={() => setCurrentPage('ai')} className="flex flex-col items-center justify-center gap-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all">
//             <span className="text-3xl">🤖</span>
//             <span className="font-semibold text-gray-700">AI Bot</span>
//           </button>
//           <button onClick={() => setCurrentPage('hospital')} className="col-span-2 flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-rose-600 text-white p-5 rounded-2xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all">
//             <span className="text-2xl">🚑</span>
//             <span className="font-bold text-lg">Emergency Hospitals</span>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // ==========================================
//   // OTHERS PAGES (Cleaned up similarly)
//   // ==========================================
//   const QRCodePage = () => (
//     <div className="p-6 max-w-sm mx-auto text-center flex flex-col items-center mt-8">
//       <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Scan to Fetch Data</h2>
//         <div className="bg-gray-50 p-4 rounded-2xl flex justify-center border border-gray-200 mb-6">
//           <QRCode value={user.userId} size={180} />
//         </div>
//         <div className="bg-indigo-50 rounded-xl p-3">
//           <p className="text-sm text-indigo-800 font-medium">Your Unique ID</p>
//           <p className="font-mono font-bold text-xl text-indigo-600 tracking-wider mt-1">{user.userId}</p>
//         </div>
//       </div>
//     </div>
//   );

//   const MedicineReminderPage = () => {
//     const [medName, setMedName] = useState('');
//     const [medTime, setMedTime] = useState('');
//     const [medDosage, setMedDosage] = useState('');

//     const addMedicine = (e) => {
//       e.preventDefault();
//       setMedicines([...medicines, { id: Date.now(), name: medName, time: medTime, dosage: medDosage, status: 'pending' }]);
//       setMedName(''); setMedTime(''); setMedDosage('');
//     };

//     return (
//       <div className="p-6 max-w-lg mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">💊 Medicine Tracker</h2>
        
//         <form onSubmit={addMedicine} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col gap-4">
//           <input required type="text" placeholder="Medicine Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none" value={medName} onChange={(e)=>setMedName(e.target.value)} />
//           <div className="flex gap-4">
//             <input required type="time" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none" value={medTime} onChange={(e)=>setMedTime(e.target.value)} />
//             <input required type="text" placeholder="Dosage" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none" value={medDosage} onChange={(e)=>setMedDosage(e.target.value)} />
//           </div>
//           <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition-all">Add Medicine</button>
//         </form>

//         <div className="flex flex-col gap-4">
//           {medicines.map(med => (
//             <div key={med.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
//               <div>
//                 <h4 className="font-bold text-lg text-gray-800">{med.name}</h4>
//                 <p className="text-sm font-medium text-gray-500 mt-1">🕒 {med.time} • 💊 {med.dosage}</p>
//               </div>
//               {med.status === 'pending' ? (
//                 <div className="flex gap-2">
//                   <button onClick={() => setMedicines(medicines.map(m => m.id === med.id ? { ...m, status: 'taken' } : m))} className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-xl font-bold text-sm transition-all">Take</button>
//                   <button onClick={() => setMedicines(medicines.map(m => m.id === med.id ? { ...m, status: 'missed' } : m))} className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl font-bold text-sm transition-all">Miss</button>
//                 </div>
//               ) : (
//                 <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${med.status === 'taken' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                   {med.status.toUpperCase()}
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const AIAssistantPage = () => {
//     const [chat, setChat] = useState([{ sender: 'bot', text: 'Hello! I am your AI Health Assistant 🤖. How can I help you today?' }]);
//     const [input, setInput] = useState('');

//     const handleSend = () => {
//       if(!input.trim()) return;
//       setChat([...chat, { sender: 'user', text: input }]);
//       setInput('');
//       setTimeout(() => {
//         setChat(prev => [...prev, { sender: 'bot', text: "I'm a prototype AI. For real medical advice, please consult a doctor. Stay hydrated! 💧" }]);
//       }, 1000);
//     };

//     return (
//       <div className="p-6 max-w-lg mx-auto flex flex-col h-[85vh]">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">🤖 AI Assistant</h2>
//         <div className="flex-1 bg-white p-5 rounded-3xl shadow-sm border border-gray-100 overflow-y-auto flex flex-col gap-4 mb-4">
//           {chat.map((msg, i) => (
//             <div key={i} className={`p-4 rounded-2xl max-w-[80%] text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white self-end rounded-br-none shadow-md' : 'bg-gray-100 text-gray-800 self-start rounded-bl-none'}`}>
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-3 bg-white p-2 rounded-full shadow-sm border border-gray-200">
//           <input type="text" placeholder="Type your symptoms..." className="flex-1 bg-transparent px-4 py-2 outline-none" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
//           <button onClick={handleSend} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-bold shadow-md transition-all">Send</button>
//         </div>
//       </div>
//     );
//   };

//   // Remaining pages (Profile, Fetch, Hospital) logic remains the same, just keeping it neat for brevity in this Premium version.
//   // We'll show a simple placeholder for them so the app doesn't break.
//   const PlaceholderPage = ({ title }) => (
//     <div className="p-6 max-w-lg mx-auto text-center mt-20">
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">{title} Page</h2>
//       <p className="text-gray-500">Same logic as before, just apply the new classes!</p>
//       <button onClick={() => setCurrentPage('dashboard')} className="mt-6 bg-indigo-100 text-indigo-700 px-6 py-2 rounded-full font-bold hover:bg-indigo-200">Back to Dashboard</button>
//     </div>
//   );

//   if (!user) return <RegisterPage />;

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-10">
//       <NavBar />
//       <div className="mt-2 transition-all duration-300">
//         {currentPage === 'dashboard' && <Dashboard />}
//         {currentPage === 'profile' && <PlaceholderPage title="Complete Profile" />}
//         {currentPage === 'qr' && <QRCodePage />}
//         {currentPage === 'fetch' && <PlaceholderPage title="Fetch Profile" />}
//         {currentPage === 'medicine' && <MedicineReminderPage />}
//         {currentPage === 'ai' && <AIAssistantPage />}
//         {currentPage === 'hospital' && <PlaceholderPage title="Hospital Finder" />}
//       </div>
//     </div>
//   );
// }


