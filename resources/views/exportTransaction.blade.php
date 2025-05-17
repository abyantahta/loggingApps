<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    @php
        $transactionsDecode = json_decode($transactions);
        // console.log($transactionsDecode)
    @endphp;

        <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Kode Supplier</th>
                <th>Nama Supplier</th>
                <th>Tanggal Masuk</th>
                <th>Jam Masuk</th>
                <th>Durasi Tunggu</th>
                <th>Durasi Bongkar Muat</th>
                <th>Tanggal Keluar</th>
                <th>Jam Keluar</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($transactionsDecode as $transaction)
                <tr>
                    <td>{{ $loop->index + 1 }}</td>
                    <td>{{ $transaction->supplier_code->supplier_code }}</td>
                    <td>{{ $transaction->supplier_code->supplier_name }}</td>
                    <td>{{ \Carbon\Carbon::parse($transaction->supplier_in)->format('d M Y') }}</td>
                    <td>{{ \Carbon\Carbon::parse($transaction->supplier_in)->format('H:m') }}</td>
                    <td>{{ $transaction->durasi_tunggu }}</td>
                    <td>{{ $transaction->durasi_bongkarMuat}}</td>
                    {{-- <td>{{ \Carbon\Carbon::parse($transaction->supplier_out)->format('d M Y') }}</td> --}}
                    <td>{{ $transaction->supplier_out == '-' ? $transaction->supplier_out : \Carbon\Carbon::parse($transaction->supplier_out)->format('d M Y') }}</td>
                    <td>{{ $transaction->supplier_out == '-' ? $transaction->supplier_out : \Carbon\Carbon::parse($transaction->supplier_out)->format('H:m') }}</td>

                    {{-- <td>{{ \Carbon\Carbon::parse($transaction->supplier_out)->setTimezone('Asia/Jakarta')->format('DD MM YYYY') }}</td>
                    <td>{{ \Carbon\Carbon::parse($transaction->supplier_out)->setTimezone('Asia/Jakarta')->format('HH:mm') }}</td> --}}

        
                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>