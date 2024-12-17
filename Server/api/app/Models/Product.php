<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Define the table name if it differs      from the default (e.g., 'phones')
    protected $table = 'products';

    // Specify which fields can be mass-assigned
    protected $fillable = ['name', 'description', 'price', 'imageUrl','label', 'description',];

    protected $primaryKey = 'product_id';

    public function carts()
    {
        return $this->hasMany(Order::class, 'product_id', 'product_id');
    }



}
