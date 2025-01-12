import React from 'react';
import { Head } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Preview({ donationData }) {
    const handleConfirm = async () => {
        try {
            const response = await fetch('/donate/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(donationData)
            });
            
            const data = await response.json();
            
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <>
            <Head title="Confirm Donation - CancerCare Connect" />
            <DynamicNavbar />
            
            <div className="bg-gradient-to-b from-white to-purpleMuda py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-purpleTua">
                                Confirm Your Donation
                            </h2>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-purpleMuda/20 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-purpleTua mb-4">
                                    Donation Amount
                                </h3>
                                <p className="text-3xl font-bold text-purpleTua">
                                    RM {donationData.amount.toFixed(2)}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-2">Personal Information</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Name:</span> {donationData.firstName} {donationData.lastName}</p>
                                        <p><span className="font-medium">Email:</span> {donationData.email}</p>
                                        <p><span className="font-medium">Phone:</span> {donationData.phone}</p>
                                        <p><span className="font-medium">ID Number:</span> {donationData.identityNumber}</p>
                                        {donationData.race && <p><span className="font-medium">Race:</span> {donationData.race}</p>}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Address Information</h3>
                                    <div className="space-y-2">
                                        {donationData.streetAddress && (
                                            <p>{donationData.streetAddress}</p>
                                        )}
                                        {donationData.addressLine2 && (
                                            <p>{donationData.addressLine2}</p>
                                        )}
                                        {donationData.city && donationData.state && (
                                            <p>{donationData.city}, {donationData.state}</p>
                                        )}
                                        {donationData.postalCode && (
                                            <p>{donationData.postalCode}</p>
                                        )}
                                        <p>{donationData.country}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-6">
                                <button
                                    onClick={() => window.history.back()}
                                    className="px-6 py-3 rounded-full border-2 border-purpleTua text-purpleTua hover:bg-purpleMuda/20 transition-colors"
                                >
                                    Back to Edit
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="px-8 py-3 rounded-full bg-purpleTua text-white hover:bg-purpleMid transition-colors"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}