<?php

namespace App\Exports;

use App\Http\Resources\TransactionExportResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;

class TransactionExport implements FromView
{
    protected $supplier_code;
    // protected $line_id;
    protected $dateEnd;
    protected $dateStart;
    public function __construct($supplier_code = null,$dateStart = null,   $dateEnd = null)
    {
        $this->supplier_code = intval($supplier_code);
        // $this->line_id = intval($line_id);
        $this->dateStart = $dateStart;
        $this->dateEnd = $dateEnd;
    }
    public function view(): View
    {
        // dd($this->line_id);

        // $transactions = Transaction::query()->select('transactions.*','clusters.name AS cluster_name', 'lines.name AS line_name', 'machines.name AS machine_name', 'users.name as pic')->leftJoin('clusters','clusters.id','=','transactions.cluster_id')->leftJoin('lines', 'lines.id', '=', 'transactions.line_id')->leftJoin('machines', 'machines.id', '=', 'transactions.machine_id')->leftJoin('users', 'users.id', '=', 'transactions.created_by');
        $transactions = Transaction::query();
        // dd($transactions);
        if($this->supplier_code){
            $transactions->where('supplier_code',$this->supplier_code);
        }
        if(($this->dateEnd == null && $this->dateStart != null) || ($this->dateEnd == $this->dateStart && $this->dateStart != null)) {
            $transactions->whereDate('transactions.supplier_in', Carbon::parse($this->dateStart));
            // dd($this->dateEnd == null && $this->dateStart != null);
        }else if($this->dateEnd != null && $this->dateStart != null){
            $transactions->whereBetween('transactions.supplier_in', [Carbon::parse($this->dateStart), Carbon::parse($this->dateEnd)]);
        }
        // dd($this->supplier_code,$this->dateEnd,$this->dateStart);
        
        $getTransactions = (clone $transactions)->get();
        return view('exportTransaction', [
            "transactions" => TransactionExportResource::collection($getTransactions)->toJson(),
        ]);
    }
}
