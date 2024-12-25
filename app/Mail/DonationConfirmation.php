<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Donation;
use Illuminate\Support\Facades\Log;

class DonationConfirmation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Donation $donation)
    {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Thank You for Your Donation to CancerCare Connect'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        try {
            return new Content(
                view: 'emails.donations.confirmation',
                with: [
                    'donation' => $this->donation
                ],
            );
        } catch (\Exception $e) {
            Log::error('Email content error: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}