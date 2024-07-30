<?php 

    $class['label'] = [];
    $class['input'] = [];
    $class['span']  = [];

    /** 
     * We need to generate a specific instance ID to be used in 
     * inline style tags, so that the style don't bleed out. 
     */
    $instance_id = '--switcher-id-'.uniqid();
    array_push($class['label'],$instance_id);

    /**
     * Switcher's size: large, medium, small, extra-small
     */
    $size = 'large';
    if (isset($snippet['size'])) $size = $snippet['size'];
    switch ($size) {
        case 'large': array_push($class['label'],'--switcher-size-large'); break;
        case 'medium': array_push($class['label'],'--switcher-size-medium'); break;
        default: break;
    }

    /** 
     * Color of the switcher button
     */
    $slider_color = 'white';
    if (isset($snippet['color:slider'])) $slider_color = $snippet['color:slider'];
    array_push($class['span'],'background-color-'.$slider_color.':before');


    /**
     * Whether it is round or not
     */
    $shape = '';
    if (isset($snippet['shape'])) $shape = $snippet['shape'];
    if (trim($shape)!=='') $shape = '--is-shape-'.$shape;
    array_push($class['span'],$shape);


    /** 
     * PluncJS Attributes and elements
     */
    $xchange = '';
    if (isset($snippet['plunc:change'])) $xchange = 'plunc-change="'.$snippet['plunc:change'].'"';
    $xmodel = '';
    if (isset($snippet['plunc:model'])) $xmodel = 'plunc-model="'.$snippet['plunc:model'].'"';
?>

<label class="--switcher position-relative display-inline-block <?php echo implode(' ',$class['label']); ?>">
    <input <?php echo $xmodel.' '.$xchange; ?> class="opacity-0 zero-width zero-height" type="checkbox" id="<?php echo 'input'.$instance_id; ?>" />
    <span class="<?php echo implode(' ',$class['span']); ?> slider round position-absolute position-absolute:before cursor-pointer zero-top zero-left zero-right zero-bottom background-color-gray-scale-extra-light"></span>
</label>