<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $guarded = [];
    
    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_code', 'supplier_code');
    }
}
