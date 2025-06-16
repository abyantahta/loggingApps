<?php

namespace App\Http\Controllers;

use App\Exports\TransactionExport;
use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\TransactionExportResource;
use App\Http\Resources\TransactionResource;
use App\Models\ArrivalRule;
use App\Models\Supplier;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortField = request("sort_field", "transactions.created_at");
        $sortDirection = request("sort_direction", "desc");
        $suppliers = Supplier::all();

        $query = Transaction::query();
        if (request("dateStart") && request("dateEnd")) {
            $start = Carbon::parse(request("dateStart"));
            $end = Carbon::parse(request("dateEnd"));
            if (request("dateStart") == request("dateEnd")) {
                $query->whereDate("transactions.supplier_in", $start)->get();
            } else {
                $query->whereBetween('transactions.supplier_in', [$start, $end])->get();
            }
        } else if (request("dateStart")) {
            $start = Carbon::parse(request("dateStart"));
            $query->whereDate("transactions.supplier_in", $start)->get();
        }

        if (request("supplier_code")) {
            $query->where("transactions.supplier_code", request("supplier_code"))->get();
        }
        //
        $transactions = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();
        return inertia('Transactions', [
            'transactions' => TransactionResource::collection($transactions),
            'queryParams' => request()->query() ?: null,
            'suppliers' => $suppliers
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        $rules = ArrivalRule::query()->where('supplier_code', $data["supplier_code"])->get();

        $transactionIsExist_rit1 = Transaction::where('supplier_code', $data["supplier_code"])->where('rit', 1)->whereDate('supplier_in', Carbon::today())->exists();
        $transactionIsExist_rit2 = Transaction::where('supplier_code', $data["supplier_code"])->where('rit', 2)->whereDate('supplier_in', Carbon::today())->exists();
        // dd($transactionIsExist_rit1,$transactionIsExist_rit2);
        $rit = 1;
        
        // dd($transactionIsExist_rit1,count($rules) == 2);

        if (count($rules) == 2) {
            //SUBHOURS AGAR ADA TOLERANSI JIKA DATANG KECEPETAN 2 JAM
            $ruleRit1 = Carbon::parse($rules[0]->jam_kedatangan)->subHours(2)->format('H:i');
            $ruleRit2 = Carbon::parse($rules[1]->jam_kedatangan)->format('H:i');
            //DIBUAT SEPERTI INI AGAR DIA BENTUKNYA OBJECT
            $timeActual = Carbon::createFromFormat('H:i', Carbon::parse($data["supplier_in"])->format('H:i')); // 6 AM
            // dd($transactionIsExist_rit1,$transactionIsExist_rit2);
            if ($timeActual->between($ruleRit1, $ruleRit2, true) && !$transactionIsExist_rit1) {
                $rit = 1;
            } else if ($timeActual->between($ruleRit2, $ruleRit1, true) && !$transactionIsExist_rit2) {
                $rit = 2;
            } else {
                return redirect()->route('scan')->with('error', "Transaksi terindikasi duplikat karena semua transaksi hari ini sudah dilakukan");
            }
        } else if ($transactionIsExist_rit1) {
            return redirect()->route('scan')->with('error', "Transaksi terindikasi duplikat karena semua transaksi hari ini sudah dilakukan");
        }
        $isArrivalOnTime = ($rit == 1) ? (Carbon::parse($data["supplier_in"])<Carbon::parse($rules[0]->jam_kedatangan)) : (Carbon::parse($data["supplier_in"])<Carbon::parse($rules[1]->jam_kedatangan));


        Transaction::create([
            'supplier_in' => $data["supplier_in"],
            'supplier_code' => $data["supplier_code"],
            'rit' => $rit,
            'isArrivalOnTime' => $isArrivalOnTime
        ]);
        return redirect()->route('scan')->with('success', 'Data berhasil disimpan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        $transaction = Transaction::find($transaction->id);
        return to_route('scan')->with('success', 'Data berhasil disimpan');

        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request)
    {
        $data = $request->validated();
        $keys = array_keys($data);
        $isUnloadingOnTime = false;
        // dd($data);
        // $transaction = Transaction::where('supplier_code', $data['supplier_code']);
        if ($keys[1] === "supplier_startBongkarMuat") {
            $transaction = Transaction::where('supplier_code', $data['supplier_code'])->whereNull($keys[1])->first();
        } else if ($keys[1] === "supplier_selesaiBongkarMuat") {
            $transaction = Transaction::where('supplier_code', $data['supplier_code'])->whereNull($keys[1])->whereNotNull('supplier_startBongkarMuat')->first();
            
            $durasiBongkar = abs(Carbon::parse($data['supplier_selesaiBongkarMuat'])->diffInMinutes($transaction->supplier_startBongkarMuat));
            $rules = ArrivalRule::query()->where('supplier_code', $data["supplier_code"])->where('rit',$transaction->rit)->first();
            $isUnloadingOnTime = ($durasiBongkar < $rules->durasi_bongkar);
            $data = array_merge($data,["isUnloadingOnTime"=>$isUnloadingOnTime]);
            // dd($isUnloadingOnTime,$data);
        } else if ($keys[1] === "supplier_out") {
            $transaction = Transaction::where('supplier_code', $data['supplier_code'])->whereNull($keys[1])->whereNotNull('supplier_startBongkarMuat')->whereNotNull('supplier_selesaiBongkarMuat')->first();
        }
        // dd($transaction);
        if ($transaction) {
            $transaction->update($data);
            return redirect()->route('scan')->with('success', 'Data berhasil disimpan');
        } else {
            return redirect()->route('scan')->with('error', 'Data gagal disimpan, Supplier Code ' . $data['supplier_code'] . ' tidak ditemukan atau tidak mengikuti flow yang benar');
        }
    }
    public function export()
    {
        $dateStart = request("dateStart");
        $dateEnd = request("dateEnd");
        $supplier_code = request("supplier_code");
        // $line_id = request("line_id");
        // dd('ja;d');
        // dd($dateStart, $dateEnd,$cluster_id,$line_id);
        return Excel::download(new TransactionExport($supplier_code, $dateStart, $dateEnd), 'Supplier Log.xlsx');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
