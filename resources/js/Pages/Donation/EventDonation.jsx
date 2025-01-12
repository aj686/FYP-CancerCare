import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function EventDonation({ event, auth }) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  // Set isAnonymous to true by default for guest users
  useEffect(() => {
    if (!auth?.user) {
      setIsAnonymous(true);
    }
  }, [auth?.user]);

  // Safe number formatting function
  const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return '0.00';
    return number.toLocaleString('en-MY', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Calculate progress safely
  const totalDonations = parseFloat(event?.total_donations || 0);
  const fundingGoal = parseFloat(event?.funding_goal || 0);
  const progress = fundingGoal > 0 ? (totalDonations / fundingGoal * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    // Create data object with explicit boolean conversion
    const data = {
        amount: Number(amount),
        message: message || '',
        is_anonymous: !auth?.user || isAnonymous // Will be true for guests or when checkbox is checked
    };

    router.get(`/events/${event.id}/donate/preview`, data, {
        preserveState: true,
        onSuccess: () => {
            setProcessing(false);
        },
        onError: (errors) => {
            setError(Object.values(errors)[0]);
            setProcessing(false);
        }
    });
};

  return (
    <>
      <Head title={`Donate - ${event?.title || 'Event'}`} />
      <DynamicNavbar />

      <div className="bg-gradient-to-b from-white to-purpleMuda py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-purpleTua">
                Support {event?.title}
              </h2>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">
                  Raised: RM {formatCurrency(totalDonations)}
                </span>
                {/* <span className="text-gray-600">
                  Goal: RM {formatCurrency(fundingGoal)}
                </span> */}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purpleMuda h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>

            {/* Funding Categories */}
            {event?.funding_categories && Object.keys(event.funding_categories).length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold mb-2 text-purpleTua">
                  Funding Breakdown
                </h3>
                <div className="space-y-2">
                  {Object.entries(event.funding_categories).map(([category, amount]) => (
                    <div key={category} className="flex justify-between text-gray-600">
                      <span>{category}</span>
                      <span>RM {formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Donation Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Donation Amount (RM)
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purpleMuda focus:border-purpleTua outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purpleMuda focus:border-purpleTua outline-none"
                  rows="3"
                  maxLength="500"
                />
              </div>

              {/* Only show anonymous checkbox for authenticated users */}
              {auth?.user && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="anonymous" className="text-gray-700">
                    Donate Anonymously
                  </label>
                </div>
              )}

              {/* Show note for guest users */}
              {!auth?.user && (
                <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  Note: Guest donations are automatically anonymous. Sign in to choose between public or anonymous donations.
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-purpleMid to-purpleTua text-white px-6 py-3 rounded-full hover:shadow-lg disabled:opacity-50 transition-all duration-300"
              >
                {processing ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}