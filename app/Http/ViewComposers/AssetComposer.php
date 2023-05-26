<?php

namespace Pterodactyl\Http\ViewComposers;

use Illuminate\View\View;
use Pterodactyl\Services\Helpers\AssetHashService;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;

class AssetComposer
{
    /**
     * AssetComposer constructor.
     */
    public function __construct(
        AssetHashService $assetHashService,
        SettingsRepositoryInterface $settings,
    )
    {
        $this->assetHashService = $assetHashService;
        $this->settings = $settings;
    }

    /**
     * Provide access to the asset service in the views.
     */
    public function compose(View $view): void
    {
        $view->with('asset', $this->assetHashService);
        $view->with('siteConfiguration', [
            'name' => config('app.name') ?? 'Nitroactyl',
            'locale' => config('app.locale') ?? 'en',
            'logo' => $this->settings->get('settings::app:logo') ?? 'https://www.nitronodes.xyz/assets/img/logo.png',
            'recaptcha' => [
                'enabled' => config('recaptcha.enabled', false),
                'siteKey' => config('recaptcha.website_key') ?? '',
            ],
        ]);
    }
}
