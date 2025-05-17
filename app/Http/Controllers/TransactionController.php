<?php

namespace App\Http\Controllers;

use App\Exports\TransactionExport;
use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\TransactionExportResource;
use App\Http\Resources\TransactionResource;
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
        if(request("dateStart") && request("dateEnd")){
            $start = Carbon::parse(request("dateStart"));
            $end = Carbon::parse(request("dateEnd"));
            if(request("dateStart") == request("dateEnd")){
                $query->whereDate("transactions.supplier_in",$start)->get();
            }else{
                $query->whereBetween('transactions.supplier_in', [$start,$end])->get();
            }
        }else if(request("dateStart")){
            $start = Carbon::parse(request("dateStart"));
            $query->whereDate("transactions.supplier_in",$start)->get();
        }

        if(request("supplier_code")){
            $query->where("transactions.supplier_code",request("supplier_code"))->get();
        }
        //
        $transactions = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();
        return inertia('Transactions',[
            'transactions' => TransactionResource::collection($transactions),
            'queryParams' => request()->query() ?: null,
            'suppliers' => $suppliers
        ]);
        //
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
        
        Transaction::create($data);
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
        // dd($keys);
        // $transaction = Transaction::where('supplier_code', $data['supplier_code']);
        if($keys[1]==="supplier_startBongkarMuat"){
            $transaction = Transaction::where('supplier_code', $data['supplier_code'])->whereNull($keys[1])->first();            
        }else if($keys[1]==="supplier_selesaiBongkarMuat"){
            $transaction = Transaction::where('supplier_code', $data['supplier_code'])->whereNull($keys[1])->whereNotNull('supplier_startBongkarMuat')->first();            
        }else if($keys[1]==="supplier_out"){
            $transaction = Transaction::where('supplier_code', $data['supplier_code'])->whereNull($keys[1])->whereNotNull('supplier_startBongkarMuat')->whereNotNull('supplier_selesaiBongkarMuat')->first();            
        }
        // dd($transaction);
        if($transaction){
            $transaction->update($data);
            return redirect()->route('scan')->with('success', 'Data berhasil disimpan');
        }else{
            return redirect()->route('scan')->with('error', 'Data gagal disimpan, Supplier Code '.$data['supplier_code'].' tidak ditemukan atau tidak mengikuti flow yang benar');
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
