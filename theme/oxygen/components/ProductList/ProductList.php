<?php 
// Declare here all the child components to be used within this component
Kenjiefx\StrawberryScratch\Components::register('ViewProductModal');
?>

<template plunc-name="ProductList">
    <div plunc-if="state=='loading'" class="width-24 height-24 display-flex align-items-center justify-content-center device-height-19 border-style-solid-top --border-width-1 border-color-gray-scale-extra-light">
        <div class="--slate-page-spinner"></div>
    </div>
    <div plunc-if="state=='active'" class="width-24">
        <div plunc-if="products.length > 0" class="width-24">
            <ul plunc-repeat="products as product" class="width-24 display-flex flex-wrap-wrap">
                <li style="border-width:1px;" class="width-8 padding-x-13 padding-y-13 border-style-solid border-color-gray-scale-extra-light ">
                    <div class="display-flex justify-content-space-between align-items-center width-24">
                        <div plunc-if="product.image_url == null" style="background-color: #f4f7ff;" class="display-flex justify-content-center align-items-center concrete-width-small-10 concrete-height-small-10 border-radius-extra-small-10">
                            <?php snippet('Icons/SVG',[
                                'path' => '/Paths/image.svg',
                                'class' => 'svg-fill-none color-gray-scale-light concrete-width-small-4',
                                'stroke:width' => '0.5'
                            ]); ?>
                        </div>
                        <div plunc-if="product.image_url !== null" style="background:url({{product.image_url}});background-size:cover;background-repeat:no-repeat;" class="concrete-width-small-10 concrete-height-small-10 border-radius-extra-small-10">
                            
                        </div>
                        <div class="display-flex align-items-center">
                            <div class="text-4 font-weight-300 color-gray-scale-light margin-right-7">
                                # {{ product.yotpo_id }}
                            </div>
                            <div plunc-if="product.price !== null" plunc-click="AddToCart('{{$index}}')" class="margin-right-7 cursor-pointer">
                                <?php snippet('Icons/SVG',[
                                    'path' => '/Paths/shopping-bag.svg',
                                    'class' => 'svg-fill-none color-primary:hover color-gray-scale-light concrete-width-extra-small-13',
                                    'stroke:width' => '1.5'
                                ]); ?>
                            </div>
                            <div plunc-click="ViewSingleProduct('{{$index}}')" class="cursor-pointer">
                                <?php snippet('Icons/SVG',[
                                    'path' => '/Paths/arrow-right.svg',
                                    'class' => 'svg-fill-none color-primary:hover color-gray-scale-light concrete-width-extra-small-13',
                                    'stroke:width' => '1.5'
                                ]); ?>
                            </div>
                        </div>
                    </div>
                    <div class="display-flex align-items-center margin-top-13">
                        <div class="display-flex align-items-center background-color-gray-scale-extra-light border-radius-extra-small-5 width-static-max-content padding-x-5 padding-y-3">
                            <?php snippet('Icons/SVG',[
                                'path' => '/Paths/fingerprint.svg',
                                'class' => 'svg-fill-none color-gray-scale-super-dark concrete-width-extra-small-9',
                                'stroke:width' => '1.0'
                            ]); ?>
                            <div class="margin-left-3 text-small-19 color-gray-scale-super-dark">{{ product.external_id }}</div>
                        </div>
                        <div plunc-if="product.group_name !== null" class="margin-left-3 display-flex align-items-center">
                            <?php snippet('Icons/SVG',[
                                'path' => '/Paths/layer.svg',
                                'class' => 'svg-fill-gray-scale-super-dark color-transparent concrete-width-extra-small-9',
                                'stroke:width' => '1.0'
                            ]); ?>
                            <div class="margin-left-3 text-small-19 color-gray-scale-super-dark">{{ product.group_name }}</div>
                        </div>
                        <div plunc-if="$parent.conditionals.hasTag(product)" class="margin-left-3 display-flex align-items-center">
                            <?php snippet('Icons/SVG',[
                                'path' => '/Paths/tag.svg',
                                'class' => 'svg-fill-gray-scale-super-dark color-transparent concrete-width-extra-small-9',
                                'stroke:width' => '1.0'
                            ]); ?>
                            <div class="margin-left-3 text-small-19 color-gray-scale-super-dark">{{ product.custom_properties.review_form_tag }}</div>
                        </div>
                        <!-- <div class="margin-left-3 display-flex align-items-center margin-top-13 border-radius-extra-small-5 width-static-max-content padding-x-5 padding-y-3">
                            <img style="filter: grayscale(100%);" class="concrete-width-extra-small-9" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Yotpo_Logo.svg" alt="">
                            <div class="margin-left-3 text-small-19 color-gray-scale-super-dark">{{ product.yotpo_id }}</div>
                        </div> -->
                    </div>
                    <div class="margin-top-3 text-7 font-weight-bold">{{product.name}}</div>
                    <div id="product_list_star_rating_{{product.external_id}}" class="margin-top-5">
                        <div class="--ellipsis-loader --ellipsis-dots"><div></div></div>
                    </div>
                    <div plunc-if="product.price !== null" class="margin-top-11 text-8 color-elegant-dark">
                        {{$parent.printer.price(product)}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div plunc-if="state=='error'"></div>
    <div class="width-24" plunc-component="ViewProductModal"></div>
</template>