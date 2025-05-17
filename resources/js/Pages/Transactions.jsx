import DatePicker from "@/Components/DatePicker";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import moment from "moment";
import React from "react";

const Transactions = ({
    transactions,
    queryParams = null,
    success = null,
    suppliers,
}) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            console.log(name, value);
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
    const queryParamsExport = () => {
        let string = "?";
        if (queryParams["supplier_code"])

            string += `&supplier_code=${queryParams["supplier_code"]}`;
        if (queryParams["dateStart"])
            string += `&dateStart=${queryParams["dateStart"]}`;
        if (queryParams["dateEnd"])
            string += `&dateEnd=${queryParams["dateEnd"]}`;

        // string += `&page=1`;
        return string;
    };
    console.log(suppliers);
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
                <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                    <div className="overflow-x-hidden  min-h-screen shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                {/* <div className="bg-lightTheme  shadow-lg sm:rounded-lg"> */}
                                <div className=" text-gray-900 ">
                                    <div className="mb-6 flex flex-col z-40 gap-y-2 lg:flex-row justify-between">
                                        {/* <TextInput
                                    className="w-full lg:w-56 border-gray-700 border-[3px] placeholder:italic text-greenTheme font-normal focus:border-greenTheme focus:ring-greenTheme placeholder:text-greenTheme"
                                    defaultValue={queryParams.no_asset}
                                    placeholder="Search by no asset"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "no_asset",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) =>
                                        onKeyPress("no_asset", e)
                                    }
                                /> */}
                                        <div className="flex z-40 flex-col lg:flex-row gap-x-4 gap-y-2 font-oxanium">
                                            <SelectInput
                                                className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme lg:w-52"
                                                defaultValue={
                                                    queryParams?.supplier_code
                                                }
                                                onChange={(e) =>
                                                    searchFieldChanged(
                                                        "supplier_code",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Suppliers
                                                </option>
                                                {suppliers.map((supplier) => (
                                                    <option
                                                        key={
                                                            supplier.supplier_code
                                                        }
                                                        value={
                                                            supplier.supplier_code
                                                        }
                                                    >
                                                        {supplier.supplier_name}
                                                    </option>
                                                ))}
                                            </SelectInput>
                                            <DatePicker
                                                searchFieldChanged={
                                                    searchFieldChanged
                                                }
                                                queryParams={queryParams}
                                            />
                                        </div>
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className=" overflow-auto w-full ">
                                    <table className=" mb-4 min-w-full table-fixed z-10 h-full border-collapse border-spacing-2 gap-1">
                                        <thead className=" overflow-auto">
                                            <tr className="min-w-full flex text-center gap-3 !font-semibold">
                                                <TableHeading
                                                    name="id"
                                                    sort_field={
                                                        queryParams?.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams?.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                    className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-16 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    No
                                                </TableHeading>
                                                <TableHeading
                                                    name="supplier_code"
                                                    sort_field={
                                                        queryParams?.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams?.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                    className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Kode
                                                </TableHeading>
                                                {/* <th className='text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-12 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>No</th> */}
                                                <th className=" text-white w-40 h-11 flex items-center !font-semibold justify-center">
                                                    <span className="text-blackTheme font-oxanium bg-yellowTheme border-2 border-black  w-full h-11 flex items-center justify-center rounded-[0.25rem]">
                                                        Nama Supplier
                                                    </span>
                                                </th>
                                                <TableHeading
                                                    name="supplier_in"
                                                    sort_field={
                                                        queryParams?.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams?.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                    className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-44 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Tanggal Datang
                                                </TableHeading>
                                                {/* <TableHeading
                                            name="machine"
                                            sort_field={
                                                queryParams.sort_field
                                            }
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                            className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                        >
                                            Jam Datang
                                        </TableHeading> */}
                                                <th
                                                    name="category"
                                                    // sortChanged={sortChanged}
                                                    className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-28 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Jam Datang
                                                </th>
                                                {/* <TableHeading
                                                name="durasi_tunggu"
                                                sort_field={
                                                    queryParams?.sort_field
                                                }
                                                sort_direction={
                                                    queryParams?.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-48 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Durasi Tunggu
                                            </TableHeading> */}
                                                <th
                                                    name="durasi_tunggu"
                                                    // sortChanged={sortChanged}
                                                    className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-48 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Durasi Tunggu
                                                </th>

                                                <th
                                                    name="problem"
                                                    // sort_field={
                                                    //     queryParams.sort_field
                                                    // }
                                                    // sort_direction={
                                                    //     queryParams.sort_direction
                                                    // }
                                                    // sortChanged={sortChanged}
                                                    className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-48 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Durasi Bongkar Muat
                                                </th>
                                                <TableHeading
                                                    name="supplier_out"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                    className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-44 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Tanggal Keluar
                                                </TableHeading>
                                                <th
                                                    name="reparation"
                                                    // sort_field={
                                                    //     queryParams.sort_field
                                                    // }
                                                    // sort_direction={
                                                    //     queryParams.sort_direction
                                                    // }
                                                    // sortChanged={sortChanged}
                                                    className=" text-blackTheme font-oxanium bg-yellowTheme border-2 border-black w-28 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
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
                                                                    ? "bg-green-100"
                                                                    : "bg-white"
                                                            } px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-16`}
                                                        >
                                                            {(transactions.meta
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
                                                                    ? "bg-green-100"
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
                                                            className={` overflow-visible  h-11  bg-lightTheme text-ellipsis text-nowrap text-center w-40`}
                                                        >
                                                            <span
                                                                className={`${
                                                                    index % 2 !=
                                                                    0
                                                                        ? "bg-green-100"
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
                                                                    ? "bg-green-100"
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
                                                                index % 2 != 0
                                                                    ? "bg-green-100"
                                                                    : "bg-white"
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
                                                                    ? "bg-green-100"
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
                                                            {
                                                                transaction.durasi_tunggu
                                                            }
                                                        </td>
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-green-100"
                                                                    : "bg-white"
                                                            } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-48`}
                                                        >
                                                            {/* {transaction.stopline_duration +
                                                            " menit"} */}
                                                            {/* menit */}
                                                            {
                                                                transaction.durasi_bongkarMuat
                                                            }
                                                        </td>
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-green-100"
                                                                    : "bg-white"
                                                            } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-44`}
                                                        >
                                                            {transaction.supplier_out !=
                                                            "-"
                                                                ? moment(
                                                                      transaction.supplier_out
                                                                  ).format(
                                                                      "DD/MM/YYYY"
                                                                  )
                                                                : "-"}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-green-100"
                                                                    : "bg-white"
                                                            } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-black border-[1px] rounded-[0.25rem] w-28`}
                                                        >
                                                            {transaction.supplier_out !=
                                                            "-"
                                                                ? moment(
                                                                      transaction.supplier_out
                                                                  ).format(
                                                                      "HH:mm"
                                                                  )
                                                                : "-"}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            {/* </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination links={transactions.meta.links} />
                            </div>
                        <a
                                    href={`transactions/export${queryParamsExport()}`}
                                    className="w-full md:w-72  py-3 px-4 tracking-wide text-center hover:bg-blackTheme hover:text-yellowTheme hover:duration-150 bg-yellowTheme font-oxanium text-blackTheme font-bold flex items-center justify-center gap-2 rounded-md hover:brightness-110 duration-150"
                                >
                                    {/* <ArrowLeftStartOnRectangleIcon className="w-6" /> */}
                                    Export Transactions
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Transactions;
