<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionExportResource extends JsonResource
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
            'durasi_tunggu' => $this->supplier_startBongkarMuat ? Carbon::parse($this->supplier_startBongkarMuat)->diffInSeconds($this->supplier_in) : '-',
            'durasi_bongkarMuat' => $this->supplier_selesaiBongkarMuat ? Carbon::parse($this->supplier_startBongkarMuat)->diffInSeconds($this->supplier_selesaiBongkarMuat) : '-',
            'supplier_selesaiBongkarMuat' => Carbon::parse($this->supplier_selesaiBongkarMuat)->translatedFormat('d F Y'),
            'supplier_out' => $this->supplier_out?: '-',
        ];
    }
}
