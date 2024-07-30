<div style="background: linear-gradient(90deg, #ffffe7, #d5ffd0);" class="--border-width-1 border-color-gray-scale-extra-light standard-card-board-slate border-radius-extra-small-13">
    <div class="padding-x-15 padding-top-11">
        <div class="font-weight-bold text-24 color-everdark-elegant">Mindanao is now progressing.</div>
        <div class="text-5 line-height-17 margin-top-3 color-everdark-elegant">Don’t miss the latest development updates in Mindanao.</div>
    </div>
    <div class="margin-y-13"></div>
    <div class="padding-x-15">
        <?php snippet('Forms/Input',[
            'label' => 'Email Address',
            'size' => 'medium',
            'fieldset:enable' => true,
            'type' => 'text',
            'placeholder' => 'johndoe@example.com',
            'x:model' => 'joinEmailAddress',
            'icon:left' => [
                'icon' => '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />',
                'color' => 'svg-fill-none color-primary',
                'icon_stroke_width' => '1.5'
            ]
        ]); ?>
        <div class="margin-top-9"></div>
        <div class="display-flex align-items-center flex-direction-row-reverse">
            <?php snippet('Forms/Button',[
                'type' => 'button',
                'text' => 'Join Now',
                'size' => 'extra-large',
                'style' => 'simple',
                'custom:classes' => 'width-24',
                'text:color' => 'color-everwhite',
                'border:width' => '--border-width-1',
                'background:color' => 'background-color-primary',
                'border:style' => 'border-style-none',
                'border:color' => 'border-color-transparent',
                'border:radius' => 'border-radius-small-4',
                'hover:background:color' => 'background-color-gray-scale-super-light',
                'x:click' => 'goToRegistration()'
            ]);?>
        </div>
    </div>
    <div class="margin-y-13"></div>
    <div class="padding-x-15 text-3 color-gray-scale-extra-dark margin-left-7 padding-bottom-11 color-everdark-elegant">
        By signing up, you agree to our Terms and Conditions.
    </div>
</div>