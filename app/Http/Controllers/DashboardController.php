<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\ArrivalRule;
use App\Models\Supplier;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {

        $sortField = request("sort_field", "transactions.created_at");
        $sortDirection = request("sort_direction", "desc");
        $suppliers = Supplier::all();

        $query = Transaction::query();
        // if(request("dateStart") && request("dateEnd")){
        //     $start = Carbon::parse(request("dateStart"));
        //     $end = Carbon::parse(request("dateEnd"));
        //     if(request("dateStart") == request("dateEnd")){
        //         $query->whereDate("transactions.supplier_in",$start)->get();
        //     }else{
        //         $query->whereBetween('transactions.supplier_in', [$start,$end])->get();
        //     }
        // }else if(request("dateStart")){
        //     $start = Carbon::parse(request("dateStart"));
        //     $query->whereDate("transactions.supplier_in",$start)->get();
        // }

        if (request("supplier_code")) {
            $query->where("transactions.supplier_code", request("supplier_code"))->get();
        }
        // dd(request('supplier_code'));
        $dataRit1 = [];
        $dataRit2 = [];

        $transactions_rit1 = Transaction::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 1)->whereMonth('supplier_in', 4)->whereNotNull('supplier_out')->orderBy('supplier_in', 'ASC')->get();
        $targetRit1 = Carbon::parse(ArrivalRule::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 1)->get()->first()->jam_kedatangan);
        $targetRit1 = ($targetRit1->format('H') * 60) + $targetRit1->format('i');

        foreach ($transactions_rit1 as $data) {
            $supplierDateTime = Carbon::parse($data["supplier_in"]);

            $dataRit1[] = [
                "x" => $supplierDateTime->format('d'),
                "y" => ($supplierDateTime->format('H') * 60) + $supplierDateTime->format('i'),
            ];  // Store only date
        }

        $targetRit2 = ArrivalRule::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 2)->get()->first();
        //cek apakah ada rit2?
        if ($targetRit2) {
            $targetRit2 = (Carbon::parse($targetRit2->jam_kedatangan)->format('H') * 60) + Carbon::parse($targetRit2->jam_kedatangan)->format('i');
            $transactions_rit2 = Transaction::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 2)->whereMonth('supplier_in', 4)->whereNotNull('supplier_out')->orderBy('supplier_in', 'ASC')->get();

            foreach ($transactions_rit2 as $data) {
                $supplierDateTime = Carbon::parse($data["supplier_in"]);
                $dataRit2[] = [
                    "x" => $supplierDateTime->format('d'),
                    "y" => ($supplierDateTime->format('H') * 60) + $supplierDateTime->format('i'),
                ];  // Store only date
                // $minutesSinceMidnight[] = ($supplierDateTime->format('H') * 60) + $supplierDateTime->format('i'); // Minutes since 00:00
            }
        }

        $kedatangan_rit1 = [$dataRit1, $targetRit1];
        $kedatangan_rit2 = empty($dataRit2) ? null : [$dataRit2, $targetRit2];

        //BONGKAR MUAT
        //RIT 1
        $transactions_bongkarmuat_rit1 = Transaction::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 1)->whereMonth('supplier_in', 4)->whereNotNull('supplier_out')->orderBy('supplier_in', 'ASC')->get();
        $targetBongkarRit1 = ArrivalRule::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 1)->get()->first()->durasi_bongkar;
        // $targetBongkarRit1 = ($targetBongkarRit1->format('H') * 60) + $targetBongkarRit1->format('i');

        $durasiBongkarMuatRit1 = [];
        $dateBongkarMuatRit1 = [];
        // $dataBongkarMuatRit2 = [];
        foreach ($transactions_bongkarmuat_rit1 as $data) {
            $supplierInTime = Carbon::parse($data["supplier_in"]);
            $supplierStartBongkar = Carbon::parse($data["supplier_startBongkarMuat"]);
            $supplierSelesaiBongkar = Carbon::parse($data["supplier_selesaiBongkarMuat"]);


            $durasiBongkarMuatRit1[] = $supplierStartBongkar->diffInMinutes($supplierSelesaiBongkar);  // Store only date
            $dateBongkarMuatRit1[] = $supplierInTime->format('d');
        }
        $bongkarMuat_rit1 = [$durasiBongkarMuatRit1, $dateBongkarMuatRit1, $targetBongkarRit1];

        //RIT 2
        $durasiBongkarMuatRit2 = [];
        $dateBongkarMuatRit2= [];
        $targetBongkarRit2 = ArrivalRule::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 2)->get()->first();
        // dd($targetRit1,$targetBongkarRit2);
        if($targetBongkarRit2){
            $targetBongkarRit2 = $targetBongkarRit2->durasi_bongkar;
            $transactions_bongkarmuat_rit2 = Transaction::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 2)->whereMonth('supplier_in', 4)->whereNotNull('supplier_out')->orderBy('supplier_in', 'ASC')->get();
            // $targetBongkarRit1 = ($targetBongkarRit1->format('H') * 60) + $targetBongkarRit1->format('i');
    
            // $dataBongkarMuatRit2 = [];
            foreach ($transactions_bongkarmuat_rit2 as $data) {
                $supplierInTime = Carbon::parse($data["supplier_in"]);
                $supplierStartBongkar = Carbon::parse($data["supplier_startBongkarMuat"]);
                $supplierSelesaiBongkar = Carbon::parse($data["supplier_selesaiBongkarMuat"]);
    
    
                $durasiBongkarMuatRit2[] = $supplierStartBongkar->diffInMinutes($supplierSelesaiBongkar);  // Store only date
                $dateBongkarMuatRit2[] = $supplierInTime->format('d');
            }
        }
        $bongkarMuat_rit2 = [$durasiBongkarMuatRit2, $dateBongkarMuatRit2, $targetBongkarRit2];

        $transactions = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();
        return inertia('Dashboard', [
            'transactions' => TransactionResource::collection($transactions),
            'queryParams' => request()->query() ?: null,
            'suppliers' => $suppliers,
            'kedatangan_rit1' => $kedatangan_rit1,
            'kedatangan_rit2' => $kedatangan_rit2,
            'bongkarMuat_rit1' => $bongkarMuat_rit1,
            'bongkarMuat_rit2' => $bongkarMuat_rit2,
            // 'durasiBongkarMuat_rit2' => $durasiBongkarMuat_rit2
        ]);
        //
    }
    //
}
