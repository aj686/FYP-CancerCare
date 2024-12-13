import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-purpleMuda flex flex-col items-center justify-center">
            <Head title="Log in" />

            <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-lg">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purpleTua">CancerCare Connect</h1>
                    <p className="text-gray-600 mt-2">Welcome back! Please log in to your account.</p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-purpleTua" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" className="text-purpleTua" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="border-purpleMuda text-purpleTua focus:ring-purpleTua"
                            />
                            <span className="ms-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-purpleTua hover:text-purpleMid transition-colors"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton 
                            className="bg-yellow-300 hover:bg-yellow-400 text-purpleTua font-medium px-6 py-2 rounded-full transition-colors" 
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="text-purpleTua hover:text-purpleMid transition-colors">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}