// src/pages/MerchantPage.js
import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

function MerchantPage() {
  const [merchantName, setMerchantName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [error, setError] = useState(null);

  const createPayment = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/payments/', {
        merchant_name: merchantName,
        amount: amount
      });

      if (response.data.id) {
        setPaymentId(response.data.id);
      } else {
        setError('Payment created but no ID returned.');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to create payment. Please try again.');

    }
  };

  // Construct the buyer page URL to encode in QR code

  const buyerPageUrl = paymentId ? `http://localhost:3001/buyer/${paymentId}` : '';

  return (
    <div style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <h1>Merchant Payment Page</h1>
      <form onSubmit={createPayment}>
        <input
          type="text"
          placeholder="Merchant Name"
          value={merchantName}
          onChange={(e) => setMerchantName(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Create Payment Link
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {paymentId && (
        <div style={{ marginTop: 20 }}>
          <h3>Scan this QR code to pay:</h3>
          <QRCode value={buyerPageUrl} size={256} />
          <p>
            Or visit: <a href={buyerPageUrl}>{buyerPageUrl}</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default MerchantPage;