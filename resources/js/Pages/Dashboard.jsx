import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import TableHeading from '@/Components/TableHeading';
import moment from 'moment';

export default function Dashboard(transactions,queryParams = null,) {
    const [data, setData] = useState('No result');
    const [error, setError] = useState(null);
    const [isScan,setIsScan] = useState(true)
    const scannerRef = useRef(null);

    console.log(transactions.transactions);
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
            queryParams["page"] = 1;
        } else {
            delete queryParams[name];
        }
        router.get(route("transactions.index"), queryParams);
    };
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("transactions.index"), queryParams);
    };
    useEffect(() => {
        if(isScan){
            const scanner = new Html5QrcodeScanner(
                "reader",
                {
                    qrbox: {
                        width: 450,
                        height: 250,
                    },
                    fps: 5,
                    // aspectRatio: 1.0,
                    facingMode: "environment"
                },
                false
            );
        
            scanner.render(
                (decodedText) => {
                    setData(decodedText);
                    setError(null);
                    setIsScan(false);
                    // scanner.clear();
                },
                (error) => {
                    // console.warn(error);
                    setError('Failed to access camera. Please ensure you have granted camera permissions.');
                }
            );
        
            scannerRef.current = scanner;
        
            return () => {
                if (scannerRef.current) {
                    scannerRef.current.clear();
                }
            };
        }
    }, [isScan]);

    return (
        <AuthenticatedLayout
            // header={
            //     <h2 className="text-xl font-semibold leading-tight text-gray-800">
            //         Dashboard
            //     </h2>
            // }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden  shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                {/* <h3 className="text-lg font-medium mb-2">QR Code Scanner</h3> */}
                                <div className="w-full max-w-md mx-auto">
                                    <div id="reader" className="w-full"></div>
                                {
                                    !isScan && (
                                        <button onClick={()=>setIsScan(true)}>Scan Ulang</button>
                                    )
                                }
                                </div>
                                {/* {error && (
                                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                                        <p>{error}</p>
                                    </div>
                                )} */}
                                <div className="mt-4 p-4 bg-gray-100 rounded">
                                    <p className="font-medium">Scanned Result:</p>
                                    <p>{data}</p>
                                </div>
                                <div className=" overflow-auto w-full">
                                <table className=" mb-4 min-w-full table-fixed z-10 h-full border-collapse border-spacing-2 gap-1">
                                    <thead className=" overflow-auto">
                                        <tr className="min-w-full flex text-center gap-3 !font-semibold">
                                            <TableHeading
                                                name="id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-16 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                No
                                            </TableHeading>
                                            <TableHeading
                                                name="problem_date"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Date
                                            </TableHeading>
                                            {/* <th className='bg-orangeTheme text-black border-2 border-black w-12 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>No</th> */}
                                            <th className=" border-r-[10px] border-r-lightTheme text-white w-40 -mr-3 h-11 flex items-center !font-semibold justify-center">
                                                <span className="bg-orangeTheme text-black border-2 border-black  w-full h-11 flex items-center justify-center rounded-[0.25rem]">
                                                    Cluster
                                                </span>
                                            </th>
                                            <TableHeading
                                                name="name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Line
                                            </TableHeading>
                                            <TableHeading
                                                name="machine"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Machine
                                            </TableHeading>
                                            <th
                                                name="category"
                                                // sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-28 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Kategori
                                            </th>
                                            <TableHeading
                                                name="stopline_duration"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Linestop
                                            </TableHeading>
                                            <th
                                                name="problem"
                                                // sort_field={
                                                //     queryParams.sort_field
                                                // }
                                                // sort_direction={
                                                //     queryParams.sort_direction
                                                // }
                                                // sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-60 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Masalah
                                            </th>
                                            <th
                                                name="problem_analysis"
                                                // sort_field={
                                                //     queryParams.sort_field
                                                // }
                                                // sort_direction={
                                                //     queryParams.sort_direction
                                                // }
                                                // sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-60 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Analisa Masalah
                                            </th>
                                            <th
                                                name="reparation"
                                                // sort_field={
                                                //     queryParams.sort_field
                                                // }
                                                // sort_direction={
                                                //     queryParams.sort_direction
                                                // }
                                                // sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-60 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Perbaikan
                                            </th>
                                            <TableHeading
                                                name="problem_part"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-60 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Part Bermasalah
                                            </TableHeading>
                                            <th
                                                name="problem_category"
                                                // sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-48 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Kategori Kerusakan
                                            </th>
                                            {/* <th
                                                name="category"
                                                // sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-48 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Kategori
                                            </th> */}
                                            <TableHeading
                                                name="user_name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                PIC
                                            </TableHeading>
                                            <th
                                                name="aksi"
                                                // sortChanged={sortChanged}
                                                className=" bg-orangeTheme text-black border-2 border-black w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow-auto box-border no-scrollbar">
                                        {(transactions.transactions).map(
                                            (transaction, index) => (
                                                <tr
                                                    className="min-w-full flex text-center gap-3 mt-3"
                                                    key={transaction.id}
                                                >
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-16`}
                                                    >
                                                        {/* {(transactions.meta.current_page-1)*transactions.meta.per_page+(index+1)} */}
                                                        {transaction.id}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-36`}
                                                    >
                                                        {moment(
                                                            transaction.created_at
                                                        ).format("DD/MM/YYYY")}
                                                    </td>
                                                    <td
                                                        className={` overflow-visible  h-11 -mr-3 bg-lightTheme text-ellipsis text-nowrap text-center pr-3 w-40`}
                                                    >
                                                        <span
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-yellow-50"
                                                                    : "bg-white"
                                                            } border-black border-[1px] rounded-[0.25rem] w-full h-full inline-block px-3 py-2 `}
                                                        >
                                                            {
                                                                transaction.cluster_name
                                                            }
                                                        </span>
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-36`}
                                                    >
                                                        {" "}
                                                        {
                                                            transaction?.line_name
                                                        }{" "}
                                                    </td>
                                                    <td
                                                        className={` ${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-40`}
                                                    >
                                                        {" "}
                                                        {
                                                            transaction.machine_name
                                                        }{" "}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-28`}
                                                    >
                                                        {transaction.category}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-36`}
                                                    >
                                                        {transaction.stopline_duration +
                                                            " menit"}
                                                        {/* menit */}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-60`}
                                                    >
                                                        {transaction.problem}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-60`}
                                                    >
                                                        {
                                                            transaction.problem_analysis
                                                        }
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-60`}
                                                    >
                                                        {transaction.reparation}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-60`}
                                                    >
                                                        {
                                                            transaction.problem_part
                                                        }
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-48`}
                                                    >
                                                        {
                                                            transaction.problem_category
                                                        }
                                                    </td>

                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-36`}
                                                    >
                                                        {transaction.user_name}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-yellow-50"
                                                                : "bg-white"
                                                        } px-6 flex h-11 py-1 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-36`}
                                                    >
                                                        <Link
                                                            // href={route(
                                                            //     "transactions.edit",
                                                            //     transaction
                                                            // )}
                                                            className="bg-yellow-500 hover:brightness-110 duration-150 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center"
                                                        >
                                                            {/* <PencilIcon className="w-5" /> */}
                                                        </Link>
                                                        <button
                                                            // onClick={(e) =>
                                                            //     deleteTransaction(
                                                            //         transaction
                                                            //     )
                                                            // }
                                                            className="bg-red-400 hover:brightness-125 duration-150 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center"
                                                        >
                                                            {/* <XMarkIcon className="w-5" /> */}
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                        {/* </tr> */}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
