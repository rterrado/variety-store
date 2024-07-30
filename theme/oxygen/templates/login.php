<?php 
Kenjiefx\StrawberryScratch\Components::register('StoreLoginForm');
?>

<div class="width-24 device-height-24 display-flex align-items-center justify-content-center">
    <div class="concrete-width-large-3@desktop width-24@mobile padding-x-13@mobile">
        <div style="text-shadow: 1px 0 0 currentColor;" class="text-24 font-weight-bold">
            Hello, there!
        </div>
        <div class="margin-top-3 text-5 color-gray-scale-extra-dark">
            Login to your store to start shopping!
        </div>
        <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
        <section plunc-component="StoreLoginForm" class="width-24"></section>
        <?php snippet('Dividers/Border',['orientation'=>'horizontal','margin:size'=>'17']); ?>
    </div>
</div>