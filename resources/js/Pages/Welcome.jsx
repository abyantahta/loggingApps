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
            <div className="bg-cyan-100 w-full h-lvh relative overflow-hidden bg-[url('storage/assets/mainBackground.png')] bg-cover bg-[center_top_6rem] bg-no-repeat">
                {/* <div className="w-full h-lvh bg-transparent z-40 absolute top-0 left-0"></div> */}
                {/* <img src={"storage/assets/mainBackground.png"} alt="logo" className='w-full h-full absolute -bottom-44 left-0' /> */}
                <img src={"storage/assets/cloud.png"} alt="logo" className=' w-2/3 opacity-75 absolute -top-20 -left-60' />
                <img src={"storage/assets/cloud2.png"} alt="logo" className=' w-2/3 opacity-75 absolute -top-20 -right-40' />

                <div className="w-fit bg-[rgba(255,255,255,0.05)] border-[1px] container border-white backdrop-blur-[6px] p-8 rounded-xl scale-125 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-[10rem]">
                    <div className="flex items-center gap-1 "> 
                        <div className="w-8 md:w-12">
                            <img src={"storage/assets/icon.png"} alt="icon" />
                        </div>
                        <h2 className='font-playfair font-bolder italic tracking-wider text-2xl md:text-4xl'>Supplier</h2>
                    </div>
                    <h1 className='-mt-4 md:-mt-7 font-adlam text-[1.8rem] sm:text-[2.2rem] md:text-[3.5rem] '>Logging Apps</h1>
                    <Link href={route('login')} className='cursor-pointer mt-1 sm:mt-2 hover:brightness-110 duration-500 bg-yellowTheme w-48 py-[2px] sm:py-[5px] md:py-[2px] text-xs md:text-lg flex gap-1 items-center justify-center rounded-full mx-auto font-semibold pl-2 font-oxanium'>Login 
                        <div className="w-4 pb-[2px]  md:w-5 flex items-center justify-center">
                            <img className='w-full' src={"storage/assets/icon_button.png"} alt="" />
                        </div>
                    </Link>
                </div>

                {/* <h1 className='bg-red-400'>halo semuanya</h1> */}
            </div>
        </>
    );
}
