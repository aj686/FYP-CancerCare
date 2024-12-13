import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-purpleMuda flex flex-col items-center justify-center">
            <Head title="Forgot Password" />

            <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-lg">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purpleTua">CancerCare Connect</h1>
                    <div className="mt-4 text-sm text-gray-600">
                        Forgot your password? No problem. Just let us know your email address and we will email you a password
                        reset link that will allow you to choose a new one.
                    </div>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                        isFocused={true}
                        placeholder="Enter your email address"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="flex flex-col gap-4 mt-6">
                        <PrimaryButton 
                            className="w-full bg-yellow-300 hover:bg-yellow-400 text-purpleTua font-medium py-2 rounded-full transition-colors justify-center" 
                            disabled={processing}
                        >
                            Email Password Reset Link
                        </PrimaryButton>

                        <Link
                            href={route('login')}
                            className="text-center text-sm text-purpleTua hover:text-purpleMid transition-colors"
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}