import React from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-green-200">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-2xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">Thank you for your support! Your premium access will be activated shortly.</p>
        <div className="space-y-3">
          <Link to="/selection" className="block w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">Go to Learning Paths</Link>
          <Link to="/premium" className="block w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200">Back to Plans</Link>
        </div>
      </div>
    </div>
  );
}
