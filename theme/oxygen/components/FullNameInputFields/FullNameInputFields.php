<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="FullNameInputFields">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'" class="width-24">
        <div class="width-24 display-flex align-items-center">
            <div class="width-12 padding-right-5">
                <?php snippet('Forms/Input',[
                    'label' => 'First Name',
                    'label:class:list' => 'font-weight-300',
                    'size' => 'medium',
                    'fieldset:enable' => true,
                    'type' => 'text',
                    'placeholder' => 'John',
                    'plunc:model' => 'firstName',
                    'plunc:change' => 'validate',
                    'input:message:enabled' => false
                ]); ?>
            </div>
            <div class="width-12 padding-right-5">
                <?php snippet('Forms/Input',[
                    'label' => 'Last Name',
                    'label:class:list' => 'font-weight-300',
                    'size' => 'medium',
                    'fieldset:enable' => true,
                    'type' => 'text',
                    'placeholder' => 'Doe',
                    'plunc:model' => 'lastName',
                    'plunc:change' => 'validate',
                    'input:message:enabled' => false
                ]); ?>
            </div>
        </div>
        <div class="margin-top-5 text-small-23 color-error" plunc-block="/FNIF/Message"></div>
    </div>
    <div plunc-if="state=='error'"></div>
</template>