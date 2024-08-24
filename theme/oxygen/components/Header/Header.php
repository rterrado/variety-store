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
        </div>
        <div class="width-12 display-flex align-items-center">
            <div plunc-if="views.SearchBar == true" class="flex-grow-1 height-24 padding-right-7">
                <section class="width-24 height-24" plunc-component="ProductSearchBar"></section>
            </div>
            <div plunc-if="views.PaginationControl == true" class="flex-shrink-0 height-24">
                <section class="width-24 height-24" plunc-component="PaginationControl"></section>
            </div>
        </div>
    </div>
    <div plunc-if="state=='error'"></div>
</template>