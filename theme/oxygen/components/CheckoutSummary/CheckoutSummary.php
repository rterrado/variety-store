<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="CheckoutSummary">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'" class="width-24 padding-y-17" style="position:sticky;top:54px;">
        <div class="display-flex flex-direction-column width-24 padding-bottom-17@desktop padding-y-17">
            <ul plunc-repeat="cart.items as item" class="width-24">
                <li class="margin-top-11 width-24 display-flex flex-direction-column align-items-flex-end">
                    <div class="display-flex align-items-center">
                        <div class="margin-right-7">
                            <div class="color-gray-scale-extra-dark font-weight-300 text-1">{{item.product.name}}</div>
                            <div style="text-align:right;" class="font-weight-300 text-1 margin-top-5">
                                <span class="font-weight-bold">{{item.product.currency.symbol}}{{item.product.price}}</span> X {{item.quantity}}
                            </div>
                        </div>
                        <div plunc-if="item.product.imgsrc == null" style="background-color: #f4f7ff;" class="display-flex justify-content-center align-items-center concrete-width-small-6 concrete-height-small-6 border-radius-extra-small-10">
                            <?php snippet('Icons/SVG',[
                                'path' => '/Paths/image.svg',
                                'class' => 'svg-fill-none color-gray-scale-light concrete-width--extra-small-7',
                                'stroke:width' => '0.5'
                            ]); ?>
                        </div>
                        <div plunc-if="item.product.imgsrc !== null" style="background:url({{item.product.imgsrc}});background-size:cover;background-repeat:no-repeat;" class="concrete-width-small-6 concrete-height-small-6 border-radius-extra-small-10">
                        </div>
                    </div>
                </li>
            </ul>
            <div class="margin-top-11 width-24 display-flex flex-direction-column align-items-flex-end">
                <div class="color-gray-scale-extra-dark font-weight-300 text-1">Subtotal Price</div>
                <div class="text-7 margin-top-3 font-weight-bold">$ {{subtotal}}</div>
            </div>
            <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'11']); ?>
            <div class="width-24 display-flex flex-direction-column align-items-flex-end">
                <div class="color-gray-scale-extra-dark font-weight-300 text-1">Taxes and Fees</div>
                <div class="text-7 margin-top-3">$ {{tax}}</div>
            </div>
            <div class="margin-top-11 width-24 display-flex flex-direction-column align-items-flex-end">
                <div class="color-gray-scale-extra-dark font-weight-300 text-1">Total Payment</div>
                <div class="text-17 margin-top-3 font-weight-bold">$ {{total}}</div>
            </div>
        </div>
    </div>
    <div plunc-if="state=='error'"></div>
    <div plunc-if="state=='empty'" class="width-24 padding-y-17 height-24 device-height-17">
        <div class="display-flex flex-direction-column justify-content-center height-24 width-24 padding-bottom-17@desktop border-radius-extra-small-13@desktop padding-y-17">
            <div class="width-24 display-flex flex-direction-column align-items-flex-end">
                <div class="color-gray-scale-extra-dark font-weight-300 text-1">Total Payment</div>
                <div class="text-17 margin-top-3 font-weight-bold">$ 0.00</div>
            </div>
        </div>
    </div>
</template>