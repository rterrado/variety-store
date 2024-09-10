<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="PhoneNumberSelector">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'" class="width-24">
        <label for="" class="text-2 display-inline-block font-weight-300 color-gray-scale-super-dark margin-bottom-5">Phone Number (Optional)</label>
        <div class="display-flex align-items-center --phone-no-selector-widget width-24">
            <fieldset class="width-24 display-flex align-items-center --border-width-1 border-color-gray-scale-dark border-style-solid border-radius-extra-small-3 border-style-solid padding-top-4 padding-bottom-4 padding-left-7 padding-right-7">
                <div class="flex-shrink-0 text-3">{{country.data.dial_code}}</div>
                <input type="number" plunc-model="value" class="flex-grow-1 color-elegant-black border-style-none margin-left-5 text-3 background-color-transparent">
                <?php 
                    snippet('Plugins/CountrySelector',[
                        'select:class' => 'flex-shrink-0 margin-right-3 border-style-none text-4 background-color-transparent color-elegant-dark',
                        'options:class' => '',
                        'plunc:model' => 'country.name',
                        'plunc:change' => 'select.country()'
                    ]);
                ?>
                <img src="{{country.data.image}}" class="concrete-width-extra-small-17"> 
            </fieldset>
        </div>
    </div>
    <div plunc-if="state=='error'"></div>
</template>