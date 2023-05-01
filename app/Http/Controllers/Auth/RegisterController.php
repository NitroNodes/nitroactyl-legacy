<?php

namespace Pterodactyl\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Pterodactyl\Http\Requests\Auth\RegisterRequest;
use Pterodactyl\Services\Users\UserCreationService;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;

class RegisterController extends AbstractLoginController
{
    private UserCreationService $creationService;
    private SettingsRepositoryInterface $settings;

    /**
     * RegisterController constructor.
     */
    public function __construct(
        UserCreationService $creationService,
        SettingsRepositoryInterface $settings,
    ) {
        $this->settings = $settings;
        $this->creationService = $creationService;
    }
    /**
     * Handle a register request to the application.
     *
     * @throws \Pterodactyl\Exceptions\DisplayException
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $data = [
            'username' => $request->input('user'),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            'name_first' => $request->input('firstname'),
            'name_last' => $request->input('lastname'),
        ];

        $this->creationService->handle($data);

        return new JsonResponse([
            'data' => [
                'complete' => true,
                'intended' => $this->redirectPath(),
            ],
        ]);
    }
}