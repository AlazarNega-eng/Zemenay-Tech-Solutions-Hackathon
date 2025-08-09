<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Remove problematic caching for now - return posts directly
        $posts = Post::latest()->paginate(10);
        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Create and save the new post
        $post = Post::create($request->all());

        // Clear cache after creating new post
        Cache::forget('posts.all');

        return response()->json($post, 201); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        // Remove caching for now - return post directly
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'author' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update the post with the new data
        $post->update($request->all());

        // Clear related caches
        Cache::forget('posts.all');
        Cache::forget("post.{$post->id}");

        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        // Delete the post
        $post->delete();

        // Clear related caches
        Cache::forget('posts.all');
        Cache::forget("post.{$post->id}");

        return response()->json(null, 204); // 204 No Content
    }
}
