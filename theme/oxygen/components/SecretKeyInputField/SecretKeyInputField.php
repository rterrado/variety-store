<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="SecretKeyInputField">
    <div plunc-if="state == 'loading'"></div>
    <div plunc-if="state == 'active'">
        <?php snippet('Forms/Input',[
            'fieldset:enable' => true,
            'label' => 'Secret Key',
            'type' => 'password',
            'placeholder' => '•••••••••••••••••',
            'plunc:model' => 'value',
            'plunc:change' => 'validate',
            'icon:left' => [
                'path' => '/Paths/key.svg',
                'class' => 'svg-fill-none color-primary',
                'stroke:width' => '1.5'
            ]
        ]);?>
    </div>
    <div plunc-if="state == 'error'"></div>
</template>