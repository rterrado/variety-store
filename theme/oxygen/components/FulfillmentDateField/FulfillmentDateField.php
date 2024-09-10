<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="FulfillmentDateField">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'">
        <div class="display-flex align-items-center">
            <div>
                <?php snippet('Toggles/Switch',[
                    'size' => 'medium',
                    'shape' => 'round',
                    'plunc:change' => 'toggleAutoDate()',
                    'plunc:model' => 'set1DayafterOrderDate'
                ]) ?>
            </div>
            <div plunc-style="textDisabled()" class="margin-left-7 text-4">
                Set 1 day after order date
            </div>
        </div>
        <div class="margin-top-7 width-24">
            <?php snippet('Forms/Input',[
                'size' => 'medium',
                'fieldset:enable' => true,
                'fieldset:attribute:disabled' => 'true',
                'type' => 'text',
                'plunc:model' => 'isoDate'
            ]); ?>
        </div>
        <div plunc-if="set1DayafterOrderDate == false" class="margin-top-7 width-24 display-flex align-items-center">
            <div plunc-if="displaySubtractOption == true" plunc-click="subtract()" class="cursor-pointer margin-top-2">
                <?php snippet('Icons/SVG',[
                    'path' => '/Paths/subtraction.svg',
                    'class' => 'svg-fill-none color-gray-scale-super-dark concrete-width-extra-small-13',
                    'stroke:width' => '1.5'
                ]); ?>
            </div>
            <div plunc-block="/BlockManager/OrderDateDisplay" class="padding-x-3 display-flex align-items-center">
                <div class="text-4">
                    {{daysAfterOrderDate}} <span>{{dayText}}</span> after order date
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