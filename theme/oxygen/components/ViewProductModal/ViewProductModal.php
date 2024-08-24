<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="ViewProductModal">
    <dialog plunc-block="/ModalManager/Dialog/" class="--slate-modal-backdrop">
        <div plunc-block="/BlockManager/Content/" class="width-24 height-24 display-flex justify-content-center align-items-center">
            
            <div class="width-24@mobile concrete-width-large-7@desktop">
                <div plunc-if="BlockManager.Content.state=='loading'" class="display-flex align-items-center justify-content-center">
                    <div class="--slate-theme-spinner-simple"></div>
                </div>
                <div plunc-if="BlockManager.Content.state=='active'" class="width-24">
                    <div plunc-click="ModalManager.Dialog.close()" class="width-24 display-flex flex-direction-row-reverse">
                        <?php snippet('Icons/SVG',[
                            'path' => '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />',
                            'class' => 'concrete-width-extra-small-11 svg-fill-none cursor-pointer',
                            'icon_stroke_width' => '1.5'
                        ]); ?>
                    </div>
                    <div style="max-height:500px;overflow-y:scroll;" class="--slate-scrollbar width-24@mobile concrete-width-large-7@desktop background-color-white padding-bottom-17 margin-top-7">
                        
                        <div plunc-if="product.image_url == null" class="background-color-gray-scale-extra-light width-24 concrete-height-small-21"></div>
                        <div plunc-if="product.image_url == null" class="padding-x-17 width-24 display-flex align-items-center justify-content-space-between" style="margin-top:-50px;">
                            <div style="background-color: #f4f7ff;" class="display-flex justify-content-center align-items-center concrete-width-small-21 concrete-height-small-21 border-radius-extra-small-10">
                                <?php snippet('Icons/SVG',[
                                    'path' => '/Paths/image.svg',
                                    'class' => 'svg-fill-none color-gray-scale-light concrete-width-small-4',
                                    'stroke:width' => '0.5'
                                ]); ?>
                            </div>
                            <div class="display-flex align-items-center">
                                <div id="view_product_star_rating">
                                    <div class="--ellipsis-loader --ellipsis-dots"><div></div></div>
                                </div>
                                <div plunc-if="product.price !== null">
                                    <?php snippet('Forms/Button',[
                                        'type' => 'button',
                                        'text' => 'Add To Cart',
                                        'text:color' => 'color-everwhite',
                                        'border:width' => '--border-width-1',
                                        'background:color' => 'background-color-primary',
                                        'border:style' => 'border-style-none',
                                        'border:color' => 'border-color-transparent',
                                        'background:color:hover' => 'background-color-gray-scale-super-light:hover',
                                        'custom:classes' => 'margin-left-11',
                                        'icon:right' => [
                                            'path' => '/Paths/cart.svg',
                                            'class' => 'svg-fill-none color-everwhite concrete-width-extra-small-6 margin-left-5'
                                        ],
                                        'plunc:click' => 'addToCart()'
                                    ]);?>
                                </div>
                            </div>
                        </div>
                        
                        <div plunc-if="product.image_url !== null" style="background:url({{product.image_url}});background-size:cover;background-position:center;filter:blur(10px);z-index:0;height:200px;" class="position-relative">
                        </div>
                        <div plunc-if="product.image_url !== null" class="padding-x-17 width-24 display-flex align-items-center justify-content-space-between" style="margin-top:-50px;z-index:10;position:relative;">
                            <div plunc-if="product.image_url !== null" style="background:url({{product.image_url}});background-size:cover;background-repeat:no-repeat;" class="concrete-width-small-21 concrete-height-small-21 border-radius-extra-small-10">
                                
                            </div>
                            <div class="display-flex align-items-center">
                                <div id="view_product_star_rating">
                                    <div class="--ellipsis-loader --ellipsis-dots"><div></div></div>
                                </div>
                                <div plunc-if="product.price !== null">
                                    <?php snippet('Forms/Button',[
                                        'type' => 'button',
                                        'text' => 'Add To Cart',
                                        'text:color' => 'color-everwhite',
                                        'border:width' => '--border-width-1',
                                        'background:color' => 'background-color-primary',
                                        'border:style' => 'border-style-none',
                                        'border:color' => 'border-color-transparent',
                                        'background:color:hover' => 'background-color-gray-scale-super-light:hover',
                                        'custom:classes' => 'margin-left-11',
                                        'icon:right' => [
                                            'path' => '/Paths/cart.svg',
                                            'class' => 'svg-fill-none color-everwhite concrete-width-extra-small-6 margin-left-5'
                                        ],
                                        'plunc:click' => 'addToCart()'
                                    ]);?>
                                </div>
                            </div>
                        </div>

                        <div class="padding-x-17 margin-top-7">
                            <div class="text-11 font-weight-bold">{{product.name}}</div>
                            <div plunc-if="product.price !== null" class="margin-top-5 text-9 color-elegant-dark">
                                {{printer.price()}} <span class="color-gray-scale-dark font-weight-300">({{product.currency}})</span> • <span class="color-gray-scale-dark font-weight-300" id="view_product_review_count"><div class="--ellipsis-loader --ellipsis-dots"><div></div></div></span>
                            </div>

                            <div class="margin-top-15 font-weight-300 text-1">Internal Product ID</div>
                            <div class="margin-top-3 text-4">
                                {{product.yotpo_id}}
                            </div>

                            <div class="margin-top-15 font-weight-300 text-1">Product ID</div>
                            <div class="margin-top-3 display-flex align-items-center background-color-gray-scale-extra-light border-radius-extra-small-5 width-static-max-content padding-x-5 padding-y-3">
                                <?php snippet('Icons/SVG',[
                                    'path' => '/Paths/fingerprint.svg',
                                    'class' => 'svg-fill-none color-gray-scale-super-dark concrete-width-extra-small-9',
                                    'stroke:width' => '1.0'
                                ]); ?>
                                <div class="margin-left-3 text-small-19 color-gray-scale-super-dark">{{ product.external_id }}</div>
                            </div>

                            <div class="margin-top-15 font-weight-300 text-1">Product Description</div>
                            <div plunc-if="product.description == null" class="margin-top-3 text-4 color-gray-scale-dark">
                                This product has no description.
                            </div>
                            <div plunc-if="product.description !== null" class="margin-top-3 text-4">
                                {{product.description}}
                            </div>

                            <div class="margin-top-15 font-weight-300 text-1">SKU</div>
                            <div plunc-if="product.sku == null" class="margin-top-3 text-4 color-gray-scale-dark">
                                This product has no SKU value.
                            </div>
                            <div plunc-if="product.sku !== null" class="margin-top-3 text-4">
                                {{product.sku}}
                            </div>


                            <div class="margin-top-15 font-weight-300 text-1">Manufacturer Part Number</div>
                            <div plunc-if="product.mpn == null" class="margin-top-3 text-4 color-gray-scale-dark">
                                This product has no MPN value.
                            </div>
                            <div plunc-if="product.mpn !== null" class="margin-top-3 text-4">
                                {{product.mpn}}
                            </div>

                            <div class="margin-top-15 font-weight-300 text-1">Group Name</div>
                            <div plunc-if="product.group_name == null" class="margin-top-3 text-4 color-gray-scale-dark">
                                This product is not grouped.
                            </div>
                            <div plunc-if="product.group_name !== null" class="margin-top-3 display-flex align-items-center">
                                <?php snippet('Icons/SVG',[
                                    'path' => '/Paths/layer.svg',
                                    'class' => 'svg-fill-gray-scale-super-dark color-transparent concrete-width-extra-small-9',
                                    'stroke:width' => '1.0'
                                ]); ?>
                                <div class="margin-left-3 text-small-19 color-gray-scale-super-dark">{{ product.group_name }}</div>
                            </div>

                            <div class="margin-top-15 font-weight-300 text-1">Product Tag</div>
                            <div plunc-if="conditionals.withoutTag()" class="margin-top-3 text-4 color-gray-scale-dark">
                                This product is not tagged.
                            </div>
                            <div plunc-if="conditionals.hasTag()" class="margin-top-3 display-flex align-items-center">
                                <?php snippet('Icons/SVG',[
                                    'path' => '/Paths/tag.svg',
                                    'class' => 'svg-fill-gray-scale-super-dark color-transparent concrete-width-extra-small-9',
                                    'stroke:width' => '1.0'
                                ]); ?>
                                <div class="margin-left-3 text-small-19 color-gray-scale-super-dark">{{ product.custom_properties.review_form_tag }}</div>
                            </div>

                            <div class="margin-top-15 font-weight-300 text-1">Updated At</div>
                            <div style="font-family:monospace;" class="margin-top-3 text-4">
                                {{product.updated_at}}
                            </div>

                            <div class="margin-top-15 font-weight-300 text-1">Created At</div>
                            <div style="font-family:monospace;" class="margin-top-3 text-4">
                                {{product.created_at}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
</template>