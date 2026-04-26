import React from 'react';

export default function Navbar({ setCurrentPage, handleLogout, currentPage }) {
  const navLinks = [
    { id: 'dashboard', icon: '🏠', name: 'Home' },
    { id: 'profile', icon: '👤', name: 'Profile' },
    { id: 'qr', icon: '🔲', name: 'My QR' },
    { id: 'fetch', icon: '🔍', name: 'Scan' },
    { id: 'reminder', icon: '💊', name: 'Pills' },
    { id: 'assistant', icon: '🤖', name: 'AI Bot' },
    { id: 'hospital', icon: '🏥', name: 'Hospitals' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white shadow-sm p-4 flex gap-3 overflow-x-auto no-scrollbar">
      {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => setCurrentPage(link.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 ${
            currentPage === link.id 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 transform scale-105' 
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
          }`}
        >
          <span>{link.icon}</span>
          {link.name}
        </button>
      ))}
      <button 
        onClick={handleLogout} 
        className="ml-auto px-5 py-2.5 rounded-2xl font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all border border-rose-100">
        Logout
      </button>
    </nav>
  );
}




// import React from 'react';

// export default function Navbar({ setCurrentPage, setUser, currentPage }) {
//   // Buttons ki list banayi hai taaki map lagake render kar sakein
//   const navLinks = [
//     { id: 'dashboard', name: 'Dashboard' },
//     { id: 'profile', name: 'Profile' },
//     { id: 'qr', name: 'My QR' },
//     { id: 'fetch', name: 'Scan' },
//     { id: 'reminder', name: 'Reminders' },
//     { id: 'assistant', name: 'AI Bot' },
//     { id: 'hospital', name: 'Hospitals' },
//   ];

//   const handleLogout = () => {
//     setUser(null); // User state clear karo
//     setCurrentPage('register'); // Wapas register page pe bhejo
//   };

//   return (
//     <nav className="bg-white shadow-md p-4 flex gap-3 overflow-x-auto whitespace-nowrap sticky top-0 z-50">
//       {navLinks.map((link) => (
//         <button
//           key={link.id}
//           onClick={() => setCurrentPage(link.id)}
//           className={`px-4 py-2 rounded-full font-semibold transition-all ${
//             currentPage === link.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//           }`}
//         >
//           {link.name}
//         </button>
//       ))}
//       <button onClick={handleLogout} className="px-4 py-2 rounded-full font-semibold bg-red-100 text-red-600 hover:bg-red-200 ml-auto">
//         Logout
//       </button>
//     </nav>
//   );
// }