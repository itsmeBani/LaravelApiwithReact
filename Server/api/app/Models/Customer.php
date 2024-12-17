<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    // Define the table name if it differs from the default (e.g., 'phones')
    protected $table = 'users';

    // Specify which fields can be mass-assigned
    protected $fillable = ['username', 'address', 'lastname', 'firstname', 'images'];
    protected $hidden = ['password'];
    // Optionally, specify fields to hide when converting to JSON
    protected $primaryKey = 'user_id';

    public function carts()
    {
        return $this->hasMany(Order::class, 'user_id', 'user_id');
    }
}
