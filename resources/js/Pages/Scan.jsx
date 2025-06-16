import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import TableHeading from "@/Components/TableHeading";
import moment from "moment";
import { toast } from 'react-hot-toast';
import Pagination from "@/Components/Pagination";

export default function Scan({ transactions, queryParams = null, success = null }) {
    const [scanData, setScanData] = useState("No result");
    const [error, setError] = useState(null);
    const [isScan, setIsScan] = useState(true);
    const scannerRef = useRef(null);
    const { flash, errors } = usePage().props;
    console.log('Flash message:', flash);
    console.log('Validation errors:', errors);
    const {data,setData,post,processing} = useForm({
        supplier_code: '',
        supplier_in: '',
        supplier_startBongkarMuat: null,
        supplier_selesaiBongkarMuat: null,
        supplier_out: null,
    })
    // let transactions = transactions.transactions
    // console.log(transactions.transactions.data);
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

    const handleScan = (decodedText) => {
        setScanData(decodedText);
        setError(null);
        setIsScan(false);

        let transaction = decodedText.split(' ');
        let supplier_code = transaction[0];
        let status = transaction[1];

        if(status === 'IN') {
            router.post(route('transactions.store', {
                supplier_code: supplier_code,
                supplier_in: moment().format('YYYY-MM-DD HH:mm:ss')
            }));
        }else if(status === 'STARTBONGKARMUAT'){
            // console.log('halo')
            router.post(route('transactions.update', {
                supplier_code: supplier_code,
                supplier_startBongkarMuat: moment().format('YYYY-MM-DD HH:mm:ss')
            }));
        }else if(status === 'FINISHBONGKARMUAT'){
            router.post(route('transactions.update', {
                supplier_code: supplier_code,
                supplier_selesaiBongkarMuat: moment().format('YYYY-MM-DD HH:mm:ss')
            }));
        }else if(status === 'OUT'){
            router.post(route('transactions.update', {
                supplier_code: supplier_code,
                supplier_out: moment().format('YYYY-MM-DD HH:mm:ss')
            }));
        }else{
            toast.error('Format QR Tidak sesuai');
        }
    };

    useEffect(() => {
        if (isScan) {
            const scanner = new Html5QrcodeScanner(
                "reader",
                {
                    qrbox: {
                        width: 450,
                        height: 250,
                    },
                    fps: 5,
                    // aspectRatio: 1.0,
                    facingMode: "environment",
                },
                false
            );

            scanner.render(
                handleScan,
                (error) => {
                    setError(
                        "Gagal mengakses kamera. Pastikan Anda telah memberikan izin kamera."
                    );
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

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (errors && Object.keys(errors).length > 0) {
            Object.values(errors).forEach(errorMessages => {
                errorMessages.forEach(message => {
                    toast.error(message);
                });
            });
        }
    }, [flash, errors]);

    return (
        <AuthenticatedLayout
        // header={
        //     <h2 className="text-xl font-semibold leading-tight text-gray-800">
        //         Scan
        //     </h2>
        // }
        >
            <Head title="Scan" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden  shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                {/* <h3 className="text-lg font-medium mb-2">QR Code Scanner</h3> */}
                                <div className="w-full max-w-md mx-auto flex items-center flex-col">
                                    <div id="reader" className="w-full"></div>
                                    {!isScan && (
                                        <button className="bg-yellow-400 font-semibold font-oxanium py-2 px-5 rounded-md mx-auto" onClick={() => setIsScan(true)}>
                                            Scan Ulang
                                        </button>
                                    )}
                                </div>
                                <div className="my-4 p-4 bg-white text-center rounded">
                                    <p className="font-medium text-2xl">
                                        Scanned Result:
                                    </p>
                                    <p className="text-xl font-bold">{scanData}</p>
                                </div>
                                <div className=" overflow-auto w-full">
                                    <table className=" mb-4 min-w-full table-fixed z-10 h-full border-collapse border-spacing-2 gap-1">
                                        <thead className=" overflow-auto">
                                            <tr className="min-w-full flex text-center gap-3 !font-semibold">
                                                <th
                                                    name="id"
                                                    sort_field={
                                                        queryParams?.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams?.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                    className=" bg-green-300 text-black border-2 border-black w-16 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    No
                                                </th>
                                                <th
                                                    name="problem_date"
                                                    className=" bg-green-300 text-black border-2 border-black w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Kode
                                                </th>
                                                <th className=" border-r-[10px] border-r-lightTheme text-white w-40 -mr-3 h-11 flex items-center !font-semibold justify-center">
                                                    <span className="bg-green-300 text-black border-2 border-black  w-full h-11 flex items-center justify-center rounded-[0.25rem]">
                                                        Nama Supplier
                                                    </span>
                                                </th>
                                                <th
                                                    name="name"
                                                    className=" bg-green-300 text-black border-2 border-black w-44 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Tanggal Datang
                                                </th>
                                                <th
                                                    name="category"
                                                    // sortChanged={sortChanged}
                                                    className=" bg-green-300 text-black border-2 border-black w-28 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Jam Datang
                                                </th>
                                                <th
                                                    name="stopline_duration"
                                                    className=" bg-green-300 text-black border-2 border-black w-48 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Durasi Tunggu
                                                </th>
                                                <th
                                                    name="problem"
                                                    className=" bg-green-300 text-black border-2 border-black w-48 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Durasi Bongkar Muat
                                                </th>
                                                <th
                                                    name="problem_analysis"
                                                    className=" bg-green-300 text-black border-2 border-black w-44 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Tanggal Keluar
                                                </th>
                                                <th
                                                    name="reparation"
                                                    className=" bg-green-300 text-black border-2 border-black w-28 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Jam Keluar
                                                </th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody className="overflow-auto box-border no-scrollbar">
                                            {transactions.data.map(
                                                (transaction, index) => (
                                                    <tr
                                                        className="min-w-full flex text-center gap-3 mt-3"
                                                        key={index}
                                                        // key={transaction.id}
                                                    >
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-white"
                                                                    : "bg-white"
                                                            } px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-16`}
                                                        >
                                                            {(transactions
                                                                
                                                                .meta
                                                                .current_page -
                                                                1) *
                                                                transactions
                                                                    
                                                                    .meta
                                                                    .per_page +
                                                                (index + 1)}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-white"
                                                                    : "bg-white"
                                                            } px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-36`}
                                                        >
                                                            {
                                                                transaction
                                                                    .supplier_code
                                                                    .supplier_code
                                                            }
                                                        </td>
                                                        <td
                                                            className={` overflow-visible  h-11 -mr-3 bg-lightTheme text-ellipsis text-nowrap text-center pr-3 w-40`}
                                                        >
                                                            <span
                                                                className={`${
                                                                    index % 2 !=
                                                                    0
                                                                        ? "bg-white"
                                                                        : "bg-white"
                                                                } border-black border-[1px] rounded-[0.25rem] text-ellipsis overflow-hidden text-nowrap w-full h-full inline-block px-3 py-2 `}
                                                            >
                                                                {
                                                                    transaction
                                                                        .supplier_code
                                                                        .supplier_name
                                                                }
                                                            </span>
                                                        </td>
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-white"
                                                                    : "bg-white"
                                                            } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-44`}
                                                        >
                                                            {/* {" "}
                                                        {
                                                            transaction?.line_name
                                                        }{" "} */}
                                                            {moment(
                                                                transaction.supplier_in
                                                            ).format(
                                                                "DD/MM/YYYY"
                                                            )}
                                                        </td>
                                                        <td
                                                            className={` ${
                                                                transaction.isArrivalOnTime
                                                                    ? "bg-green-100"
                                                                    : "bg-red-100"
                                                            } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-28`}
                                                        >
                                                            {/* {" "}
                                                        {
                                                            transaction.machine_name
                                                        }{" "} */}
                                                            {moment(
                                                                transaction.supplier_in
                                                            ).format("HH:mm")}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-white"
                                                                    : "bg-white"
                                                            } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-48`}
                                                        >
                                                            {/* {transaction.category} */}
                                                            {/* {moment(
                                                            transaction.supplier_in
                                                        ) - moment(transaction.supplier_startBongkarMuat).format("HH:mm")} */}
                                                            {/* {moment
                                                                .duration(
                                                                    transaction.supplier_startBongkarMuat -
                                                                        transaction.supplier_in
                                                                )
                                                                .asMinutes()} */}
                                                            {/* {console.log(
                                                                moment
                                                                    .duration(
                                                                        transaction.supplier_startBongkarMuat -
                                                                            transaction.supplier_in
                                                                    )
                                                                    .asMinutes()
                                                            )} */}
                                                            {transaction.durasi_tunggu}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                transaction.isUnloadingOnTime
                                                                    ? "bg-green-100"
                                                                    : "bg-red-100"
                                                            } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-48`}
                                                        >
                                                            {/* {transaction.stopline_duration +
                                                                " menit"} */}
                                                            {/* menit */}
                                                            {transaction.durasi_bongkarMuat}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-white"
                                                                    : "bg-white"
                                                            } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-44`}
                                                        >
                                                            {
                                                                transaction.supplier_out!='-' ? moment(transaction.supplier_out).format("DD/MM/YYYY") : '-'
                                                            }
                                                        </td>
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-white"
                                                                    : "bg-white"
                                                            } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-28`}
                                                        >
                                                            {
                                                                transaction.supplier_out!='-' ? moment(transaction.supplier_out).format("HH:mm") : '-'
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            {/* </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <Pagination links={transactions.meta.links} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
