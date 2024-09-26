<?php 
// Declare here all the child components to be used within this component
Kenjiefx\StrawberryScratch\Components::register('PaginationControl');
Kenjiefx\StrawberryScratch\Components::register('ProductSearchBar');
?>

<template plunc-name="Header">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'" class="width-24 display-flex align-items-center height-24">
        <div class="width-12 height-24 display-flex align-items-center">
            <div class="--store-logo-wrapper--light height-24 width-static-max-content border-style-solid-right --border-width-1 border-color-gray-scale-extra-light">
                <img class="height-24" src="https://cdn.shopify.com/s/files/1/0560/7466/6159/files/variety-store-logo-light-theme.png?v=1724434321" alt="">
            </div>
            <div class="--store-logo-wrapper--dark height-24 width-static-max-content border-style-solid-right --border-width-1 border-color-gray-scale-extra-light">
                <img class="height-24" src="https://cdn.shopify.com/s/files/1/0560/7466/6159/files/variety-store-logo-dark-theme.png?v=1724434322" alt="">
            </div>
            <div plunc-if="views.StoreNameView == true" class="padding-x-13">
                <div class="font-weight-300 text-1">Store Name</div>
                <div id="header_store_name" class="margin-top-3 text-7 font-weight-bold"><div class="--ellipsis-loader --ellipsis-dots"><div></div></div></div>
            </div>
            <div plunc-if="views.CollectionLink == true" class="">
                <div plunc-click="goToCollections()" class="cursor-pointer color-gray-scale-extra-dark color-primary:hover display-flex align-items-center padding-x-17 border-style-solid-left --border-width-1 border-color-gray-scale-extra-light">
                    <div>
                        <?php snippet('Icons/SVG',[
                            'path' => '/Paths/rocket.svg',
                            'class' => 'svg-fill-none color-inherit concrete-width-extra-small-11',
                            'stroke:width' => '1.5'
                        ]); ?>
                    </div>
                    <div class="margin-left-7 text-3">
                        Products
                    </div>
                </div>
            </div>
            <div plunc-if="views.LogOffButton == true" class="">
                <div plunc-click="logout()" class="cursor-pointer color-gray-scale-extra-dark color-primary:hover display-flex align-items-center padding-x-17 border-style-solid-left --border-width-1 border-color-gray-scale-extra-light">
                    <div>
                        <?php snippet('Icons/SVG',[
                            'path' => '/Paths/power.svg',
                            'class' => 'svg-fill-none color-inherit concrete-width-extra-small-11',
                            'stroke:width' => '1.5'
                        ]); ?>
                    </div>
                    <div class="margin-left-7 text-3">
                        Logout
                    </div>
                </div>
            </div>
        </div>
        <div class="width-12 display-flex align-items-center flex-direction-row-reverse">
            <div class="padding-right-15">
                <?php snippet('Plugins/ThemeSelector'); ?>
            </div>
            <div plunc-if="views.RightSideBar == true" class="padding-right-9 flex-grow-1 display-flex align-items-center flex-direction-row-reverse">
                <div>Terms of Service</div>
            </div>
            <div plunc-if="views.PaginationControl == true" class="flex-shrink-0 height-24">
                <section class="width-24 height-24" plunc-component="PaginationControl"></section>
            </div>
            <div plunc-if="views.SearchBar == true" class="flex-grow-1 height-24 padding-right-7">
                <section class="width-24 height-24" plunc-component="ProductSearchBar"></section>
            </div>
        </div>
    </div>
    <div plunc-if="state=='error'"></div>
</template>