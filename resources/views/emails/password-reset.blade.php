@component('mail::message')
# Reset Your Password - CancerCare Connect

Hello {{ $notifiable->name }},

We received a request to reset your password for your CancerCare Connect account.

@component('mail::button', ['url' => $url])
Reset Password
@endcomponent

If you did not make this request, please ignore this email.

Best regards,<br>
CancerCare Connect Team
@endcomponent