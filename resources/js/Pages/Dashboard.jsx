import DatePicker from "@/Components/DatePicker";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import moment from "moment";
import React from "react";
// import React from "react";
import Chart from "react-apexcharts";

const Dashboard = ({
    transactions,
    queryParams = null,
    success = null,
    suppliers,
    kedatangan_rit1,
    kedatangan_rit2,
    bongkarMuat_rit1,
    bongkarMuat_rit2,
    months,
    years,
}) => {
    queryParams = queryParams || {};
    console.log("bongkarMuat_rit2", bongkarMuat_rit2);
    // console.log('kedatangan_rit2',kedatangan_rit2);
    const searchFieldChanged = (name, value) => {
        if (value) {
            console.log(name, value);
            queryParams[name] = value;
            queryParams["page"] = 1;
        } else {
            delete queryParams[name];
        }
        router.get(route("dashboard.index"), queryParams);
    };

    const ChartKedatanganRit1 = () => {
        const options = {
            yaxis: {
                min: kedatangan_rit1[1] - 60, // 12:00 → 12 * 60
                max: kedatangan_rit1[1] + 60, // 15:00 → 15 * 60
                tickAmount: 6, // Shows every hour clearly
                labels: {
                    formatter: (value) => {
                        const hours = Math.floor(value / 60);
                        const minutes = value % 60;
                        return `${hours}.${minutes
                            .toString()
                            .padStart(2, "0")}`;
                    },
                },
            },
            annotations: {
                yaxis: [
                    {
                        y: kedatangan_rit1[1] - 15, // 12:30
                        borderColor: "#FF0000",
                        label: {
                            text: "15 Minutes early",
                            style: {
                                color: "#fff",
                                background: "#FF0000",
                            },
                        },
                    },
                    {
                        y: kedatangan_rit1[1] + 15, // 14:00
                        borderColor: "#FF0000",
                        label: {
                            text: "15 Minutes late",
                            style: {
                                color: "#fff",
                                background: "#FF0000",
                            },
                        },
                    },
                ],
            },
            markers: {
                size: 5,
            },
        };

        const series = [
            {
                name: "Jam Kedatangan",
                data: kedatangan_rit1[0],
            },
        ];

        return (
            <Chart options={options} series={series} type="line" width="100%" />
        );
    };
    const ChartKedatanganRit2 = () => {
        const options = {
            yaxis: {
                min: kedatangan_rit2[1] - 60, // 12:00 → 12 * 60
                max: kedatangan_rit2[1] + 60, // 15:00 → 15 * 60
                tickAmount: 6, // Shows every hour clearly
                labels: {
                    formatter: (value) => {
                        const hours = Math.floor(value / 60);
                        const minutes = value % 60;
                        return `${hours}.${minutes
                            .toString()
                            .padStart(2, "0")}`;
                    },
                },
            },
            annotations: {
                yaxis: [
                    {
                        y: kedatangan_rit2[1] - 15, // 12:30
                        borderColor: "#FF0000",

                        label: {
                            text: "15 Minutes early",
                            style: {
                                color: "#fff",
                                background: "#FF0000",
                            },
                        },
                    },
                    {
                        y: kedatangan_rit2[1] + 15, // 14:00
                        borderColor: "#FF0000",
                        label: {
                            text: "15 Minutes late",
                            style: {
                                color: "#fff",
                                background: "#FF0000",
                            },
                        },
                    },
                ],
            },
            markers: {
                size: 5,
            },
        };

        const series = [
            {
                name: "Jam Kedatangan",
                data: kedatangan_rit2[0],
            },
        ];

        return (
            <Chart options={options} series={series} type="line" width="100%" />
        );
    };

    const ChartBongkarMuatRit1 = () => {
        const options = {
            chart: {
                type: "bar",
                height: 350,
            },
            series: [
                {
                    name: "Durasi Bongkar",
                    data: bongkarMuat_rit1[0],
                },
            ],
            xaxis: {
                categories: bongkarMuat_rit1[1],
            },
            annotations: {
                yaxis: [
                    {
                        y: bongkarMuat_rit1[2], // Static line at Y = 50
                        borderColor: "#FF0000",
                        label: {
                            text: "Target",
                            style: {
                                color: "#fff",
                                background: "#FF0000",
                            },
                        },
                    },
                ],
            },
        };

        return (
            <Chart
                options={options}
                series={options.series}
                type="bar"
                // height={437}
            />
        );
    };
    const ChartBongkarMuatRit2 = () => {
        const options = {
            chart: {
                type: "bar",
                height: 350,
            },
            series: [
                {
                    name: "Durasi Bongkar",
                    data: bongkarMuat_rit2[0],
                },
            ],
            xaxis: {
                categories: bongkarMuat_rit2[1],
            },
            annotations: {
                yaxis: [
                    {
                        y: bongkarMuat_rit2[2], // Static line at Y = 50
                        borderColor: "#FF0000",
                        label: {
                            text: "Target",
                            style: {
                                color: "#fff",
                                background: "#FF0000",
                            },
                        },
                    },
                ],
            },
        };

        return (
            <Chart
                options={options}
                series={options.series}
                type="bar"
                // height={350}
            />
        );
    };

    // export default BarChart;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-[100rem]  sm:px-6 lg:px-8">
                    <div className="overflow-x-hidden  min-h-screen shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900"> */}
                        <div className="mb-4 p-6 text-gray-900 ">
                            <div className=" text-gray-900 ">
                                <div className="mb-6 flex md:flex-col  flex-row z-40 gap-y-2 lg:flex-row justify-between">
                                    <div className="flex  w-full z-40 flex-col lg:flex-row gap-x-4 gap-y-2 font-oxanium">
                                        <SelectInput
                                            className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme lg:w-64"
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
                                            <option value="">Suppliers</option>
                                            {suppliers.map((supplier) => (
                                                <option
                                                    key={supplier.supplier_code}
                                                    value={
                                                        supplier.supplier_code
                                                    }
                                                >
                                                    {supplier.supplier_name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <SelectInput
                                            className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme lg:w-64"
                                            defaultValue={
                                                queryParams?.year
                                            }
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "year",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Tahun</option>
                                            {years.map((year,index) => (
                                                <option
                                                    key={year}
                                                    value={
                                                        year
                                                    }
                                                >
                                                    {year}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <SelectInput
                                            className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme lg:w-64"
                                            defaultValue={
                                                queryParams?.month
                                            }
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "month",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Bulan</option>
                                            {months.map((month,index) => (
                                                <option
                                                    key={month}
                                                    value={
                                                        index+1
                                                    }
                                                >
                                                    {month}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        {/* <DatePicker
                                            searchFieldChanged={
                                                searchFieldChanged
                                            }
                                            queryParams={queryParams}
                                        /> */}
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="  flex md:flex-row flex-col">
                                <div className="md:w-1/2 w-full">
                                    <h1 className=" w-full text-3xl font-bold text-center font-oxanium mb-5 mt-8">
                                        KEDATANGAN SUPPLIER{" "}
                                        {kedatangan_rit2 ? "(Rit 1)" : ""}
                                    </h1>
                                    <ChartKedatanganRit1 />
                                </div>
                                {kedatangan_rit2 ? (
                                    <>
                                        <div className="md:w-1/2 w-full">
                                            <h1 className=" w-full text-3xl font-bold text-center font-oxanium mb-5 mt-8">
                                                KEDATANGAN SUPPLIER (Rit 2)
                                            </h1>
                                            {/* <ChartKedatanganRit1 />
                                             */}
                                            <ChartKedatanganRit2 />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="md:w-1/2 w-full">
                                            <h1 className=" w-full text-3xl font-bold text-center font-oxanium mb-5 mt-8">
                                                DURASI BONGKAR
                                            </h1>
                                            <ChartBongkarMuatRit1 />
                                        </div>
                                        {/* <div className="w-1/2 ">
                                                <h1 className=" w-full text-3xl font-bold text-center font-oxanium mb-5 mt-8">
                                                    KEDATANGAN SUPPLIER (Rit 2)
                                                </h1>
                                                <ChartKedatanganRit2 />
                                            </div> */}
                                    </>
                                )}
                            </div>
                            {kedatangan_rit2 ? (
                                <>
                                    <div className="  flex lg:flex-row flex-col">
                                        <div className="lg:w-1/2 w-full">
                                            <h1 className=" w-full text-3xl font-bold text-center font-oxanium mb-5 mt-8">
                                                DURASI BONGKAR (Rit 1)
                                            </h1>
                                            <ChartBongkarMuatRit1 />
                                        </div>
                                        <div className="lg:w-1/2 w-full">
                                            <h1 className=" w-full text-3xl font-bold text-center font-oxanium mb-5 mt-8">
                                                DURASI BONGKAR (Rit 2)
                                            </h1>
                                            {/* <ChartKedatanganRit1 />
                                             */}
                                            <ChartBongkarMuatRit2 />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
