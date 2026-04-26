import React, { useState, useRef, useEffect } from 'react';

export default function Assistant() {
  const [messages, setMessages] = useState([
    { text: "Hi there! I am your AI Health Companion 🤖. Describe your symptoms.", sender: "ai" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null); // Auto scroll down ke liye

  // Naya message aane par auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I noted your symptoms. Since I'm a prototype, please consult a real doctor. Stay hydrated! 💧", 
        sender: "ai" 
      }]);
    }, 1200);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-[75vh] overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-5 text-center">
        <h2 className="text-xl font-bold">Health AI Bot <span className="w-2 h-2 bg-green-500 rounded-full inline-block mb-1 ml-1 animate-pulse"></span></h2>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[80%] font-medium text-[15px] shadow-sm ${
              msg.sender === 'user' 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-3">
        <input 
          type="text" 
          className="flex-1 bg-slate-100 rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" 
          placeholder="Type your message..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full font-bold shadow-md transition-colors">
          Send
        </button>
      </form>
    </div>
  );
}



// import React, { useState } from 'react';

// export default function Assistant() {
//   const [messages, setMessages] = useState([
//     { text: "Hello! I am your AI Health Assistant. How can I help you?", sender: "ai" }
//   ]);
//   const [input, setInput] = useState('');

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // Pehle user ka message add karo
//     const newMessages = [...messages, { text: input, sender: "user" }];
//     setMessages(newMessages);
//     setInput('');

//     // Simulate AI thinking delay
//     setTimeout(() => {
//       setMessages([...newMessages, { 
//         text: "Please consult a doctor. I am just a dummy prototype! 🏥", 
//         sender: "ai" 
//       }]);
//     }, 1000);
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 flex flex-col h-[80vh]">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">🤖 AI Assistant</h2>
      
//       {/* Chat History Box */}
//       <div className="flex-1 bg-white border rounded-2xl p-4 shadow-sm overflow-y-auto flex flex-col gap-3 mb-4">
//         {messages.map((msg, index) => (
//           <div key={index} className={`p-3 rounded-2xl max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-600 text-white self-end rounded-br-sm' : 'bg-gray-100 text-gray-800 self-start rounded-bl-sm'}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Input Box */}
//       <form onSubmit={handleSend} className="flex gap-2 bg-white p-2 rounded-full border shadow-sm">
//         <input 
//           type="text" 
//           className="flex-1 px-4 outline-none bg-transparent" 
//           placeholder="Type your symptoms..." 
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }