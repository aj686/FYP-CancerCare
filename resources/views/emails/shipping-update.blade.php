<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
        }
        .content {
            padding: 20px;
        }
        .tracking-info {
            background: #f1f1f1;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Shipping Update</h2>
        </div>
        
        <div class="content">
            <p>Hello {{ $order->firstname }},</p>
            
            <p>We have an update regarding your order #{{ $order->ordernumber }}.</p>
            
            <div class="tracking-info">
                <h3>Shipping Details:</h3>
                <p><strong>Status:</strong> {{ ucfirst($order->shipping_status) }}</p>
                <p><strong>Courier:</strong> {{ $order->courier_name }}</p>
                <p><strong>Tracking Number:</strong> {{ $order->tracking_number }}</p>
            </div>

            <p>Track your package here:
                @switch($order->courier_name)
                    @case('J&T Express')
                        <a href="https://www.jtexpress.my/tracking">J&T Express Tracking</a>
                        @break
                    @case('Pos Laju')
                        <a href="https://www.poslaju.com.my/track-trace-v2/">Pos Laju Tracking</a>
                        @break
                    @case('DHL')
                        <a href="https://www.dhl.com/my-en/home/tracking.html">DHL Tracking</a>
                        @break
                    @default
                        Please visit your courier's website
                @endswitch
            </p>

            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>Thank you for shopping with us!</p>
        </div>
    </div>
</body>
</html>