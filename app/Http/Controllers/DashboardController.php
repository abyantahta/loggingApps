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
        $years = Transaction::selectRaw('YEAR(supplier_in) as year')->distinct()->pluck('year')->toArray();

        // print_r($years);
        if (request("supplier_code")) {
            $query->where("transactions.supplier_code", request("supplier_code"))->get();
        }
        
        // dd(request('year'));
        $dataRit1 = [];
        $dataRit2 = [];

        $transactions_rit1 = Transaction::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 1)->whereMonth('supplier_in', request('month')?:Carbon::now()->format('m'))->whereYear('supplier_in', request('year')?:Carbon::now()->format('Y'))->whereNotNull('supplier_out')->orderBy('supplier_in', 'ASC')->get();
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
        if ($targetRit2) {
            $targetRit2 = (Carbon::parse($targetRit2->jam_kedatangan)->format('H') * 60) + Carbon::parse($targetRit2->jam_kedatangan)->format('i');
            $transactions_rit2 = Transaction::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 2)->whereMonth('supplier_in', request('month')?:Carbon::now()->format('m'))->whereYear('supplier_in', request('year')?:Carbon::now()->format('Y'))->whereNotNull('supplier_out')->orderBy('supplier_in', 'ASC')->get();

            foreach ($transactions_rit2 as $data) {
                $supplierDateTime = Carbon::parse($data["supplier_in"]);
                $dataRit2[] = [
                    "x" => $supplierDateTime->format('d'),
                    "y" => ($supplierDateTime->format('H') * 60) + $supplierDateTime->format('i'),
                ];  // Store only date
            }
        }

        $kedatangan_rit1 = [$dataRit1, $targetRit1];
        $kedatangan_rit2 = empty($dataRit2) ? null : [$dataRit2, $targetRit2];

        //BONGKAR MUAT
        //RIT 1
        $transactions_bongkarmuat_rit1 = Transaction::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 1)->whereMonth('supplier_in', request('month')?:Carbon::now()->format('m'))->whereYear('supplier_in', request('year')?:Carbon::now()->format('Y'))->whereNotNull('supplier_out')->orderBy('supplier_in', 'ASC')->get();
        $targetBongkarRit1 = ArrivalRule::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 1)->get()->first()->durasi_bongkar;

        $durasiBongkarMuatRit1 = [];
        $dateBongkarMuatRit1 = [];
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
        if($targetBongkarRit2){
            $targetBongkarRit2 = $targetBongkarRit2->durasi_bongkar;
            $transactions_bongkarmuat_rit2 = Transaction::query()->where('supplier_code', request("supplier_code") ?: 'L0284')->where('rit', 2)->whereMonth('supplier_in', request('month')?:Carbon::now()->format('m'))->whereYear('supplier_in', request('year')?:Carbon::now()->format('Y'))->whereNotNull('supplier_out')->orderBy('supplier_in', 'ASC')->get();
    
            foreach ($transactions_bongkarmuat_rit2 as $data) {
                $supplierInTime = Carbon::parse($data["supplier_in"]);
                $supplierStartBongkar = Carbon::parse($data["supplier_startBongkarMuat"]);
                $supplierSelesaiBongkar = Carbon::parse($data["supplier_selesaiBongkarMuat"]);
    
    
                $durasiBongkarMuatRit2[] = $supplierStartBongkar->diffInMinutes($supplierSelesaiBongkar);  // Store only date
                $dateBongkarMuatRit2[] = $supplierInTime->format('d');
            }
        }
        $bongkarMuat_rit2 = [$durasiBongkarMuatRit2, $dateBongkarMuatRit2, $targetBongkarRit2];

        $months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        // foreach ($months_name as $month)
        

        $transactions = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();
        return inertia('Dashboard', [
            'transactions' => TransactionResource::collection($transactions),
            'queryParams' => request()->query() ?: null,
            'suppliers' => $suppliers,
            'kedatangan_rit1' => $kedatangan_rit1,
            'kedatangan_rit2' => $kedatangan_rit2,
            'bongkarMuat_rit1' => $bongkarMuat_rit1,
            'bongkarMuat_rit2' => $bongkarMuat_rit2,
            'months' => $months,
            'years' => $years,
            // 'durasiBongkarMuat_rit2' => $durasiBongkarMuat_rit2
        ]);
        //
    }
    //
}
