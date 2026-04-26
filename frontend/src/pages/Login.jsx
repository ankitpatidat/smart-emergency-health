import React, { useState } from 'react';
import axios from 'axios';
import SummaryApi from '../api/index';

export default function Login({ setCurrentUser, setCurrentPage }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: SummaryApi.login.method,
        url: SummaryApi.login.url,
        data: { phone, password }
      });
      setCurrentUser(response.data.user);
      setCurrentPage('dashboard');
    } catch (err) {
      setError(err.response?.data?.error || "Login Failed! Server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-black text-slate-800 text-center mb-8">Welcome Back</h2>
        {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-xl mb-6 text-center font-bold text-sm">{error}</div>}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input required type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-50 ring-1 ring-slate-200 rounded-2xl px-5 py-4 outline-none" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 ring-1 ring-slate-200 rounded-2xl px-5 py-4 outline-none" />
          <button type="submit" className="mt-2 w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg">Login Now</button>
        </form>
        <p className="text-center mt-8 text-slate-500 font-medium">New here? <button onClick={() => setCurrentPage('register')} className="text-blue-600 font-bold">Create Account</button></p>
      </div>
    </div>
  );
}






// import React, { useState } from 'react';

// export default function Login({ usersDb, setCurrentUser, setCurrentPage }) {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Database me user check karo
//     const foundUser = usersDb.find(u => u.phone === phone && u.password === password);
    
//     if (foundUser) {
//       setCurrentUser(foundUser);
//       setCurrentPage('dashboard');
//     } else {
//       setError("Invalid phone number or password!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-white">
//         <div className="text-center mb-8">
//           <div className="text-5xl mb-4">🏥</div>
//           <h2 className="text-3xl font-black text-slate-800">Welcome Back</h2>
//           <p className="text-slate-500 mt-2">Login to access your medical dashboard</p>
//         </div>

//         {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-xl mb-6 text-center font-bold text-sm border border-rose-100">{error}</div>}

//         <form onSubmit={handleLogin} className="flex flex-col gap-5">
//           <input required type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
//             className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 rounded-2xl px-5 py-4 outline-none transition-all" />
          
//           <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
//             className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 rounded-2xl px-5 py-4 outline-none transition-all" />
          
//           <button type="submit" className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all">
//             Login Now
//           </button>
//         </form>

//         <p className="text-center mt-8 text-slate-500 font-medium">
//           New here? <button onClick={() => setCurrentPage('register')} className="text-blue-600 font-bold hover:underline">Create Account</button>
//         </p>
//       </div>
//     </div>
//   );
// }