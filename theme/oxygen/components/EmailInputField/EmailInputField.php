<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="EmailInputField">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'" id="EIFieldCom" class="width-24">
        <?php 
            snippet('Forms/Input',[
                'label' => 'Email Address',
                'label:class:list' => 'font-weight-300',
                'size' => 'medium',
                'fieldset:enable' => true,
                'type' => 'text',
                'placeholder' => 'johndoe@example.com',
                'plunc:model' => 'emailAddress',
                'plunc:change' => 'validate',
                'icon:left' => [
                    'path' => '/Paths/email.svg',
                    'class' => 'svg-fill-none color-primary',
                    'stroke:width' => '1.5'
                ]
        ]); ?>
    </div>
    <div plunc-if="state=='error'"></div>
</template>