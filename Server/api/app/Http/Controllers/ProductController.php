<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        return response()->json($products);
    }
    public function AddProduct(Request $request)
    {
        $product = Product::create([
            'imageUrl' => $request->imageUrl,
            'name' => $request->name,
            'price' => $request->price,
            'label' => $request->label,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Product added successfully', 'product' => $product], 201);
    }
    public function updateProduct(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->update([
            'imageUrl' => $request->imageUrl,
            'name' => $request->name,
            'price' => $request->price,
            'label' => $request->label,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
