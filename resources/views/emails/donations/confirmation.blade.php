<!DOCTYPE html>
<html>
<head>
    <title>Donation Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #333; text-align: center;">Thank You for Your Donation!</h1>
    
    <p style="font-size: 16px; line-height: 1.5;">
        Dear {{ $donation->first_name }} {{ $donation->last_name }},
    </p>

    <p style="font-size: 16px; line-height: 1.5;">
        Thank you for your generous donation of RM {{ number_format($donation->amount, 2) }} to CancerCare Connect.
    </p>

    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-weight: bold; margin-bottom: 10px;">Donation Details:</p>
        <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 8px;">
                Amount: RM {{ number_format($donation->amount, 2) }}
            </li>
            <li>
                Date: {{ $donation->payment_date ? $donation->payment_date->format('M d, Y h:i A') : $donation->created_at->format('M d, Y h:i A') }}
            </li>
        </ul>
    </div>

    <p style="font-size: 16px; line-height: 1.5;">
        Your support means a lot to us and helps us continue our mission.
    </p>

    <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        <p style="margin-bottom: 5px;">Best regards,</p>
        <p style="font-weight: bold;">CancerCare Connect Team</p>
    </div>
</body>
</html>