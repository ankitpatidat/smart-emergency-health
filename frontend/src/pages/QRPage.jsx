import React from 'react';
import QRCode from 'react-qr-code';

export default function QRPage({ user }) {
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 text-center relative overflow-hidden">
        {/* Ticket design cutout effect */}
        <div className="absolute top-1/2 -left-6 w-12 h-12 bg-gray-50 rounded-full"></div>
        <div className="absolute top-1/2 -right-6 w-12 h-12 bg-gray-50 rounded-full"></div>

        <h2 className="text-3xl font-black text-slate-800 mb-2">Emergency Pass</h2>
        <p className="text-slate-500 font-medium mb-8">Scan to access medical records</p>
        
        <div className="bg-white p-6 rounded-3xl border-4 border-blue-50 inline-block shadow-sm mb-8">
          <QRCode value={user.userId} size={200} fgColor="#1e293b" />
        </div>
        
        <div className="border-t-2 border-dashed border-slate-200 pt-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">User ID</p>
          <p className="text-2xl font-mono font-black text-blue-600 tracking-wider">{user.userId}</p>
        </div>
      </div>
    </div>
  );
}


// import React from 'react';
// import QRCode from 'react-qr-code';

// export default function QRPage({ user }) {
//   return (
//     <div className="max-w-sm mx-auto mt-10 flex flex-col items-center">
//       <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center w-full">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Emergency QR</h2>
        
//         {/* react-qr-code library ka use karke id ka QR banaya hai */}
//         <div className="bg-gray-50 p-4 rounded-xl border flex justify-center mb-6">
//           <QRCode value={user.userId} size={180} />
//         </div>
        
//         <p className="text-gray-500 text-sm">Scan to fetch medical details</p>
//         <div className="mt-4 bg-blue-50 text-blue-800 font-mono font-bold py-2 rounded-lg text-lg">
//           {user.userId}
//         </div>
//       </div>
//     </div>
//   );
// }