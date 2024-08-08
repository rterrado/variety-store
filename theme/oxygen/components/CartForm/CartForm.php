<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="CartForm">
    <div plunc-if="state == 'loading'"></div>
    <form onsubmit="blockAutoSubmit(event)" plunc-if="state == 'active'" class="width-24 height-24">
        <div class="width-24 display-flex flex-direction-column height-24">
            <div class="display-flex align-items-center justify-content-space-between">
                <div class="flex-grow-1 display-flex align-items-center">
                    <?php snippet('Icons/SVG',[
                        'path' => '/Paths/cart.svg',
                        'class' => 'svg-fill-none color-primary concrete-width-extra-small-19',
                        'stroke:width' => '1.5'
                    ]); ?>
                    <div class="text-8 margin-left-4 font-weight-bold">Cart ({{CartItem.items.length}})</div>
                </div>
                <div class="flex-shrink-1">
                    <div class="text-1 cursor-pointer font-weight-400 color-gray-scale-light color-elegant-dark:hover">CLEAR</div>
                </div>
            </div>
            <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
            <div plunc-if="CartItem.items.length == 0" class="flex-grow-1 display-flex align-items-center justify-content-center">You have no items in your cart.</div>
            <div plunc-if="CartItem.items.length > 0" class="flex-grow-1">
                <ul plunc-repeat="CartItem.items as item" class="width-24">
                    <li class="width-24 display-flex">
                        <div plunc-if="item.product.imagesrc == null" style="background-color: #f4f7ff;" class="display-flex justify-content-center align-items-center concrete-width-small-10 concrete-height-small-10 border-radius-extra-small-10">
                            <?php snippet('Icons/SVG',[
                                'path' => '/Paths/image.svg',
                                'class' => 'svg-fill-none color-gray-scale-light concrete-width-small-4',
                                'stroke:width' => '0.5'
                            ]); ?>
                        </div>
                        <div plunc-if="item.product.imagesrc !== null" style="background:url({{item.product.imagesrc}});background-size:cover;background-repeat:no-repeat;" class="concrete-width-small-10 concrete-height-small-10 border-radius-extra-small-10">
                            
                        </div>
                        <div class="margin-left-11 padding-y-5">
                            <div class="text-6 font-weight-bold">{{item.product.name}}</div>
                            <div class="text-4 margin-top-4"><span class="color-elegant-dark font-weight-700">{{item.product.currencySymbol}}{{ $parent.LineItemManager.calculateTotal(item.quantity,item.product.price) }}</span> / <span class="color-gray-scale">{{item.product.currencySymbol}}{{item.product.price}} per item</span></div>
                            <div class="margin-top-5 display-flex align-items-center">
                                <div plunc-click="QuantityManager.remove({{$index}})" class="cursor-pointer">
                                    <?php snippet('Icons/SVG',[
                                        'path' => '/Paths/subtraction.svg',
                                        'class' => 'svg-fill-none color-gray-scale-super-dark concrete-width-extra-small-13',
                                        'stroke:width' => '1.5'
                                    ]); ?>
                                </div>
                                <div class="color-elegant-dark margin-x-7">{{item.quantity}}</div>
                                <div plunc-click="QuantityManager.add({{$index}})" class="cursor-pointer">
                                    <?php snippet('Icons/SVG',[
                                        'path' => '/Paths/addition.svg',
                                        'class' => 'svg-fill-none color-gray-scale-super-dark concrete-width-extra-small-13',
                                        'stroke:width' => '1.5'
                                    ]); ?>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <section class="flex-shrink-0" plunc-block="/BlockManager/SendButtonBlock/">
                <?php snippet('Forms/Button',[
                    'type' => 'submit',
                    'text' => 'Checkout',
                    'text:color' => 'color-everwhite',
                    'border:width' => '--border-width-1',
                    'background:color' => 'background-color-primary',
                    'border:style' => 'border-style-none',
                    'border:color' => 'border-color-transparent',
                    'background:color:hover' => 'background-color-gray-scale-super-light:hover',
                    'custom:classes' => 'width-24 margin-top-7',
                    'plunc:click' => 'checkout()',
                ]);?>
            </section>
        </div>
    </form>
    <div plunc-if="state == 'error'"></div>
</template>