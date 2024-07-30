<?php 

$ThemeController = new Kenjiefx\ScratchPHP\App\Themes\ThemeController();
$colors = json_decode(
    file_get_contents(
        $ThemeController->getThemeDirPath() . '/venta/color.json'
    ),
    TRUE
);
$spans = '<div id="slate_color_palette" style="display:none">'.PHP_EOL;
foreach ($colors as $selector => $data) {
    foreach ($data['values'] as $name => $code) {
        $full_name = $selector.$data['separator'].$name;
        $spans     = $spans.'<span data-color-id="'.$full_name.'" class="'.$full_name.'"></span>'.PHP_EOL;
    }
}
$spans = $spans.'</div>';

echo $spans;