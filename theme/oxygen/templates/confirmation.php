<?php 
// Declare here all the child components to be used within this component
Kenjiefx\StrawberryScratch\Components::register('Header');
Kenjiefx\StrawberryScratch\Components::register('OrderConfirmation');

?>
<div class="width-24 height-24">
    <header plunc-component="Header" class="background-color-white width-24 position-fixed top-0 border-style-solid-bottom --border-width-1 border-color-gray-scale-extra-light z-index-1"></header>
    <div class="width-24 display-flex justify-content-center align-items-center height-24 header-padding-adj">
        <div class="display-flex concrete-width-extra-large-3@desktop width-24@mobile height-24 padding-top-17">
            <section plunc-component="OrderConfirmation" class="width-24 padding-x-13"></section>
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