import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="w-full h-full  z-10 flex ">
                <img
                    src={"storage/assets/cloud.png"}
                    alt="logo"
                    className="  md:w-2/3 opacity-75 absolute  top-10 md:-top-20 md:-left-60"
                />
                <img
                    src={"storage/assets/cloud2.png"}
                    alt="logo"
                    className="  w-full md:w-2/3 opacity-75 absolute bottom-0 -right-20 md:-top-20 md:-right-40"
                />

                <div className=" w-full md:w-1/2 z-10 h-full flex flex-col items-center justify-center scale-[0.7]  xs:scale-100">
                    <div className="">
                        <div className="flex  items-center gap-1 ">
                            <div className="w-12">
                                <img
                                    src={"storage/assets/icon.png"}
                                    alt="icon"
                                />
                            </div>
                            <h2 className="font-playfair font-bolder italic tracking-wider text-2xl xs:text-3xl md:text-4xl">
                                Supplier
                            </h2>
                        </div>
                        <h1 className="-mt-6 md:-mt-7 font-adlam text-[2.8rem] xs:text-[3rem] md:text-[3.5rem] ">
                            Logging Apps
                        </h1>
                    </div>
                    <form
                        className=" inline-block w-full xs:w-[23rem] mx-auto  "
                        onSubmit={submit}
                    >
                        <div className="flex gap-2 items-center px-5 py-1 mt-4 w-full rounded-xl shadow-md bg-opacity-15 !bg-white">
                            <InputLabel htmlFor="email" value="">
                                {/* <EnvelopeIcon className='w-6 text-blackTheme' /> */}
                                <FaRegEnvelope className="text-lg text-blackTheme" />
                            </InputLabel>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="bg-transparent outline-none border-none w-full italic focus:outline-none focus:ring-0"
                                placeholder="email"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />

                        <div className=" flex gap-2 items-center px-5 mt-5 w-full rounded-xl py-1 shadow-md bg-opacity-15 !bg-white">
                            <InputLabel htmlFor="password" value="">
                                {/* <KeyIcon className='w-6 text-blackTheme' /> */}
                                <IoKeyOutline className="text-xl text-blackTheme" />
                            </InputLabel>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                placeholder="password"
                                value={data.password}
                                className=" outline-none italic border-none bg-transparent focus:outline-none w-full focus:ring-0"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />

                        <div className="mt-5 block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                    Remember me
                                </span>
                            </label>
                        </div>
                        <PrimaryButton
                            className=" mt-2 w-full px-4 py-1 text-center bg-yellowTheme text-blackTheme flex items-center font-oxanium font-bold hover:text-yellowTheme justify-center !text-base tracking-wider"
                            disabled={processing}
                        >
                            Login
                        </PrimaryButton>
                    </form>
                </div>
                <div className=" w-1/2 z-30 2xl:-ml-28 h-full hidden md:block ">
                    <img
                        src={"storage/assets/backgroundLogin.png"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* <h1>halo semuanya</h1> */}
            </div>
            {/* {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )} */}

            {/* <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form> */}
            {/* <div className="w-full h-full bg-red-400">
                <h1>halo semuanya</h1>
            </div> */}
        </GuestLayout>
    );
}
