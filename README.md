# QR-Based-Webapp-React-Django
QR Based Web Application - React &amp; Django
QR Payment Web Application:

Frontend - React.js
Backend - Django REST Framework
Database - PostgreSQL

***Features:**  
    Merchants create payment links and generate QR codes  
    Buyers scan QR codes and proceed with (faked) payment  
    Status updates in real-time


Technologies used in this Project: 

- **React.js** (Frontend)
- **Django REST Framework** (API backend)
- **PostgreSQL** (Database)
- **Axios** (API calls)

---

#### 1. Backend Setup

```bash
cd Backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure your PostgreSQL database in Backend/.env 
python manage.py makemigrations
python manage.py migrate

python manage.py runserver

```

---

#### 2. Frontend Setup
cd Frontend
npm install
npm start


#### 3. How it Works:

#### (1) Merchant flow:

Visit / (MerchantPage).
Enter merchant name and amount.
Submit → Backend creates a payment link & generates UUID.
QR code generated and displayed for buyers to scan.

```Step 1: Merchant Creates Payment Link (React MerchantPage)```

Merchant opens the MerchantPage in the React frontend.
Merchant enters details like amount and merchant name.
Merchant clicks Create Payment.
React frontend sends a POST request to Django backend ```/api/payments/``` with payment info.
Django backend creates a new Payment record in Postgres with status "Pending".
Backend responds with payment info, including a unique payment ID or URL.

```Step 2: Merchant Sees QR Code```
React frontend generates a QR code that encodes a URL containing the payment ID.
This QR code is shown on the MerchantPage.
Merchant can now show this QR code to the buyer


#### (2) Buyer flow:

Scan QR code (which opens /buyer/:id).
Buyer sees payment info and clicks “Pay Now” to fake the payment.
Payment status updates to Completed.

```Step 3: Buyer Scans QR Code```
Buyer scans the QR code using their phone.
The QR code directs buyer’s browser to a React BuyerPage URL with the payment ID embedded.
BuyerPage loads and fetches payment details from backend ```/api/payments/{payment_id}/.```

```Step 4: Buyer Proceeds to Pay (Fake Payment)```
Buyer clicks a Pay button on the BuyerPage.
React frontend sends a POST request to backend endpoint '```/api/payments/{payment_id}/pay/.```
Backend simulates payment by updating the Payment status to "Completed".
Backend responds with success confirmation.



```Step 5: Payment Status Updated & Shown```
BuyerPage shows payment success message.



API Endpoints:

POST:    /api/payments/create/	Create a new payment link
GET:     /api/payments/<id>/	Get payment status
PATCH:	 /api/payments/<id>/pay/	Fake proceed payment
