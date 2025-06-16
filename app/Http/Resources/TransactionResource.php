<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        Carbon::setLocale('id');
        return [
            'supplier_code' => new SupplierResource($this->supplier),
            'supplier_in' => $this->supplier_in,
            'supplier_startBongkarMuat' => Carbon::parse($this->supplier_startBongkarMuat)->translatedFormat('d F Y'),
            'durasi_tunggu' => $this->supplier_startBongkarMuat ? Carbon::parse($this->supplier_startBongkarMuat)->diff($this->supplier_in)->forHumans() : '-',
            'durasi_bongkarMuat' => $this->supplier_selesaiBongkarMuat ? Carbon::parse($this->supplier_startBongkarMuat)->diff($this->supplier_selesaiBongkarMuat)->forHumans() : '-',
            'supplier_selesaiBongkarMuat' => Carbon::parse($this->supplier_selesaiBongkarMuat)->translatedFormat('d F Y'),
            'supplier_out' => $this->supplier_out?: '-',
            'isArrivalOnTime'=> $this->isArrivalOnTime,
            'isUnloadingOnTime'=> $this->isUnloadingOnTime,
            // $table->string('supplier_code');
            // $table->foreign('supplier_code')->references('supplier_code')->on('suppliers');
            // $table->timestamp('supplier_in');
            // $table->timestamp('supplier_startBongkarMuat')->nullable();
            // $table->timestamp('supplier_selesaiBongkarMuat')->nullable();
            // $table->timestamp('supplier_out')->nullable();
        ];
    }
}
