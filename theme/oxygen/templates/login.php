<?php 
Kenjiefx\StrawberryScratch\Components::register('StoreLoginForm');
?>

<div class="width-24 device-height-24 display-flex align-items-center">
    <div class="width-12 height-24 display-none@mobile" style="background:url(assets/login-background.jpg);background-size:cover;background-position:center;"></div>
    <div class="width-12 display-flex align-items-center justify-content-center width-24@mobile">
        <div class="concrete-width-large-3@desktop width-24@mobile padding-x-13@mobile">
            <div class="--store-logo-wrapper--light concrete-width-4 margin-bottom-17" style="margin-left:-27px;">
                <img class="width-24" src="https://cdn.shopify.com/s/files/1/0560/7466/6159/files/variety-store-logo-light-theme.png?v=1724434321" alt="">
            </div>
            <div class="--store-logo-wrapper--dark concrete-width-4 margin-bottom-17" style="margin-left:-27px;">
                <img class="width-24" src="https://cdn.shopify.com/s/files/1/0560/7466/6159/files/variety-store-logo-dark-theme.png?v=1724434322" alt="">
            </div>
            <div style="text-shadow: 1px 0 0 currentColor;" class="text-24 font-weight-bold">
                Hello, there!
            </div>
            <div class="margin-top-3 text-5 color-gray-scale-extra-dark">
                Login to your store to start shopping!
            </div>
            <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
            <section plunc-component="StoreLoginForm" class="width-24"></section>
            <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
            <div class="text-1 color-gray-scale-dark">By logging in, you agree to our <a href="terms-of-service.html">Terms of Service.</a></div>
        </div>
    </div>
</div>