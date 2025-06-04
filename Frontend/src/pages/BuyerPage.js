import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BuyerPage() {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const response = await axios.get(`http://localhost:8000/api/payments/${paymentId}/`);
        setPayment(response.data);
      } catch (err) {
        setError('Failed to load payment details');
      } finally {
        setLoading(false);
      }
    }
    fetchPayment();
  }, [paymentId]);

    // Dummy "Pay Now" button
  const handleDummyPayNow = () => {
    alert('Redirecting to the Payment Gateway. Please do not close or refresh this Page');
  };

  if (loading) return <p>Loading payment details...</p>;
  if (error) return <p>{error}</p>;
  if (!payment) return <p>No payment found</p>;

 return (
    <div>
      <h1>Buyer Payment Page</h1>
      {payment ? (
        <div>
          <p><strong>Merchant:</strong> {payment.merchant_name}</p>
          <p><strong>Amount:</strong> {payment.amount}</p>
          <p><strong>Status:</strong> {payment.status}</p>

          {payment.status === 'pending' && (
            <button onClick={handleDummyPayNow}>Pay Now</button>
          )}
          {payment.status !== 'pending' && (
            <p>Payment already completed.</p>
          )}
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}

export default BuyerPage;
