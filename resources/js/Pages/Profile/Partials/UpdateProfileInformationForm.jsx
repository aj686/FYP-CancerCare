import { useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '', isAdmin }) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef(null);

    const { data, setData, post, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name || '',
        email: user.email || '',
        profile_photo_path: null,
        age: user.age || '',
        phone: user.phone || '',
        address_1: user.address_1 || '',
        address_2: user.address_2 || '',
        city: user.city || '',
        state: user.state || '',
        postcode: user.postcode || '',
    });
    
    // Add debug log after initialization
    console.log('Form initialized with data:', {
        formData: data,
        userData: user
    });

    const selectNewPhoto = () => {
        photoInput.current?.click();
    };

    const updatePhotoPreview = () => {
        const photo = photoInput.current?.files[0];
        if (!photo) return;
        
        console.log('Setting new photo:', photo);
    
        // Create URL for preview
        setPhotoPreview(URL.createObjectURL(photo));
        
        // Update the form data while explicitly preserving the user data
        setData(prevData => ({
            ...prevData,
            name: user.name,        // Use user.name directly
            email: user.email,      // Use user.email directly
            profile_photo_path: photo,
            age: user.age,
            phone: user.phone,
            address_1: user.address_1,
            address_2: user.address_2,
            city: user.city,
            state: user.state,
            postcode: user.postcode
        }));
    
        console.log('Form data after photo update:', data);
    };

    const submit = (e) => {
        e.preventDefault();
        
        console.log('Starting form submission with data:', data);
    
        const formData = new FormData();
        formData.append('_method', 'PATCH');
    
        // Always include name and email from user data
        formData.append('name', user.name);
        formData.append('email', user.email);
        
        // Handle photo upload
        const photo = photoInput.current?.files[0];
        if (photo) {
            formData.append('profile_photo_path', photo);
        }
    
        // Append remaining fields
        if (data.age) formData.append('age', data.age);
        if (data.phone) formData.append('phone', data.phone);
        if (data.address_1) formData.append('address_1', data.address_1);
        if (data.address_2) formData.append('address_2', data.address_2);
        if (data.city) formData.append('city', data.city);
        if (data.state) formData.append('state', data.state);
        if (data.postcode) formData.append('postcode', data.postcode);
    
        // Log the final form data
        for (let [key, value] of formData.entries()) {
            console.log(`Sending ${key}: ${value}`);
        }
    
        patch(route(isAdmin ? 'admin.profile.update' : 'profile.update'), formData, {
            forceFormData: true,
            preserveScroll: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            onError: (errors) => {
                console.error('Submission errors:', errors);
            },
            onSuccess: () => {
                console.log('Form submitted successfully');
            }
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                {/* Photo Upload Section */}
                <div>
                    <InputLabel htmlFor="profile_photo_path" value="Profile Photo" />
                    <div className="mt-2 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                            {photoPreview || (user.profile_photo_path && `/storage/${user.profile_photo_path}`) ? (
                                <img
                                    src={photoPreview || `/storage/${user.profile_photo_path}`}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-600 text-lg">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            className="hidden"
                            ref={photoInput}
                            onChange={updatePhotoPreview}
                            accept="image/*"
                            name="profile_photo_path"
                        />

                        <PrimaryButton type="button" onClick={selectNewPhoto}>
                            Select New Photo
                        </PrimaryButton>
                    </div>
                    </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div>
                            <InputLabel htmlFor="age" value="Age" />
                            <TextInput
                                id="age"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.age}
                                onChange={(e) => setData('age', e.target.value)}
                                min="0"
                                max="150"
                            />
                            <InputError className="mt-2" message={errors.age} />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone" value="Phone Number" />
                            <TextInput
                                id="phone"
                                type="tel"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const sanitizedValue = value.replace(/\D/g, '').slice(0, 11);
                                    setData('phone', sanitizedValue);
                                }}
                                placeholder="e.g., 01791313121"
                            />
                            <p className="text-sm text-gray-500 mt-1">Format: 01XXXXXXXXX (Malaysian number)</p>
                            <InputError className="mt-2" message={errors.phone} />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="address_1" value="Address Line 1" />
                            <TextInput
                                id="address_1"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.address_1}
                                onChange={(e) => setData('address_1', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.address_1} />
                        </div>

                        <div>
                            <InputLabel htmlFor="address_2" value="Address Line 2" />
                            <TextInput
                                id="address_2"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.address_2}
                                onChange={(e) => setData('address_2', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.address_2} />
                        </div>

                        <div>
                            <InputLabel htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.city} />
                        </div>

                        <div>
                            <InputLabel htmlFor="state" value="State" />
                            <select
                                id="state"
                                name="state"
                                value={data.state}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                            <InputError className="mt-2" message={errors.state} />
                        </div>

                        <div>
                            <InputLabel htmlFor="postcode" value="Postcode" />
                            <TextInput
                                id="postcode"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.postcode}
                                onChange={(e) => setData('postcode', e.target.value)}
                                maxLength="5"
                            />
                            <InputError className="mt-2" message={errors.postcode} />
                        </div>
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}