<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #6B46C1;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .donation-amount {
            font-size: 24px;
            font-weight: bold;
            color: #6B46C1;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Your Donation!</h1>
        </div>
        
        <div class="content">
            <p>Dear {{ $donation->first_name }} {{ $donation->last_name }},</p>
            
            <p>Thank you for your generous donation to our event "{{ $donation->event->title }}".</p>
            
            <div class="donation-amount">
                RM {{ number_format($donation->amount, 2) }}
            </div>
            
            <p><strong>Donation Details:</strong></p>
            <ul>
                <li>Transaction Date: {{ $donation->created_at->format('F j, Y, g:i a') }}</li>
                <li>Transaction ID: {{ $donation->stripe_payment_id }}</li>
                @if($donation->message)
                    <li>Your Message: {{ $donation->message }}</li>
                @endif
            </ul>
            
            <p>Your support means a lot to us and will help make a difference in the lives of those affected by cancer.</p>
            
            <p>Best regards,<br>CancerCare Connect Team</p>
        </div>
        
        <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
        </div>
    </div>
</body>
</html>