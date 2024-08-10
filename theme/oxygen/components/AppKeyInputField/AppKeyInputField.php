<?php 
// Declare here all the child components to be used within this component
?>

<template plunc-name="AppKeyInputField">
    <div plunc-if="state == 'loading'"></div>
    <div plunc-if="state == 'active'">
        <?php snippet('Forms/Input',[
            'fieldset:enable' => true,
            'label' => 'App Key',
            'type' => 'text',
            'input:text:size' => 'text-2',
            'placeholder' => 'Your store app key',
            'plunc:model' => 'value',
            'plunc:change' => 'validate',
            'icon:left' => [
                'path' => '/Paths/store.svg',
                'class' => 'svg-fill-none color-primary',
                'stroke:width' => '1.5'
            ]
        ]);?>
    </div>
    <div plunc-if="state == 'error'"></div>
</template>