<?php 

    $input_id = uniqid().rand(1,100);
    $input_block_name = '/Forms/TextArea/'.$input_id;
    $label = $snippet['label'];
    $converted_label = str_replace(' ','_',$label);
    $name_id = strtolower($converted_label).'_'.$input_id;

    $class['input']    = [];
    $class['fieldset'] = [];

    $input_width_full = true;

    $label_position = 'default';
    if (isset($snippet['label:position'])) $label_position = $snippet['label:position'];

    $label_inside_flex_classes = '';
    if ($label_position==='inside') {
        $label_inside_flex_classes = 'display-flex align-items-center';
        $input_width_full = false;
    }


    $with_message_block = true;
    if (isset($snippet['with:block:message'])) $with_message_block = $snippet['with:block:message'];

    /** 
     * Default Input Classes
     * Classes that will take effect regardless if the we use fieldset or not
     */
    $default_input_classes = ['background-color-transparent'];

    /**
     * Allows you to override border
     */
    $border_class_overrides = (isset($snippet['border:class'])) ? $snippet['border:class'] : '';

    /** 
     * Input border
     */
    $border_default_classes = ['border-style-solid'];

    /** 
     * Disabled
     */
    $disabled = isset($snippet['disabled']) ? 'disabled="'.$snippet['disabled'].'"' : '';

    /** 
     * Initial or default value
     */
    $defaultValue = isset($snippet['value']) ? 'value="'.$snippet['value'].'"' : '';


    $xattributes = '';
    if (isset($snippet['x:model'])) $xattributes = $xattributes.'xmodel="'.$snippet['x:model'].'" ';
    if (isset($snippet['x:change'])) $xattributes = $xattributes.'xchange="'.$snippet['x:change'].'(\''.$input_block_name.'\')" ';
    if (isset($snippet['x:touch'])) $xattributes = $xattributes.'xtouch="'.$snippet['x:touch'].'(\''.$input_block_name.'\')" ';
    if (isset($snippet['x:click'])) $xattributes = $xattributes.'xclick="'.$snippet['x:click'].'" ';

    $size = 'medium';
    if (isset($snippet['size'])) $size = $snippet['size'];
    switch ($size) {
        case 'extra-small': 
            $horizontal_padding = 'padding-x-8';
            $vertical_padding   = 'padding-y-5';
            $input_text_size    = 'text-2';
            $hover_label_left_margin = 'padding-x-4';
            $hover_label_text_size = 'text-small-20';
            $right_icon_margin_top = 'margin-top:-29px';
            $left_icon_margin_bottom = 'margin-bottom:-28.5px';
            break;
        case 'small':
            $horizontal_padding = 'padding-x-9';
            $vertical_padding   = 'padding-y-6';
            $input_text_size    = 'text-3';
            $hover_label_left_margin = 'margin-left-4';
            $hover_label_text_size = 'text-small-21';
            $right_icon_margin_top = 'margin-top:-33px';
            $left_icon_margin_bottom = 'margin-bottom:-29.5px';
            break;
        case 'large':
            $horizontal_padding = 'padding-x-11';
            $vertical_padding   = 'padding-y-8';
            $input_text_size    = 'text-5';
            $hover_label_left_margin = 'padding-x-5';
            $hover_label_text_size = 'text-small-23';
            $right_icon_margin_top = 'margin-top:-40px;';
            $left_icon_margin_bottom = 'margin-bottom:-32.94px';
            break;
        case 'extra-large': 
            $horizontal_padding = 'padding-x-13';
            $vertical_padding   = 'padding-y-9';
            $input_text_size    = 'text-6';
            $hover_label_left_margin = 'padding-x-6';
            $hover_label_text_size = 'text-small-23';
            $right_icon_margin_top = 'margin-top:-43px';
            $left_icon_margin_bottom = 'margin-bottom:-34.5px';
            break;
        default: 
            // size = medium 
            $horizontal_padding = 'padding-x-10';
            $vertical_padding   = 'padding-y-7';
            $input_text_size    = 'text-4';
            $hover_label_left_margin = 'padding-x-5';
            $hover_label_text_size = 'text-small-23';
            $right_icon_margin_top = 'margin-top:-38px';
            $left_icon_margin_bottom = 'margin-bottom:-30.5px';
            break;
    }

    /**
     * Placehoder
     */
    $placeholder = '';
    if (isset($snippet['placeholder'])) {
        $placeholder = 'placeholder="'.$snippet['placeholder'].'"';
    }

    /** 
     * Input Icon (Left)
     */
    $has_left_icon = false;
    if (isset($snippet['icon:left'])) {
        $has_left_icon = true;
        $horizontal_padding = '';
        $left_icon_path = $snippet['icon:left']['icon'];
        $left_icon_color = $snippet['icon:left']['color'];
        $left_icon_stroke_width = $snippet['icon:left']['icon_stroke_width'];
    }

    /** Horizontal Padding */
    if (isset($snippet['padding:x'])&&!$has_left_icon) $horizontal_padding = $snippet['padding:x'];

    /** Vertical Padding */
    if (isset($snippet['padding:y'])) $vertical_padding = $snippet['padding:y'];

    /** Default Input Classes */
    array_push($default_input_classes,$input_text_size);
    foreach ($default_input_classes as $default_class) array_push($class['input'],$default_class);

    /** Hovering Label Classes */
    $hover_label_classes = ['display-inline-block','color-gray-scale-extra-dark'];
    array_push($hover_label_classes,$hover_label_left_margin);
    array_push($hover_label_classes,$hover_label_text_size);

    /** 
     * Input Right Icon.
     */
    $has_right_icons = false; 
    if (isset($snippet['icon:right'])) {
        $has_right_icons = true;
        $right_icons_key = $snippet['icon:right']['state:key'];
    }

    /**
     * Wraps the input element in a fieldset
     */
    $use_fieldset = true; 
    if (isset($snippet['fieldset:enable'])) $use_fieldset = $snippet['fieldset:enable'];

    if ($use_fieldset) {
        array_push($class['input'],'border-style-none');
        array_push($class['fieldset'],$horizontal_padding);
        array_push($class['fieldset'],$vertical_padding);
        array_push($class['fieldset'],$border_class_overrides);
        array_push($class['fieldset'],$label_inside_flex_classes);
        if ($input_width_full) {
            array_push($class['input'],'width-24');
        } else {
            array_push($class['input'],'flex-grow-1');
        }
    } else {
        array_push($class['input'],$horizontal_padding);
        array_push($class['input'],$vertical_padding);
        array_push($class['input'],$border_class_overrides);
        array_push($class['input'],'width-24');
    }

?>

<?php if ($use_fieldset&&($label_position==='default')): ?> 
    <label for="<?php echo $name_id;?>" class="display-inline-block text-small-23 color-gray-scale-extra-dark margin-bottom-5"><?php echo $label;?></label>
<?php endif; ?>
<?php if ($has_left_icon): ?> 
    <div style="width:24px;margin-left:10px;<?php if ($label_position==='default') {echo 'margin-top: 6px;';} echo $left_icon_margin_bottom;?>">
        <?php snippet('Icons/SVG',[
            'path' => $left_icon_path,
            'class' => $left_icon_color.' width-24',
            'icon_stroke_width' => $left_icon_stroke_width
        ]); ?>
    </div>
<?php endif; ?>    
<?php if ($use_fieldset): ?> <fieldset class="<?php echo implode(' ',$class['fieldset']); ?>" style="border-width:1px;<?php if($has_left_icon){ echo 'padding-left:38px;padding-right: 20px;';} ?>" xblock="<?php echo $input_block_name; ?>" <?php echo $disabled; ?>> <?php endif; ?>
    <?php if ((!$use_fieldset)&&($label_position==='default')): ?> 
        <label for="<?php echo $name_id;?>" class="display-inline-block text-small-23 color-gray-scale-extra-dark margin-bottom-5"><?php echo $label;?></label>
    <?php endif; ?>
    <?php if (($use_fieldset)&&($label_position==='inside')): ?> 
        <label for="<?php echo $name_id;?>" class="display-inline-block text-small-23 color-gray-scale-extra-dark margin-right-5"><?php echo $label;?></label>
    <?php endif; ?>
    <?php if (($use_fieldset)&&($label_position==='hover')): ?> 
        <legend for="<?php echo $name_id;?>" style="margin-bottom:-8px;padding:0px 5px;" class="<?php echo implode(' ',$hover_label_classes); ?>"><?php echo $label;?></legend>
    <?php endif; ?>
    <textarea class="<?php echo implode(' ',$class['input']); ?>" id="<?php echo $name_id;?>" <?php echo $xattributes.' '.$placeholder; ?> style="<?php if($has_left_icon&&!$use_fieldset){ echo 'border-width:1px;padding-left:38px;padding-right: 20px;';} ?>" <?php echo $disabled.' '.$defaultValue; ?>></textarea>   
<?php if ($use_fieldset): ?> </fieldset> <?php endif; ?>
<?php if ($has_right_icons): ?> 
    <div xblock="<?php echo $input_block_name; ?>/RightIcon" class="display-flex flex-direction-row-reverse width-24">
        <?php foreach ($snippet['icon:right']['state:options'] as $stateName => $iconData): ?>
            <div xif="<?php echo $right_icons_key.'==\''.$stateName.'\''; ?>" class="display-flex align-items-center justify-content-center" style="width:24px;margin-right:8px;<?php echo $right_icon_margin_top; ?>"> 
                <?php if ($iconData['icon']==='--slate-spinner-simple'): ?> 
                    <?php snippet('Loaders/Spinner');?>
                <?php else: ?>
                    <?php snippet('Icons/SVG',[
                        'path' => $iconData['icon'],
                        'class' => $iconData['color'].' width-24',
                        'icon_stroke_width' => $iconData['icon_stroke_width']
                    ]); ?>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>   
    </div>
<?php endif; ?>    

<?php if ($with_message_block): ?> 
    <div class="margin-top-5 text-small-23" xblock="<?php echo $input_block_name; ?>/Message"></div>
<?php endif; ?>   