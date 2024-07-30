<?php 

    $class['div:main'] = [];

    $orientation = 'horizontal';
    $direction   = 'border-style-solid-top';
    if (isset($snippet['orientation'])) $orientation = $snippet['orientation'];
    if ($orientation==='vertical') $direction = 'border-style-solid-left';
    array_push($class['div:main'],$direction);

    $allow_space = false;
    $spacer = '';
    if (isset($snippet['margin:size'])) $allow_space = true;
    if ($allow_space) {
        $marginSize = $snippet['margin:size'];
        if ($orientation==='horizontal') $spacer = 'margin-top-'.$marginSize.' margin-bottom-'.$marginSize;
        if ($orientation==='vertical') $spacer = 'margin-left-'.$marginSize.' margin-right-'.$marginSize;
        array_push($class['div:main'],$spacer);
    }

?>
<div role="separator" style="border-width:1px;" class="<?php echo implode(' ',$class['div:main']); ?> width-24 border-color-gray-scale-extra-light"></div>