<?php 
// Declare here all the child components to be used within this component
Kenjiefx\StrawberryScratch\Components::register('Header');
Kenjiefx\StrawberryScratch\Components::register('CheckoutForm');
Kenjiefx\StrawberryScratch\Components::register('CheckoutSummary');
?>
<div class="width-24 height-24">
    <header plunc-component="Header" class="background-color-white width-24 position-fixed top-0 border-style-solid-bottom --border-width-1 border-color-gray-scale-extra-light z-index-1"></header>
    <div class="width-24 display-flex justify-content-center align-items-center height-24 header-padding-adj">
        <div class="display-flex concrete-width-extra-large-3@desktop width-24@mobile height-24">
            <section class="width-10 padding-x-17" plunc-component="CheckoutSummary"></section> 
            <div class="width-14 padding-x-17">
                <section plunc-component="CheckoutForm" class="width-24"></section>
            </div>
        </div>
    </div>
</div>

<style>
    app {display:block;height:100%;}
    main {height:100%;}
    header {height:77px;}
    .header-padding-adj {padding-top:77px;}
    main > div {height:100%;}
</style>