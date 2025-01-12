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
        age: '',
        phone: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: 'Malaysia',
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
                                <InputLabel htmlFor="age" value="Age" className="text-purpleTua" />
                                <TextInput
                                    id="age"
                                    type="number"
                                    name="age"
                                    value={data.age}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    onChange={(e) => setData('age', e.target.value)}
                                    min="0"
                                    max="150"
                                />
                                <InputError message={errors.age} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Phone Number" className="text-purpleTua" />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Only allow digits and limit to 11 characters
                                        const sanitizedValue = value.replace(/\D/g, '').slice(0, 11);
                                        setData('phone', sanitizedValue);
                                    }}
                                    placeholder="e.g., 01791313121"
                                    pattern="01[0-9]{8,9}"
                                    title="Please enter a valid Malaysian phone number (e.g., 01791313121)"
                                    maxLength="11"
                                />
                                <p className="text-sm text-gray-500 mt-1">Format: 01XXXXXXXXX (Malaysian number)</p>
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="address_1" value="Address Line 1" className="text-purpleTua" />
                                <TextInput
                                    id="address_1"
                                    type="text"
                                    name="address_1"
                                    value={data.address_1}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    onChange={(e) => setData('address_1', e.target.value)}
                                />
                                <InputError message={errors.address_1} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="address_2" value="Address Line 2" className="text-purpleTua" />
                                <TextInput
                                    id="address_2"
                                    type="text"
                                    name="address_2"
                                    value={data.address_2}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    onChange={(e) => setData('address_2', e.target.value)}
                                />
                                <InputError message={errors.address_2} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="city" value="City" className="text-purpleTua" />
                                    <TextInput
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={data.city}
                                        className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                        onChange={(e) => setData('city', e.target.value)}
                                    />
                                    <InputError message={errors.city} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="state" value="State" className="text-purpleTua" />
                                    <select
                                        id="state"
                                        name="state"
                                        value={data.state}
                                        className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                        onChange={(e) => setData('state', e.target.value)}
                                    >
                                        <option value="">Select a state</option>
                                        <option value="Johor">Johor</option>
                                        <option value="Kedah">Kedah</option>
                                        <option value="Kelantan">Kelantan</option>
                                        <option value="Melaka">Melaka</option>
                                        <option value="Negeri Sembilan">Negeri Sembilan</option>
                                        <option value="Pahang">Pahang</option>
                                        <option value="Perak">Perak</option>
                                        <option value="Perlis">Perlis</option>
                                        <option value="Pulau Pinang">Pulau Pinang</option>
                                        <option value="Sabah">Sabah</option>
                                        <option value="Sarawak">Sarawak</option>
                                        <option value="Selangor">Selangor</option>
                                        <option value="Terengganu">Terengganu</option>
                                        <option value="Kuala Lumpur">Kuala Lumpur</option>
                                        <option value="Labuan">Labuan</option>
                                        <option value="Putrajaya">Putrajaya</option>
                                    </select>
                                    <InputError message={errors.state} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="postcode" value="Postcode" className="text-purpleTua" />
                                <TextInput
                                    id="postcode"
                                    type="text"
                                    name="postcode"
                                    value={data.postcode}
                                    className="mt-1 block w-full rounded-lg border-purpleMuda focus:border-purpleTua focus:ring-purpleTua"
                                    onChange={(e) => setData('postcode', e.target.value)}
                                    maxLength="5"
                                />
                                <InputError message={errors.postcode} className="mt-2" />
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