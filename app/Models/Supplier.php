<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    /** @use HasFactory<\Database\Factories\SupplierFactory> */
    use HasFactory;

    protected $guarded = [];
    
    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'supplier_code', 'supplier_code');
    }
}
