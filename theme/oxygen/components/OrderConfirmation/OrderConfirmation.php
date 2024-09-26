<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="OrderConfirmation">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'" class="width-24">
        <div class="width-24 padding-x-13 padding-y-13 --conf-wrapper">
            <div class="font-weight-400 text-1 margin-bottom-5">Order # {{order.external_order_id }}</div>
            <div class="text-21 font-weight-bold">Thank you for your purchase, {{order.customer.firstName}}.</div>
            <div class="text-11 font-weight-300 margin-top-7 color-gray-scale-extra-dark">Yotpo Order No. {{order.yotpo_order_id}}</div>
        </div>
        <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>

        <div class="display-flex@desktop">
            <div class="width-12@desktop width-24@mobile">

                <div class="margin-top-15 font-weight-300 text-1">Store Name</div>
                <div class="margin-top-3 text-4">
                    {{order.store_name}}
                </div>

                <div class="margin-top-15 font-weight-300 text-1">App Key</div>
                <div class="margin-top-3 text-4">
                    {{order.app_key}}
                </div>

                <div class="margin-top-15 font-weight-300 text-1">Order Date</div>
                <div class="margin-top-3 text-4" style="font-family:monospace;">
                    {{order.order_date}}
                </div>

                <div class="margin-top-15 font-weight-300 text-1">Fulfillment Date</div>
                <div class="margin-top-3 text-4" style="font-family:monospace;">
                    {{order.fulfillment_date}}
                </div>

                <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>

                <div class="margin-bottom-5 text-7 font-weight-bold">Customer Information</div>

                <div class="width-24 display-flex align-items-center">
                    <div class="width-12 padding-right-5">
                        <?php snippet('Forms/Input',[
                            'label' => 'First Name',
                            'label:class:list' => 'font-weight-300',
                            'size' => 'medium',
                            'fieldset:enable' => true,
                            'type' => 'text',
                            'placeholder' => 'John',
                            'plunc:model' => 'order.customer.firstName'
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
                            'plunc:model' => 'order.customer.lastName'
                        ]); ?>
                    </div>
                </div>
                <div class="width-24">
                    <?php 
                        snippet('Forms/Input',[
                            'label' => 'Email Address',
                            'label:class:list' => 'font-weight-300',
                            'size' => 'medium',
                            'fieldset:enable' => true,
                            'type' => 'text',
                            'plunc:model' => 'order.customer.email',
                            'icon:left' => [
                                'path' => '/Paths/email.svg',
                                'class' => 'svg-fill-none color-primary',
                                'stroke:width' => '1.5'
                            ]
                    ]); ?>
                </div>
                <div class="width-24">
                    <?php snippet('Forms/Input',[
                        'label' => 'Phone Number',
                        'label:class:list' => 'font-weight-300',
                        'size' => 'medium',
                        'fieldset:enable' => true,
                        'type' => 'text',
                        'plunc:model' => 'order.customer.phoneNumber'
                    ]); ?>
                </div>


            </div>
            <div class="display-none@desktop">
                <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
            </div>
            <div class="width-12@desktop width-24@mobile padding-left-17@desktop">
                <div class="margin-bottom-5 text-7 font-weight-bold">Your Cart Items</div>
                <ul plunc-repeat="order.cart.items as item" class="width-24">
                    <li class="width-24 display-flex margin-top-13 align-items-center">
                        <div plunc-if="item.product.imgsrc == null" style="background-color: #f4f7ff;" class="flex-shrink-0 display-flex justify-content-center align-items-center concrete-width-small-7 concrete-height-small-7 border-radius-extra-small-10">
                            <?php snippet('Icons/SVG',[
                                'path' => '/Paths/image.svg',
                                'class' => 'svg-fill-none color-gray-scale-light concrete-width-small-2',
                                'stroke:width' => '0.5'
                            ]); ?>
                        </div>
                        <div plunc-if="item.product.imgsrc !== null" style="background:url({{item.product.imgsrc}});background-size:cover;background-repeat:no-repeat;" class="concrete-width-small-7 concrete-height-small-7 border-radius-extra-small-10">
                            
                        </div>
                        <div class="margin-left-11 padding-y-5 flex-shrink-0">
                            <div class="text-6 font-weight-500">{{item.product.name}}</div>
                            <div class="text-4 margin-top-4"><span class="color-elegant-dark font-weight-700">{{item.product.currency.symbol}}{{ $parent.LineItemManager.calculateTotal(item.quantity,item.product.price) }}</span> / <span class="color-gray-scale">{{item.product.currency.symbol}}{{item.product.price}} per item</span></div>
                        </div>
                        <div class="flex-grow-1 display-flex flex-direction-row-reverse text-6 font-weight-300 color-gray-scale-dark">
                            <div>
                                ( X {{item.quantity}} )
                            </div>
                        </div>
                    </li>
                </ul>

                <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
                <div class="width-24">
                    <div class="color-gray-scale-extra-dark font-weight-300 text-1">Taxes and Fees</div>
                    <div class="text-7 margin-top-3">$ {{order.taxes_and_fees}}</div>
                </div>
                <div class="margin-top-11 width-24">
                    <div class="color-gray-scale-extra-dark font-weight-300 text-1">Total Payment</div>
                    <div class="text-17 margin-top-3 font-weight-bold">$ {{order.total_price}}</div>
                </div>
            </div>
        </div>
        
        <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
        
        <div class="margin-bottom-17 text-1 color-gray-scale-dark">
            Disclosure: This is a demonstration tool for submitting orders to Yotpo via API. 
            The products and purchases listed on this page are not actual products of Variety Store (the tool) or the store the orders associate to. 
            No real transactions or purchases are being made.
        </div>
        
    </div>
    <div plunc-if="state=='error'"></div>
</template>