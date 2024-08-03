import React, { useEffect } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import getImage from "./getImage";

const AdminProfileContent = ({ user }) => {
    const { data: profileData, setData: setProfileData, post: postProfileData, processing: profileProcessing, errors: profileErrors } = useForm({
        id: user.id,
        image: user.image,
        username: user.username,
        description: user.description,
        phone_number: user.phone_number,
        social_link_facebook: user.social_link_facebook,
        social_link_instagram: user.social_link_instagram,
        social_link_linkedin: user.social_link_linkedin,
        social_link_youtube: user.social_link_youtube,
        social_link_twitter: user.social_link_twitter,
    });

    // Form state untuk perubahan password
    const { data: passwordData, setData: setPasswordData, post: postPasswordData, processing: passwordProcessing, errors: passwordErrors } = useForm({
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    useEffect(() => {
        // jQuery code to handle update button click
        const handleUpdateDisabled = () => {
            $("#profilepicture").removeClass("hidden");
            $("#description").attr("disabled", false);
            $("#facebook-link").attr("disabled", false);
            $("#instagram-link").attr("disabled", false);
            $("#linkedin-link").attr("disabled", false);
            $("#youtube-link").attr("disabled", false);
            $("#twitter-link").attr("disabled", false);
            $("button[type='submit']").attr("disabled", false);
            $("#updateButton").addClass("hidden");
        }

        // Attach the click event handler
        $("#updateButton").on("click", handleUpdateDisabled);

        // Cleanup function to remove the event handler
        return () => {
            $("#updateButton").off("click", handleUpdateDisabled);
        }
    }, []);

    const {flash} = usePage().props;

    const onChangePreviewImage = (e) => {
        const file = e.target.files[0];
        setProfileData('image', file);

        if (file) {
            const oFReader = new FileReader();
            oFReader.readAsDataURL(file);
            oFReader.onload = function(e) {
                document.querySelector(".img-preview").src = e.target.result;
            };
        }
    };

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        router.post(route('admin.profile.update', profileData.username), {
            ...profileData,
            _method: 'put',
            forceFormData: true,
        });
    }

    const handlePasswordChange = (event) => {
        event.preventDefault();
        router.put(route('admin.profile.password-update', profileData.username), {
            ...passwordData,
        })

        document.getElementById('my_modal_2').close();

        setPasswordData({
            old_password: '',
            new_password: '',
            new_password_confirmation: '',
        });
    }

    return (
        <>
            <form onSubmit={handleUpdateProfile}>
                {flash.success && (
                    <div className="p-4 my-5 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                        <span className="font-medium">Successful!</span>&nbsp;{flash.success}
                    </div>
                )}
                <div className="flex gap-10">
                    <div>
                        <img
                            src={getImage(user.image) ?? `https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png`}
                            alt={user.name}
                            className="img-preview w-72 h-72 sm:w-96 sm:h-96 md:w-60 md:h-60 xl:w-80 xl:h-80 rounded-full object-cover object-center"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-5xl font-bold text-black">{user.name}</h3>
                        <p>Email: <span className="font-bold">{user.email}</span></p>
                        <div className="flex">
                            <div className="flex">
                                <p>Peran:&nbsp;</p>
                                <p className="capitalize font-bold">{user.role}&nbsp;</p>
                            </div>
                            <div className="flex">
                                <p>/ Status Peran:&nbsp;</p>
                                <p className="capitalize font-bold">{user.role_status}</p>
                            </div>
                        </div>
                        <div className="mt-3 hidden" id="profilepicture">
                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload image</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="file_input" type="file" onChange={onChangePreviewImage}/>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi Pengguna</label>
                    <textarea
                        id="description"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        disabled
                        value={profileData.description}
                        onChange={e => setProfileData('description', e.target.value)}></textarea>
                    <div className="grid grid-cols-2 gap-5 mt-5">
                        <div>
                            <label
                                htmlFor="facebook-link"
                                className="block mb-2 text-sm font-medium text-gray-900">Link Facebook</label>
                            <input
                                type="text"
                                id="facebook-link"
                                aria-describedby="facebook-link-explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="https://www.facebook.com"
                                disabled
                                value={profileData.social_link_facebook}
                                onChange={e => setProfileData('social_link_facebook', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="instagram-link" className="block mb-2 text-sm font-medium text-gray-900">Link Instagram</label>
                            <input
                                type="text"
                                id="instagram-link"
                                aria-describedby="instagram-link-explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="https://www.instagram.com"
                                disabled
                                value={profileData.social_link_instagram}
                                onChange={e => setProfileData('social_link_instagram', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="linkedin-link" className="block mb-2 text-sm font-medium text-gray-900">Link LinkedIn</label>
                            <input
                                type="text"
                                id="linkedin-link"
                                aria-describedby="linkedin-link-explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="https://www.linkedin.com"
                                disabled
                                value={profileData.social_link_linkedin}
                                onChange={e => setProfileData('social_link_linkedin', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="youtube-link" className="block mb-2 text-sm font-medium text-gray-900">Link YouTube</label>
                            <input
                                type="text"
                                id="youtube-link"
                                aria-describedby="youtube-link-explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="https://www.youtube.com"
                                disabled
                                value={profileData.social_link_youtube}
                                onChange={e => setProfileData('social_link_youtube', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="twitter-link" className="block mb-2 text-sm font-medium text-gray-900">Link Twitter</label>
                            <input
                                type="text"
                                id="twitter-link"
                                aria-describedby="twitter-link-explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="https://www.twitter.com"
                                disabled
                                value={profileData.social_link_twitter}
                                onChange={e => setProfileData('social_link_twitter', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-3 mt-10">
                    <div>
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            onClick={() => document.getElementById('my_modal_2').showModal()}
                        >
                            Perbarui Password
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            id="updateButton"
                        >
                            Perbarui Data
                        </button>
                        <button
                            type="submit"
                            className="focus:outline-none text-white bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            disabled={profileProcessing}
                        >
                            Simpan Data
                        </button>
                    </div>
                </div>
            </form>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-white">
                    <form onSubmit={handlePasswordChange}>
                        <h3 className="font-bold text-lg text-black mb-3">Perbarui Password</h3>
                        <div className="mb-3">
                            <label
                                htmlFor="old_password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password Lama
                            </label>
                            <input
                                type="password"
                                id="old_password"
                                name="old_password"
                                aria-describedby="old_password_explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="••••••••"
                                value={passwordData.old_password}
                                onChange={(e) => setPasswordData('old_password', e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="new_password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password Baru
                            </label>
                            <input
                                type="password"
                                id="new_password"
                                name="new_password"
                                aria-describedby="new_password_explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="••••••••"
                                value={passwordData.new_password}
                                onChange={(e) => setPasswordData('new_password', e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="new_password_confirmation"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Konfirmasi Password Baru
                            </label>
                            <input
                                type="password"
                                id="new_password_confirmation"
                                name="new_password_confirmation"
                                aria-describedby="new_password_confirmation_explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="••••••••"
                                value={passwordData.new_password_confirmation}
                                onChange={(e) => setPasswordData('new_password_confirmation', e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >
                                Ubah
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

export default AdminProfileContent;
