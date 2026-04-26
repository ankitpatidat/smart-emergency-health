import React from 'react';
import HospitalCard from '../components/HospitalCard';

export default function Hospital() {
  const hospitals = [
    { id: 1, name: "City General Hospital", icu: true, beds: 45, distance: "2.5 km" },
    { id: 2, name: "Carewell Multispeciality", icu: false, beds: 12, distance: "4.1 km" },
    { id: 3, name: "Sunrise Trauma Center", icu: true, beds: 8, distance: "5.0 km" },
    { id: 4, name: "Apex Heart Institute", icu: true, beds: 2, distance: "7.2 km" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Nearby Hospitals</h2>
          <p className="text-slate-500 font-medium mt-1">Quick admit based on your location</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hospitals.map(hospital => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}



// import React from 'react';
// import HospitalCard from '../components/HospitalCard';

// export default function Hospital() {
//   // Static Dummy Data for Hospitals
//   const hospitals = [
//     { id: 1, name: "City General Hospital", icu: true, beds: 12, distance: "2.5 km" },
//     { id: 2, name: "Carewell Multispeciality", icu: false, beds: 0, distance: "4.1 km" },
//     { id: 3, name: "Sunrise Emergency Center", icu: true, beds: 3, distance: "5.0 km" },
//   ];

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">🏥 Nearby Hospitals</h2>
      
//       {/* List render karne ke liye map lagaya */}
//       <div className="flex flex-col gap-4">
//         {hospitals.map(hospital => (
//           <HospitalCard key={hospital.id} hospital={hospital} />
//         ))}
//       </div>
//     </div>
//   );
// }