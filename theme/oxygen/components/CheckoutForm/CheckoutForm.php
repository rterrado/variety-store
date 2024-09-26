<?php 
// Declare here all the child components to be used within this component
Kenjiefx\StrawberryScratch\Components::register('FullNameInputFields');
Kenjiefx\StrawberryScratch\Components::register('EmailInputField');
Kenjiefx\StrawberryScratch\Components::register('PhoneNumberSelector');
Kenjiefx\StrawberryScratch\Components::register('OrderDateField');
Kenjiefx\StrawberryScratch\Components::register('FulfillmentDateField');
Kenjiefx\StrawberryScratch\Components::register('BillingAddressForm');
?>

<template plunc-name="CheckoutForm">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'" class="width-24 height-24 padding-y-17">
        <div class="margin-top-9 text-7 font-weight-bold">About You</div>
        <div class="margin-top-5 text-4 font-weight-300">Please fill out your personal information.</div>
        <div class="width-24 margin-top-13">
            <section class="width-24" plunc-component="FullNameInputFields"></section>
            <section class="width-24 margin-top-9" plunc-component="EmailInputField"></section>
            <section class="width-24 margin-top-9" plunc-component="PhoneNumberSelector"></section>
        </div>

        <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
        <div class="margin-top-9 text-7 font-weight-bold">Order Date</div>
        <div class="margin-top-5 text-4 font-weight-300">Set the date this order would have been placed.</div>
        <section class="width-24 margin-top-9" plunc-component="OrderDateField"></section>

        <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
        <div class="margin-top-9 text-7 font-weight-bold">Fulfillment Date</div>
        <div class="margin-top-5 text-4 font-weight-300 line-height-15">
            Set the date this order would have been fulfilled. 
            This date would serve as the fulfillment date for each of the line items in your order.
        </div>
        <section class="width-24 margin-top-9" plunc-component="FulfillmentDateField"></section>

        <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
        <div class="margin-top-9 text-7 font-weight-bold">Billing Address (Optional)</div>
        <div class="margin-top-5 text-4 font-weight-300">Fill out your order's billing address.</div>
        <section class="width-24 margin-top-9" plunc-component="BillingAddressForm"></section>

        <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
        <?php snippet('Forms/Button',[
            'type' => 'submit',
            'text' => 'Place Order',
            'text:color' => 'color-everwhite',
            'border:width' => '--border-width-1',
            'background:color' => 'background-color-primary',
            'border:style' => 'border-style-none',
            'border:color' => 'border-color-transparent',
            'background:color:hover' => 'background-color-gray-scale-super-light:hover',
            'custom:classes' => 'width-24 margin-top-7',
            'plunc:click' => 'submit()',
        ]);?>
        <div class="margin-top-9 text-small-23 color-gray-scale-extra-dark width-24">
            <div>By placing this order, you hereby agree to our <a href="terms-of-service.html">Terms of Service</a>.</div>
        </div>

        <section class="margin-top-23 concrete-height-extra-small-24"></section>
    </div>
    <div plunc-if="state=='error'"></div>
    <div plunc-if="state=='empty'" class="width-24 display-flex align-items-center justify-content-center device-height-17">
        <div>
            <?php snippet('Icons/SVG',[
                'path' => '/Paths/cart.svg',
                'class' => 'svg-fill-none color-primary concrete-width-extra-small-23',
                'stroke:width' => '1.5'
            ]); ?>
            <div class="margin-top-9 text-7 font-weight-bold">Your cart is empty.</div>
            <div class="margin-top-7 text-5 color-gray-scale-extra-dark">
                You do not have anything in your cart at the moment. To start shopping,
                please click the button below.
            </div>
            <?php snippet('Forms/Button',[
                'type' => 'button',
                'text' => 'Start Shopping',
                'text:color' => 'color-everwhite',
                'border:width' => '--border-width-1',
                'background:color' => 'background-color-primary',
                'border:style' => 'border-style-none',
                'border:color' => 'border-color-transparent',
                'background:color:hover' => 'background-color-gray-scale-super-light:hover',
                'custom:classes' => 'width-24 margin-top-17',
                'plunc:click' => 'backToCollection()'
            ]);?>
        </div>
    </div>
</template>