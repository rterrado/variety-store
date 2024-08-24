<?php 
// Declare here all the child components to be used within this component
Kenjiefx\StrawberryScratch\Components::register('CartForm');
?>
<div class="display-flex width-24 height-24">
    <div class="display-flex width-24"></div>
    <div class="flex-grow-1 height-24 border-style-solid-right border-color-gray-scale-extra-light --border-width-1">

    </div>
    <div class="flex-shrink-0 concrete-width-23 height-24">
        <section plunc-component="CartForm" class="--cart-wrapper position-fixed height-24 concrete-width-23 height-24 padding-x-11"></section>
    </div>
</div>

<style>
    body {height:100vh;overflow-y:scroll;}
    app {display:block;height:100%;}
    main {height:100%;}
    main > div {height:100%;}
    .--cart-wrapper { z-index: 100; top: 0; right: 0; }
</style>