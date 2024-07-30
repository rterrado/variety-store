<?php 
require_once __dir__.'/snippets/models.php'; 
use Kenjiefx\ScratchPHP\App\Build\BuildHelpers;
?>
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta content='width=device-width, initial-scale=1' name='viewport'/>
        <title><?php echo page_title(); ?></title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/kenjiefx/plunc/dist/plunc.0.7.22.min.js"></script>
        <script type="text/javascript">
            const blockAutoSubmit=e=>e.preventDefault();
        </script>
        <?php 
        $PageController = BuildHelpers::PageController();
        $pageRelPath    = $PageController->getPageRelPath();
        $pageAssetsName = $PageController->getAssetsName();
        
        $assetsRelDir = '/variety-store/assets'.$pageRelPath.'/'.$pageAssetsName;
    
        echo '<script type="text/javascript" src="'.$assetsRelDir.'.js?v='.time().'"></script>'.PHP_EOL;
        echo '<link rel="stylesheet" href="'.$assetsRelDir.'.css?v='.time().'">';
        
        ?>
    </head>
    <body class="width-24">
        <script type="text/javascript">
            const theme = localStorage.getItem('slate-theme') ?? 'light'
            document.querySelector('body').classList.add(theme)
            window.slate = { theme: { name: theme } }
        </script>
        <app plunc-app="app" class="width-24"></app>
        <template plunc-name="app">
            <main plunc-component="AppRouter" class="width-24"></main>
        </template>
        <?php Kenjiefx\StrawberryScratch\Components::register('AppRouter'); ?>
        <?php Kenjiefx\StrawberryScratch\Components::export(); ?>
        <?php snippet('SlateTheme/Colors/Palette'); ?>
    </body>
</html>