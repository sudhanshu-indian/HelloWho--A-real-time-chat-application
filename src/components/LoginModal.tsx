// import React, { useState } from 'react';
// import { XIcon } from 'lucide-react';

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
//   const [formType, setFormType] = useState<'login' | 'signup'>('login');
//   const [formData, setFormData] = useState({ email: '', password: '', username: '' });
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

//   if (!isOpen) return null;

//   const showToast = (type: 'success' | 'error', message: string) => {
//     setToast({ type, message });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       if (formType === 'login') {
//         console.log('✅ User logged in:', {
//           email: formData.email,
//           password: formData.password,
//         });
//         showToast('success', 'Login successful!');
//       } else {
//         console.log('✅ User signed up:', {
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//         });
//         showToast('success', 'Signup successful!');
//       }

//       setLoading(false);
//       onClose();
//     }, 1000); // mock delay
//   };

//   const handleGuestLogin = () => {
//     console.log('👤 Guest login');
//     showToast('success', 'Guest login activated!');
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="relative w-full max-w-md p-6 m-4 bg-white rounded-2xl shadow-xl animate-fadeIn">

//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
//           aria-label="Close"
//         >
//           <XIcon className="w-5 h-5" />
//         </button>

//         {/* Title */}
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           {formType === 'login' ? 'Login to HelloWho' : 'Create an Account'}
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {formType === 'signup' && (
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 value={formData.username}
//                 onChange={e => setFormData({ ...formData, username: e.target.value })}
//                 className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
//                 required
//               />
//             </div>
//           )}

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={formData.email}
//               onChange={e => setFormData({ ...formData, email: e.target.value })}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={formData.password}
//               onChange={e => setFormData({ ...formData, password: e.target.value })}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 text-white rounded-lg font-medium transition-colors ${
//               loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
//             }`}
//           >
//             {loading
//               ? formType === 'login' ? 'Logging in...' : 'Signing up...'
//               : formType === 'login' ? 'Login' : 'Sign Up'}
//           </button>
//         </form>

//         {/* Toggle Form */}
//         <div className="mt-4 text-center">
//           <button
//             onClick={() => setFormType(formType === 'login' ? 'signup' : 'login')}
//             className="text-sm text-indigo-600 hover:underline transition"
//           >
//             {formType === 'login'
//               ? 'New here? Create an account'
//               : 'Already have an account? Login'}
//           </button>
//         </div>

//         {/* Guest Login */}
//         <div className="mt-3 text-center">
//           <button
//             onClick={handleGuestLogin}
//             className="text-sm text-gray-500 hover:underline transition"
//           >
//             Continue as Guest
//           </button>
//         </div>
//       </div>

//       {/* Toast Notification */}
//       {toast && (
//         <div
//           className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium
//             ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
//         >
//           {toast.message}
//         </div>
//       )}
//     </div>
//   );
// };
