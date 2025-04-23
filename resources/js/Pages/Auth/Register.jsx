import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaRegEnvelope, FaRegUser } from "react-icons/fa6";
import { IoKeyOutline, IoKeySharp } from "react-icons/io5";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="w-full h-full  z-10 flex flex-row-reverse ">
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
                    <form className=' inline-block w-full xs:w-[25rem] ' onSubmit={submit}>
                        <div className='flex gap-2 items-center px-5 py-1 mt-4 w-full rounded-xl shadow-md bg-opacity-15 !bg-white'>
                            {/* <InputLabel htmlFor="email" value="Email" /> */}
                            <InputLabel htmlFor="name" value="">
                            <FaRegUser  className='text-2xl -mr-2' />
                                {/* <UserIcon className='w-6 text-blackTheme' /> */}
                            </InputLabel>
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="bg-transparent w-full outline-none border-none italic focus:outline-none focus:ring-0"
                                placeholder="name"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className='flex gap-2 items-center px-5 py-1 mt-4 w-full rounded-xl shadow-md bg-opacity-15 !bg-white'>
                            {/* <InputLabel htmlFor="email" value="Email" /> */}
                            <InputLabel htmlFor="email" value="">
                                {/* <EnvelopeIcon className='w-6 text-blackTheme' /> */}
                                <FaRegEnvelope className='text-2xl -mr-2' />
                            </InputLabel>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="bg-transparent  w-full outline-none border-none italic focus:outline-none focus:ring-0"
                                placeholder="email"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                        </div>
                        <InputError message={errors.email} className="mt-2" />

                        <div className=" flex gap-2 items-center px-5 mt-5 w-full rounded-xl py-1 shadow-md bg-opacity-15 !bg-white">
                            <InputLabel htmlFor="password" value="">
                                {/* <KeyIcon className='w-6 text-blackTheme' /> */}
                                <IoKeyOutline className='text-2xl -mr-2' />
                            </InputLabel>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                placeholder="password"
                                value={data.password}
                                className=" outline-none border-none bg-transparent italic w-full focus:outline-none focus:ring-0"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                        </div>
                        <div className=" flex gap-2 items-center px-5 mt-5 w-full rounded-xl py-1 shadow-md bg-opacity-15 !bg-white">
                            <InputLabel htmlFor="password_confirmation" value="">
                                {/* <KeyIcon className='w-6 text-blackTheme' /> */}
                                <IoKeySharp  className='text-2xl -mr-2' />
                            </InputLabel>

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                placeholder="password_confirmation"
                                value={data.password_confirmation}
                                className=" outline-none border-none bg-transparent  w-full focus:outline-none focus:ring-0"
                                autoComplete="current-password_confirmation"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />

                        </div>

                        <InputError message={errors.password} className="mt-2" />
                        <InputError message={errors.password_confirmation} className="mt-2" />

                        <PrimaryButton className="font-oxanium font-bold  flex items-center justify-center bg-yellowTheme text-black hover:text-yellowTheme mt-5 w-full px-4 py-2 text-center bg-orangeTheme !text-base tracking-wider" disabled={processing}>
                            REGISTER
                        </PrimaryButton>
                    </form>
                </div>
                <div className=" w-1/2 z-30 2xl:-mr-28 h-full hidden md:block ">
                    <img
                        src={"storage/assets/backgroundRegister.png"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* <h1>halo semuanya</h1> */}
            </div>

        </GuestLayout>
    );
}
