<?php 
// Declare here all the child components to be used within this component
Kenjiefx\StrawberryScratch\Components::register('CartForm');
Kenjiefx\StrawberryScratch\Components::register('ProductList');
Kenjiefx\StrawberryScratch\Components::register('Header');
?>
<div class="display-flex width-24 height-24">
    <div class="flex-grow-1 height-24 border-style-solid-right border-color-gray-scale-extra-light --border-width-1">
        <header plunc-component="Header" class="width-24"></header>
        <section plunc-component="ProductList" class="width-24"></section>
    </div>
    <div class="flex-shrink-0 concrete-width-23 height-24">
        <section plunc-component="CartForm" class="--cart-wrapper position-fixed height-24 concrete-width-23 height-24 padding-x-11"></section>
    </div>
</div>

<style>
    body {height:100vh;overflow-y:scroll;}
    app {display:block;height:100%;}
    main {height:100%;}
    header {height:77px;}
    main > div {height:100%;}
    .--cart-wrapper { z-index: 1; top: 0; right: 0; }
</style>