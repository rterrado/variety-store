<?php 

namespace Rterrado\VarietyStore;
use Kenjiefx\ScratchPHP\App\Events\ListensTo;
use Kenjiefx\ScratchPHP\App\Events\OnBuildCompleteEvent;
use Kenjiefx\ScratchPHP\App\Interfaces\ExtensionsInterface;
use Kenjiefx\ScratchPHP\App\Themes\ThemeController;

class ImageAssetManager implements ExtensionsInterface {

    public function __construct(
        private ThemeController $ThemeController
    ){
        
    }

    #[ListensTo(OnBuildCompleteEvent::class)]
    public function build(){
        $imgdir = $this->ThemeController->getThemeDirPath().'/images/';
        $targetdir = ROOT . '/docs/assets/';

        foreach (scandir(directory: $imgdir) as $file) {
            if ($file === '.' || $file === '..') continue;
            copy($imgdir.$file, $targetdir.$file);
        }
    }

}