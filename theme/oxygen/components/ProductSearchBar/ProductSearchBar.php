<?php 
// Declare here all the child components to be used within this component
# Kenjiefx\StrawberryScratch\Registry\ComponentsRegistry::register('ExampleComponent');
?>

<template plunc-name="ProductSearchBar">
    <div plunc-if="state=='loading'"></div>
    <form plunc-block="ProductSearchForm" onsubmit="blockAutoSubmit(event)" plunc-if="state=='active'" class="width-24 height-24">
        <fieldset class="background-color-transparent width-24 display-flex align-items-center height-24" style="border-style:none;box-shadow: none;" xblock="/Forms/Input/66578cf819b5185">
            <input class="background-color-transparent width-24 text-5 border-style-none height-24 padding-y-7" type="text" plunc-change="search()" plunc-model="keyword" placeholder="search product by external id" style="text-align:right;"/>   
            <svg plunc-if="button=='search'" style="width:45px;" class="svg-fill-none color-primary padding-x-7 padding-y-7 margin-left-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <svg plunc-if="button=='empty'" style="width:45px;" plunc-click="clear()" class="cursor-pointer svg-fill-none color-primary padding-x-7 padding-y-7 margin-left-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </fieldset>
        <button type="submit" class="display-none"></button>
    </form>
    <div plunc-if="state=='error'"></div>
</template>