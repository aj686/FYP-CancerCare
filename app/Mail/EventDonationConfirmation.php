<?php

namespace App\Mail;

use App\Models\EventDonation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventDonationConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public EventDonation $donation)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Thank You for Your Event Donation - CancerCare Connect'
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.donations.event-confirmation'
        );
    }

    public function attachments(): array
    {
        return [];
    }
}