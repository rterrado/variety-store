<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="BillingAddressForm">
    <div plunc-if="state=='loading'"></div>
    <div plunc-if="state=='active'">
        <div class="display-flex align-items-center">
            <div>
                <?php snippet('Toggles/Switch',[
                    'size' => 'medium',
                    'shape' => 'round',
                    'plunc:change' => 'toggleForm()',
                    'plunc:model' => 'isAddBillingAddress'
                ]) ?>
            </div>
            <div plunc-if="isAddBillingAddress == false" class="margin-left-7 text-4">
                Add a billing address
            </div>
        </div>
        <div plunc-if="isAddBillingAddress == true" class="margin-top-7 width-24">
            <?php snippet('Forms/Input',[
                'fieldset:enable' => true,
                'label' => 'Address Line 1',
                'label:class:list' => 'font-weight-300',
                'type' => 'text',
                'input:text:size' => 'text-2',
                'plunc:model' => 'addressLine1',
            ]);?>
            <div class="margin-top-7 width-24 display-flex">
                <div class="width-12 padding-right-5">
                    <?php snippet('Forms/Input',[
                        'label' => 'City / Town',
                        'label:class:list' => 'font-weight-300',
                        'size' => 'medium',
                        'fieldset:enable' => true,
                        'type' => 'text',
                        'plunc:model' => 'townCity'
                    ]); ?>
                </div>
                <div class="width-12 padding-right-5">
                    <?php snippet('Forms/Input',[
                        'label' => 'State / Province',
                        'label:class:list' => 'font-weight-300',
                        'size' => 'medium',
                        'fieldset:enable' => true,
                        'type' => 'text',
                        'plunc:model' => 'stateProvince'
                    ]); ?>
                </div>
            </div>
            <div class="margin-top-7 width-24 display-flex align-items-center">
                <div class="width-8 padding-right-5">
                    <?php snippet('Forms/Input',[
                        'label' => 'Zip Code',
                        'label:class:list' => 'font-weight-300',
                        'size' => 'medium',
                        'fieldset:enable' => true,
                        'type' => 'text',
                        'plunc:model' => 'zipcode'
                    ]); ?>
                </div>
                <div class="width-16" style="margin-top:-6px;">
                    <label for="" class="text-2 display-inline-block font-weight-300 color-gray-scale-super-dark margin-bottom-5">Country</label>
                    <fieldset class="width-24 display-flex align-items-center --border-width-1 border-color-gray-scale-dark border-style-solid border-radius-extra-small-3 border-style-solid padding-top-4 padding-bottom-4 padding-left-7 padding-right-7">
                        <?php 
                            snippet('Plugins/CountrySelector',[
                                'select:class' => 'padding-y-2 width-24 text-4 border-style-none background-color-transparent color-elegant-dark',
                                'options:class' => '',
                                'plunc:model' => 'country',
                                'plunc:change' => 'select.country()'
                            ]);
                        ?>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
    <div plunc-if="state=='error'"></div>
</template>