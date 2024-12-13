import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        userType: '',
        age: '',
        cancer_type: '',
        survivorship_status: '',
        phone: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-purpleMuda flex flex-col items-center justify-center py-8">
            <Head title="Register" />

            <div className="w-full max-w-2xl px-6 py-8 bg-white rounded-xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purpleTua">CancerCare Connect</h1>
                    <p className="text-gray-600 mt-2">Create your account to join our community</p>
                </div>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Required Fields - Left Column */}
                        <div className="space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name" className="text-purpleTua" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-purpleTua" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Password" className="text-purpleTua" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-purpleTua" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>

                        {/* Additional Fields - Right Column */}
                        <div className="space-y-6">
                            <div>
                                <InputLabel htmlFor="userType" value="I am a" className="text-purpleTua" />
                                <select
                                    id="userType"
                                    name="userType"
                                    value={data.userType}
                                    onChange={(e) => setData('userType', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                >
                                    <option value="">Select your role</option>
                                    <option value="patient">Patient</option>
                                    <option value="parent">Parent/Guardian</option>
                                </select>
                            </div>

                            <div>
                                <InputLabel htmlFor="age" value="Age" className="text-purpleTua" />
                                <TextInput
                                    id="age"
                                    type="number"
                                    name="age"
                                    value={data.age}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    onChange={(e) => setData('age', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="cancer_type" value="Type of Cancer" className="text-purpleTua" />
                                <TextInput
                                    id="cancer_type"
                                    name="cancer_type"
                                    value={data.cancer_type}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    onChange={(e) => setData('cancer_type', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="survivorship_status" value="Survivorship Status" className="text-purpleTua" />
                                <select
                                    id="survivorship_status"
                                    name="survivorship_status"
                                    value={data.survivorship_status}
                                    onChange={(e) => setData('survivorship_status', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                >
                                    <option value="">Select status</option>
                                    <option value="newly_diagnosed">Newly Diagnosed</option>
                                    <option value="in_treatment">In Treatment</option>
                                    <option value="post_treatment">Post Treatment</option>
                                    <option value="survivor">Survivor</option>
                                </select>
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Phone Number" className="text-purpleTua" />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="address" value="Address" className="text-purpleTua" />
                                <textarea
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    rows="3"
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                        <Link
                            href={route('login')}
                            className="text-sm text-purpleTua hover:text-purpleMid transition-colors"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton 
                            className="bg-yellow-300 hover:bg-yellow-400 text-purpleTua font-medium px-6 py-2 rounded-full transition-colors" 
                            disabled={processing}
                        >
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}