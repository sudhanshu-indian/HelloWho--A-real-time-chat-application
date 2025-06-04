// import React from 'react';
// const testimonials = [{
//   name: 'Sapna Patel',
//   role: 'Freelancer',
//   content: 'Random chat feature helped me connect with amazing people worldwide. The video quality is outstanding!',
//   avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
// }, {
//   name: 'Rahul Sharma',
//   role: 'Software Developer',
//   content: "The AI chat assistant is incredibly helpful. It's like having a smart companion always ready to help.",
//   avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
// }, {
//   name: 'Aisha Khan',
//   role: 'Student',
//   content: 'Video calls are perfect for my study with friend. The interface is so intuitive and user-friendly!',
//   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80'
// }];
// export const Testimonials = () => {
//   if (!testimonials || testimonials.length === 0) {
//     return <p className="text-center text-gray-600">No testimonials available at the moment.</p>;
//   }

//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             What Our Users Say
//           </h2>
//           <p className="text-xl text-gray-600">
//             Real experiences from our community
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial.name} // Use a unique key
//               className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up"
//               style={{
//                 animationDelay: `${testimonials.indexOf(testimonial) * 200}ms`,
//               }}
//             >
//               <div className="flex items-center mb-6">
//                 <img
//                   src={testimonial.avatar || 'https://via.placeholder.com/120'} // Fallback for missing avatar
//                   alt={testimonial.name}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div className="ml-4">
//                   <h3 className="font-semibold text-lg">{testimonial.name}</h3>
//                   <p className="text-gray-600 text-sm">{testimonial.role}</p>
//                 </div>
//               </div>
//               <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
//               <div className="mt-6 flex items-center text-indigo-500">
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
//                       <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//                     </svg>
//                   ))}
//                 </div>
//                 <span className="ml-2 text-sm font-medium">5.0</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };