<?php

    $type = $snippet['type'];
    switch ($type) {
        case 'h1':
            $text_size     = 'text-21';
            $subtitle_size = 'text-5';
            break;
        case 'h2':
            $text_size     = 'text-17';
            $subtitle_size = 'text-5';
            break;
        case 'h3':
            $text_size     = 'text-14';
            $subtitle_size = 'text-4';
            break;
        case 'h4':
            $text_size     = 'text-11';
            $subtitle_size = 'text-4';
            break;
        default: 
            throw new \Exception('Unsupported Heading type');
            break;
    }

    $opening_tag = '<'.$type.'';
    $closing_tag = '</'.$type.'>';

    $class['h'] = [];
    $class['p'] = [];

    $title = $snippet['title'];
    $subtitle = '';
    $has_subtitle = isset($snippet['subtitle']);
    if ($has_subtitle) $subtitle = $snippet['subtitle'];

    /**
     * Overrides
     */
    if (isset($snippet['title:size'])) $text_size = $snippet['title:size'];
    array_push($class['h'],$text_size);

    $font_weight = 'font-weight-bold';
    if (isset($snippet['font:weight'])) $font_weight = $snippet['font:weight'];
    array_push($class['h'],$font_weight);

    if (isset($snippet['title:class'])) {
        $class_list = explode(' ',$snippet['title:class']);
        foreach ($class_list as $class_name) array_push($class['h'],$class_name);
    }


    $margin_size = 'margin-top-3';
    if (isset($snippet['margin:top'])) $margin_size = $snippet['margin:top'];
    array_push($class['p'],$margin_size);

    if (isset($snippet['subtitle:size'])) $subtitle_size = $snippet['subtitle:size'];
    array_push($class['p'],$subtitle_size);

    $subtitle_color = 'color-gray-scale-super-dark';
    if (isset($snippet['subtitle:color'])) $subtitle_color = $snippet['subtitle:color'];
    array_push($class['p'],$subtitle_color);

    if (isset($snippet['subtitle:class'])) {
        $class_list = explode(' ',$snippet['subtitle:class']);
        foreach ($class_list as $class_name) array_push($class['p'],$class_name);
    }

?>

<header>
    <?php echo $opening_tag; ?> class="<?php echo implode(' ',$class['h']); ?>"><?php echo $snippet['title']; ?><?php echo $closing_tag; ?>
    <?php if ($has_subtitle): ?>
        <p class="<?php echo implode(' ',$class['p']); ?>"><?php echo $snippet['subtitle']; ?></p>
    <?php endif; ?>
</header>