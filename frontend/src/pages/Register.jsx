import React, { useState } from 'react';
import axios from 'axios';
import SummaryApi from '../api/index';

export default function Register({ setCurrentPage }) {
  const [formData, setFormData] = useState({ name: '', phone: '', password: '', age: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: SummaryApi.register.method,
        url: SummaryApi.register.url,
        data: formData
      });
      alert("Account created successfully! Please login.");
      setCurrentPage('login');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Create Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <input required placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-2xl px-5 py-4 outline-none" />
          <input required type="tel" placeholder="Phone Number" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-2xl px-5 py-4 outline-none" />
          <input required type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-2xl px-5 py-4 outline-none" />
          <input required type="number" placeholder="Age" onChange={(e) => setFormData({...formData, age: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 rounded-2xl px-5 py-4 outline-none" />
          <button type="submit" className="mt-4 w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg">Sign Up</button>
        </form>
        <p className="text-center mt-6 text-slate-500 font-medium">Already have an account? <button onClick={() => setCurrentPage('login')} className="text-blue-600 font-bold">Login</button></p>
      </div>
    </div>
  );
}



// import React, { useState } from 'react';

// export default function Register({ usersDb, setUsersDb, setCurrentPage }) {
//   const [formData, setFormData] = useState({ name: '', phone: '', password: '', age: '' });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Check if user already exists
//     if (usersDb.some(u => u.phone === formData.phone)) {
//       alert("Phone number already registered!");
//       return;
//     }

//     const newUser = { ...formData, userId: 'usr_' + Math.random().toString(36).substr(2, 9) };
//     setUsersDb([...usersDb, newUser]); // Save to DB
//     alert("Account created successfully! Please login.");
//     setCurrentPage('login'); // Send to login
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-white">
//         <h2 className="text-3xl font-black text-slate-800 mb-2">Create Account</h2>
//         <p className="text-slate-500 mb-8">Join Smart Health today.</p>
        
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input required placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 focus:ring-blue-500 rounded-2xl px-5 py-4 outline-none" />
//           <input required type="tel" placeholder="Phone Number" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 focus:ring-blue-500 rounded-2xl px-5 py-4 outline-none" />
//           <input required type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 focus:ring-blue-500 rounded-2xl px-5 py-4 outline-none" />
//           <input required type="number" placeholder="Age" onChange={(e) => setFormData({...formData, age: e.target.value})} className="bg-slate-50 ring-1 ring-slate-200 focus:ring-blue-500 rounded-2xl px-5 py-4 outline-none" />
          
//           <button type="submit" className="mt-4 w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-lg transition-all">
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center mt-6 text-slate-500 font-medium">
//           Already have an account? <button onClick={() => setCurrentPage('login')} className="text-blue-600 font-bold">Login</button>
//         </p>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';

// export default function Register({ setUser, setCurrentPage }) {
//   const [formData, setFormData] = useState({ name: '', phone: '', password: '', gender: 'Male', age: '' });

//   const handleChange = (e) => {
//     // Input fields ke changes handle karna
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Naya user object banana with unique ID
//     const newUser = { 
//       ...formData, 
//       userId: 'user_' + Date.now() 
//     };
//     setUser(newUser); // App.jsx me user save karo
//     setCurrentPage('dashboard'); // Dashboard pe bhejo
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create Account</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input required name="name" placeholder="Full Name" onChange={handleChange} className="border p-3 rounded-lg bg-gray-50 outline-blue-500" />
//           <input required name="phone" placeholder="Phone Number" onChange={handleChange} className="border p-3 rounded-lg bg-gray-50 outline-blue-500" />
//           <input required type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-3 rounded-lg bg-gray-50 outline-blue-500" />
//           <div className="flex gap-4">
//             <select name="gender" onChange={handleChange} className="border p-3 rounded-lg bg-gray-50 flex-1 outline-blue-500">
//               <option>Male</option><option>Female</option><option>Other</option>
//             </select>
//             <input required type="number" name="age" placeholder="Age" onChange={handleChange} className="border p-3 rounded-lg bg-gray-50 flex-1 outline-blue-500" />
//           </div>
//           <button type="submit" className="bg-blue-600 text-white font-bold py-3 rounded-lg mt-2 hover:bg-blue-700 shadow-md">
//             Register Now
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }