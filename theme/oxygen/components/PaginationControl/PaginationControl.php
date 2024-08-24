<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="PaginationControl">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'" class="width-24 display-flex align-items-center height-24">
        <div plunc-click="previous()" class="display-flex align-items-center justify-content-center cursor-pointer height-24 concrete-height-small-4 concrete-width-small-4 margin-right-9 border-radius-24 border-style-solid --border-width-1 border-color-gray-scale-extra-light">
            <?php snippet('Icons/SVG',[
                'path' => '/Paths/arrow-left.svg',
                'class' => 'svg-fill-none color-primary:hover color-gray-scale-light concrete-width-extra-small-17',
                'stroke:width' => '1.5'
            ]); ?>
        </div>
        <div plunc-click="next()" class="display-flex align-items-center justify-content-center cursor-pointer height-24 concrete-height-small-4 concrete-width-small-4 margin-right-9 border-radius-24 border-style-solid --border-width-1 border-color-gray-scale-extra-light">
            <?php snippet('Icons/SVG',[
                'path' => '/Paths/arrow-right.svg',
                'class' => 'svg-fill-none color-primary:hover color-gray-scale-light concrete-width-extra-small-17',
                'stroke:width' => '1.5'
            ]); ?>
        </div>
    </div>
    <div plunc-if="state=='error'"></div>
</template>