<template plunc-name="AppRouter">
    <div plunc-if="state=='loading'" class="width-24 display-flex align-items-center justify-content-center device-height-24">
        <!-- Apply loading screen here -->
        <div class="--slate-page-spinner"></div>
    </div>
    <div plunc-if="state=='active'">
        <?php template_content(); ?>
    </div>
    <div plunc-if="state=='error'" class="width-24 device-height-24 display-flex align-items-center justify-content-center">
        <!-- Apply error page here -->
        <div class="concrete-width-large-3@desktop width-24@mobile padding-x-13@mobile">
            <div class="display-flex align-items-center">
                <div class="text-24 color-gray-scale-super-dark">
                    {{error.code}} /
                </div>
                <div class="text-24 font-weight-800 margin-left-5 color-gray-scale-super-dark">
                    <span plunc-if="error.code==400">Bad Request</span>
                    <span plunc-if="error.code==401">Access Denied</span>
                    <span plunc-if="error.code==404">Not Found</span>
                    <span plunc-if="error.code==500">Internal Server Error</span>
                </div>
            </div>
            <div class="margin-top-8 text-4 line-height-17 font-weight-400">
                {{error.message}} If you think this is incorrect, please contact me below.
            </div>
            <div class="margin-top-13 display-flex align-items-center">
                <?php snippet('Icons/SVG',[
                    'path' => '/Paths/email.svg',
                    'class' => 'concrete-width-extra-small-13 color-primary svg-fill-none',
                    'icon_stroke_width' => '1.5'
                ]); ?>
                <div class="text-4 font-weight-500 margin-left-7">
                    rterrado@yotpo.com
                </div>
            </div>
        </div>
    </div>
</template>