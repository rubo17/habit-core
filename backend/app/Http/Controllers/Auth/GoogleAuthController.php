<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\GoogleAuthAction;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class GoogleAuthController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(GoogleAuthAction $action): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->user();
        $result     = $action->execute($googleUser);
        $frontend   = config('app.frontend_url');

        return redirect("{$frontend}/auth/callback?token={$result['token']}");
    }
}
