import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useRef } from 'react'; // Add these imports

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '', isAdmin }) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef(null);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        photo: null,
    });

    const selectNewPhoto = () => {
        photoInput.current?.click();
    };

    const updatePhotoPreview = () => {
        const photo = photoInput.current?.files[0];
        if (!photo) return;
        
        setData(prevData => ({
            ...prevData,  // Preserve name and email
            photo
        }));
        setPhotoPreview(URL.createObjectURL(photo));
    };

    const submit = (e) => {
        e.preventDefault(); // Add this line
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        
        if (photoInput.current?.files[0]) {
            formData.append('photo', photoInput.current.files[0]);
            console.log('Photo appended:', photoInput.current.files[0]); // Debug line
        }
        
        // Debug log
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        patch(route(isAdmin ? 'admin.profile.update' : 'profile.update'), formData, {
            preserveScroll: true,
            forceFormData: true,
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

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Photo Upload Section */}
                <div>
                    <InputLabel htmlFor="photo" value="Profile Photo" />
                    <div className="mt-2 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                            {photoPreview || user.profile_photo_url ? (
                                <img
                                    src={photoPreview || user.profile_photo_url}
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
                        />

                        <PrimaryButton type="button" onClick={selectNewPhoto}>
                            Select New Photo
                        </PrimaryButton>
                    </div>
                </div>

                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
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