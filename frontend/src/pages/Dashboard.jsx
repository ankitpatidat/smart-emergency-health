import React from 'react';

export default function Dashboard({ user, medicines, setCurrentPage }) {
  const total = medicines.length;
  const taken = medicines.filter(m => m.status === 'taken').length;
  const missed = medicines.filter(m => m.status === 'missed').length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-200">
        <h1 className="text-4xl font-black mb-2">Hi, {user.name.split(' ')[0]}! 👋</h1>
        <p className="text-blue-100 font-medium text-lg">Your User ID: <span className="font-mono bg-black/20 px-2 py-1 rounded-lg">{user.userId}</span></p>
      </div>

      {/* Stats - Bento Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center items-center">
          <p className="text-4xl font-black text-slate-800">{total}</p>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Total Meds</p>
        </div>
        <div className="bg-emerald-50 rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-center items-center">
          <p className="text-4xl font-black text-emerald-600">{taken}</p>
          <p className="text-sm font-bold text-emerald-600/70 uppercase tracking-widest mt-2">Taken</p>
        </div>
        <div className="bg-rose-50 rounded-3xl p-6 shadow-sm border border-rose-100 flex flex-col justify-center items-center">
          <p className="text-4xl font-black text-rose-600">{missed}</p>
          <p className="text-sm font-bold text-rose-600/70 uppercase tracking-widest mt-2">Missed</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { id: 'profile', icon: '📝', name: 'Profile', color: 'bg-purple-100 text-purple-700' },
          { id: 'qr', icon: '🔲', name: 'My QR', color: 'bg-indigo-100 text-indigo-700' },
          { id: 'reminder', icon: '💊', name: 'Reminders', color: 'bg-emerald-100 text-emerald-700' },
          { id: 'assistant', icon: '🤖', name: 'AI Bot', color: 'bg-orange-100 text-orange-700' },
        ].map(btn => (
          <button key={btn.id} onClick={() => setCurrentPage(btn.id)} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${btn.color}`}>{btn.icon}</div>
            <span className="font-bold text-slate-700">{btn.name}</span>
          </button>
        ))}
      </div>

      <button onClick={() => setCurrentPage('hospital')} className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-3xl p-6 shadow-lg shadow-rose-200 flex items-center justify-center gap-3 text-xl font-bold transition-all">
        <span>🚑</span> Find Emergency Hospitals
      </button>
    </div>
  );
}


// import React from 'react';

// export default function Dashboard({ user, medicines, setCurrentPage }) {
//   // Medicines ki stats calculate karna
//   const total = medicines.length;
//   const taken = medicines.filter(m => m.status === 'taken').length;
//   const missed = medicines.filter(m => m.status === 'missed').length;

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Hello, {user.name} 👋</h1>
//         <p className="text-gray-500">Age: {user.age} | User ID: {user.userId}</p>
//       </div>

//       {/* Stats Section */}
//       <h3 className="font-bold text-gray-700 mb-3">Medicine Stats</h3>
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-blue-100 p-4 rounded-xl text-center"><p className="text-2xl font-bold text-blue-600">{total}</p><p className="text-sm">Total</p></div>
//         <div className="bg-green-100 p-4 rounded-xl text-center"><p className="text-2xl font-bold text-green-600">{taken}</p><p className="text-sm">Taken</p></div>
//         <div className="bg-red-100 p-4 rounded-xl text-center"><p className="text-2xl font-bold text-red-600">{missed}</p><p className="text-sm">Missed</p></div>
//       </div>

//       {/* Quick Links */}
//       <h3 className="font-bold text-gray-700 mb-3">Quick Actions</h3>
//       <div className="grid grid-cols-2 gap-4">
//         <button onClick={() => setCurrentPage('profile')} className="bg-indigo-500 text-white py-4 rounded-xl font-bold shadow hover:bg-indigo-600">Profile</button>
//         <button onClick={() => setCurrentPage('qr')} className="bg-purple-500 text-white py-4 rounded-xl font-bold shadow hover:bg-purple-600">My QR</button>
//         <button onClick={() => setCurrentPage('reminder')} className="bg-green-500 text-white py-4 rounded-xl font-bold shadow hover:bg-green-600">Reminder</button>
//         <button onClick={() => setCurrentPage('assistant')} className="bg-orange-500 text-white py-4 rounded-xl font-bold shadow hover:bg-orange-600">AI Assistant</button>
//         <button onClick={() => setCurrentPage('hospital')} className="col-span-2 bg-red-500 text-white py-4 rounded-xl font-bold shadow hover:bg-red-600">Hospital Finder</button>
//       </div>
//     </div>
//   );
// }