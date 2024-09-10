<?php

require_once __dir__.'/models.php';
if (!isset($snippet['size']) || $snippet['size'] === 'medium') {
    $Input = new MediumInput($snippet);
}

array_push(
    $Input->Fieldset->classlist,
    $Input->Padding->top,
    $Input->Padding->bottom,
    $Input->Padding->left,
    $Input->Padding->right
);

array_push(
    $Input->classlist,
    $Input->Text->size,
    $Input->Text->color,
    'background-color-transparent'
);

array_push(
    $Input->InputMessage->classlist,
    $Input->InputMessage->Text->size,
    $Input->InputMessage->Text->color,
    $Input->InputMessage->Margin->top,
    $Input->InputMessage->Margin->right,
    $Input->InputMessage->Margin->left,
    $Input->InputMessage->Margin->bottom,
);

if ($Input->Fieldset->wrap && $Input->Border->enabled) {
    array_push(
        $Input->Fieldset->classlist,
        $Input->Border->width,
        $Input->Border->style,
        $Input->Border->radius
    );
    array_push(
        $Input->classlist,
        'border-style-none'
    );
}

if ($Input->Fieldset->wrap) {

    if ($Input->Label->enabled && $Input->Label->position === 'default') {
        echo sprintf(
            '<label for="%s" class="%s">%s</label>',
            $Input->Label->for,
            trim(implode(' ', $Input->Label->classlist)),
            $Input->Label->value
        );
    }

    echo sprintf(
        '<fieldset class="%s" plunc-block="%s" %s>',
        trim(implode(' ', $Input->Fieldset->classlist)),
        $Input->name,
        $Input->Fieldset->attrdisabled
    );

        if ($Input->lefticon !== null || $Input->righticon !== null || $Input->Label->position === 'inside') {
            array_push($Input->classlist, 'flex-grow-1');
            echo '<div class="display-flex align-items-center width-24">';
        } else {
            array_push($Input->classlist, 'width-24');
        }

            if ($Input->Label->enabled && $Input->Label->position === 'inside') {
                echo sprintf(
                    '<label for="%s" class="%s">%s</label>',
                    $Input->Label->for,
                    trim(implode(' ', $Input->Label->classlist)),
                    $Input->Label->value
                );
            }

            if ($Input->lefticon !== null) {
                array_push($Input->classlist, 'margin-left-5');
                snippet('Icons/SVG',[
                    'class' => $Input->lefticon->class.' '.$Input->iconsize,
                    'path' => $Input->lefticon->path,
                    'stroke:width' => $Input->lefticon->strokewidth
                ]);
            }
            
            echo sprintf(
                '<input id="%s" type="%s" placeholder="%s" class="%s" %s %s %s %s %s />',
                $Input->Label->for,
                $Input->type,
                $Input->placeholder,
                trim(implode(' ', $Input->classlist)),
                $Input->Plunc->model,
                $Input->Plunc->click,
                $Input->Plunc->change,
                $Input->Plunc->touch,
                $Input->Plunc->disable
            );

            if ($Input->righticon !== null) {
                echo '<div style="display:none;" slate-input-icon-block="error">';
                snippet('Icons/SVG',[
                    'class' => $Input->righticon->ErrorIcon->class .' '.$Input->iconsize,
                    'path' => $Input->righticon->ErrorIcon->path,
                    'stroke:width' => $Input->righticon->ErrorIcon->strokewidth
                ]);
                echo '</div>';
                echo '<div style="display:none;" class="--slate-theme-spinner-simple " slate-input-icon-block="loading"></div>';
                echo '<div style="display:none;" slate-input-icon-block="success">';
                snippet('Icons/SVG',[
                    'class' => $Input->righticon->SuccessIcon->class .' '.$Input->iconsize,
                    'path' => $Input->righticon->SuccessIcon->path,
                    'stroke:width' => $Input->righticon->SuccessIcon->strokewidth
                ]);
                echo '</div>';
            }

        if ($Input->lefticon !== null || $Input->righticon) {
            echo '</div>';
        }

    echo '</fieldset>';
}

if ($Input->InputMessage->enabled) {
    echo sprintf(
        '<div class="%s" plunc-block="%s/Message"></div>',
        trim(implode(' ', $Input->InputMessage->classlist)),
        $Input->name
    );
}
