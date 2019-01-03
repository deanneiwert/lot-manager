<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        // handle the error differently when dealing with ajax requests
        if ($request->ajax() || $request->wantsJson())
        {
            $code = 500;
            $message = "Unknown error occurred";

            // change response code if authentication exception
            if($exception instanceof AuthenticationException){
                $code = 401;
                $message = "Not logged in";
            }

            $json = [
                'success' => false,
                'code' => $code,
                'devMessage' => $exception->getMessage(),
                'message' => $message,
            ];

            return response()->json($json, $code);
        }
        return parent::render($request, $exception);
    }

}
