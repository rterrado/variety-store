<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="OrderDateField">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'" class="width-24">
        <?php snippet('Forms/Input',[
            'size' => 'medium',
            'fieldset:enable' => true,
            'fieldset:attribute:disabled' => 'true',
            'type' => 'text',
            'plunc:model' => 'isoDate'
        ]); ?>
        <div class="margin-top-7 width-24 display-flex align-items-center">
            <div plunc-click="subtract()" class="cursor-pointer margin-top-2">
                <?php snippet('Icons/SVG',[
                    'path' => '/Paths/subtraction.svg',
                    'class' => 'svg-fill-none color-gray-scale-super-dark concrete-width-extra-small-13',
                    'stroke:width' => '1.5'
                ]); ?>
            </div>
            <div plunc-block="/BlockManager/OrderDateDisplay" class="padding-x-3 display-flex align-items-center">
                <div class="--order-date-daysago text-4">
                    <input plunc-change="updateDaysAgo()" plunc-model="daysAgo" value="{{daysAgo}}" type="number" style="width:31px;text-align:center;" class="text-4 border-color-transparent background-color-transparent width-static-max-content"> 
                    <span>{{dayText}} ago</span>
                </div>
            </div>
            <div plunc-click="add()" class="cursor-pointer margin-top-2">
                <?php snippet('Icons/SVG',[
                    'path' => '/Paths/addition.svg',
                    'class' => 'svg-fill-none color-gray-scale-super-dark concrete-width-extra-small-13',
                    'stroke:width' => '1.5'
                ]); ?>
            </div>
        </div>
    </div>
    <div plunc-if="state=='error'"></div>
</template>