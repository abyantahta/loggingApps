import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Dashboard() {
    const [data, setData] = useState('No result');
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [lastScanTime, setLastScanTime] = useState(0);
    const scannerRef = useRef(null);

    const SCAN_COOLDOWN = 2000; // 2 seconds cooldown between scans

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
                aspectRatio: 1.0,
                facingMode: "environment"
            },
            false
        );

        scanner.render(
            (decodedText) => {
                const now = Date.now();
                if (now - lastScanTime < SCAN_COOLDOWN) {
                    return; // Ignore scan if within cooldown period
                }

                setIsScanning(true);
                setLastScanTime(now);
                setData(decodedText);
                setError(null);

                // Reset scanning state after cooldown
                setTimeout(() => {
                    setIsScanning(false);
                }, SCAN_COOLDOWN);
            },
            (error) => {
                console.error(error);
                // setError('Failed to access camera. Please ensure you have granted camera permissions.');
            }
        );

        scannerRef.current = scanner;

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
            }
        };
    }, [lastScanTime]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <h3 className="text-lg font-medium mb-2">QR Code Scanner</h3>
                                <div className="w-full max-w-md mx-auto">
                                    <div id="reader" className="w-full relative">
                                        {isScanning && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                                <div className="text-white text-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                                                    <p>Processing...</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {error && (
                                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                                        <p>{error}</p>
                                    </div>
                                )}
                                <div className="mt-4 p-4 bg-gray-100 rounded">
                                    <p className="font-medium">Scanned Result:</p>
                                    <p>{data}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
