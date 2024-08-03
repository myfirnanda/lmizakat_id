<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *      title="The Test Api Documentation",
 *      version="1.0.0",
 *      description="The Test Api Documentation"
 *  )
 */
class PostController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/posts",
     *     tags={"Posts"},
     *     summary="List all posts",
     *     description="Returns a list of all posts",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean"
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string"
     *             ),
     *             @OA\Property(
     *                 property="posts",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Post")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        try {
            $posts = Post::with('postCategory', 'user')->latest()->get();
            return response()->json([
                "success" => true,
                "message" => "Get Posts Successful",
                "posts" => $posts,
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "An error occurred: " . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/posts/{slug}",
     *     tags={"Posts"},
     *     summary="Retrieve a specific post by slug",
     *     description="Returns a single post",
     *     @OA\Parameter(
     *         name="slug",
     *         in="path",
     *         required=true,
     *         description="Slug of the post to retrieve",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean"
     *             ),
     *             @OA\Property(
     *                 property="message",
     *                 type="string"
     *             ),
     *             @OA\Property(
     *                 property="post",
     *                 ref="#/components/schemas/Post"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Post not found"
     *     )
     * )
     */
    public function show(Post $post)
    {
        try {
            $post = Post::with('postCategory', 'user')->where('slug', $post->slug)->first();

            if (!$post) {
                return response()->json([
                    "success" => false,
                    "message" => "Post Not Found",
                ], 404);
            }

            $sessionKey = 'post_view_' . $post->slug;
            $cooldownTime = 5 * 60; // 5 minutes in seconds

            if (!session()->has($sessionKey) || (time() - session($sessionKey)) > $cooldownTime) {
                $post->increment('views');
                session([$sessionKey => time()]);
            }

            return response()->json([
                "success" => true,
                "message" => "Get Post Successful",
                "post" => $post
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "An error occurred: " . $e->getMessage(),
            ], 500);
        }
    }
}
