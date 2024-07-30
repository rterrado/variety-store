<template plunc-name="AppRouter">
    <div plunc-if="state=='loading'" class="width-24 display-flex align-items-center justify-content-center device-height-24">
        <!-- Apply loading screen here -->
        <div class="--slate-page-spinner"></div>
    </div>
    <div plunc-if="state=='active'">
        <?php template_content(); ?>
    </div>
    <div plunc-if="state=='error'">
        <!-- Apply error page here -->
    </div>
</template>