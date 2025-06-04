import React, { useEffect, useState } from 'react';

type Feedback = {
  name: string;
  message: string;
};

export const FeedbackSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit feedback');

      setIsSubmitted(true);
      loadFeedbacks(); // reload feedbacks

      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitted(false);
      }, 4000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    }
  };

  const loadFeedbacks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/feedback');
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.error('Error loading feedbacks:', err);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <section id="feedback" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left side: Feedback list */}
          <div className="bg-white rounded-lg shadow-md p-6 max-h-[500px] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-indigo-700">Recent Feedback</h3>
            {feedbackList.length === 0 ? (
              <p className="text-gray-500">No feedback yet.</p>
            ) : (
              feedbackList.map((fb, index) => (
                <div
                  key={index}
                  className="mb-4 border-b border-gray-200 pb-4 animate-fade-in"
                >
                  <p className="text-gray-800 font-semibold">{fb.name}</p>
                  <p className="text-gray-600">{fb.message}</p>
                </div>
              ))
            )}
          </div>

          {/* Right side: Feedback form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
              Share Your Feedback
            </h2>

            {isSubmitted ? (
              <div className="text-center text-green-600 font-medium">
                Thank you! Your feedback has been submitted. ✅
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 text-gray-700 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Type your feedback here..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                  required
                ></textarea>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition"
              >
                Submit Feedback
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
