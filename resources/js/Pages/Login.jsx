import getImage from "@/Components/getImage";
import { Head, useForm, usePage } from "@inertiajs/react";
import React from "react";

const Login = ({ title }) => {

    const {data, setData, post, processing, errors} = useForm({
        email: '',
        password: '',
    });

    const {flash} = usePage().props;

    const handleEmailChange = event => {
        setData('email', event.target.value);
    }

    const handlePasswordChange = event => {
        setData('password', event.target.value);
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        post(route('login.authenticate'));
    }

    return (
        <section id="login" className="w-full h-screen overflow-hidden">
            <Head title={title} />
            <div className="grid grid-cols-2 bg-white">
                <div className="hidden md:block">
                    <img
                        src={getImage('login-page.jpeg')}
                        alt=""
                        className="w-screen h-screen object-center object-cover"
                    />
                </div>
                <div className="w-screen md:w-96 lg:w-9/12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col justify-center h-screen sm:ml-4">
                            <div>
                                <img
                                    src={getImage('lmi-logo.png')}
                                    alt=""
                                    className="w-28"
                                />
                                <p>Harap masukkan alamat email dan kata sandi Anda untuk masuk ke dalam aplikasi.</p>
                                <div>
                                    {flash.error && (
                                        <div className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                            <span className="font-medium">Error!</span>&nbsp;{flash.error}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <form
                                // action={route("login.authenticate")}
                                // method="POST"
                                onSubmit={handleFormSubmit}
                            >
                                <div className="mt-4">
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input
                                        type="email"
                                        id="email" aria-describedby="email-explanation"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Email terdaftar"
                                        name="email"
                                        value={data.email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="mt-4">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input
                                        type="password"
                                        id="password" aria-describedby="password-explanation"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                                        placeholder="••••••••"
                                        name="password"
                                        value={data.password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;

