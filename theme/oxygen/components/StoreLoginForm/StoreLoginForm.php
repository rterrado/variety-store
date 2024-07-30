<?php 
// Declare here all the child components to be used within this component
Kenjiefx\StrawberryScratch\Components::register('AppKeyInputField');
Kenjiefx\StrawberryScratch\Components::register('SecretKeyInputField');
?>

<template plunc-name="StoreLoginForm">
    <div plunc-if="state == 'loading'"></div>
    <form onsubmit="blockAutoSubmit(event)" plunc-if="state == 'active'" class="width-24">
        <section plunc-component="AppKeyInputField" class="width-24"></section>
        <div class="margin-top-7"></div>
        <section plunc-component="SecretKeyInputField" class="width-24"></section>
        <div class="margin-top-17"></div>
        <section plunc-block="/BlockManager/SendButtonBlock/">
            <?php snippet('Forms/Button',[
                'type' => 'submit',
                'text' => 'Login',
                'text:color' => 'color-everwhite',
                'border:width' => '--border-width-1',
                'background:color' => 'background-color-primary',
                'border:style' => 'border-style-none',
                'border:color' => 'border-color-transparent',
                'background:color:hover' => 'background-color-gray-scale-super-light:hover',
                'custom:classes' => 'width-24 margin-top-7',
                'plunc:click' => 'login()',
                'plunc:disable' => "BlockManager.SendButtonBlock.state !== 'ready'"
            ]);?>
        </section>
    </form>
    <div plunc-if="state == 'error'"></div>
</template>