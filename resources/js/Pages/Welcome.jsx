import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-cyan-100 w-full h-lvh relative overflow-hidden">
                <img src={"storage/assets/mainBackground.png"} alt="logo" className='w-full h-full absolute -bottom-36 left-0' />
                <div className=" w-fit h-48 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-1">
                        <div className="w-12">
                            <img src={"storage/assets/icon.png"} alt="icon" />
                        </div>
                        <h2 className='font-playfair font-bolder italic tracking-wider text-4xl'>Supplier</h2>
                    </div>
                    <h1 className='-mt-8 font-adlam text-[3.5rem]'>Logging Apps</h1>
                    <button className='bg-yellowTheme w-48 py-[2px] flex gap-1 items-center justify-center rounded-full mx-auto font-semibold pl-2 font-oxanium'>Login 
                        <div className="w-5 flex items-center justify-center">
                            <img className='w-full' src={"storage/assets/icon_button.png"} alt="" />
                        </div>
                    </button>
                </div>
                {/* <h1 className='bg-red-400'>halo semuanya</h1> */}
            </div>
        </>
    );
}
