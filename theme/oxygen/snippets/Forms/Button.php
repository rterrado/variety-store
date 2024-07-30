<?php

require_once __dir__.'/models.php';
if (!isset($snippet['size']) || $snippet['size'] === 'medium') {
    $Button = new MediumButton($snippet);
}

array_push(
    $Button->classlist,
    $Button->Padding->top,
    $Button->Padding->right,
    $Button->Padding->bottom,
    $Button->Padding->left,
    $Button->Text->color,
    $Button->Text->size,
    'display-flex',
    'align-items-center'
);

echo sprintf(
    '<button type="%s" %s %s class="%s">',
    $Button->type,
    $Button->Plunc->click,
    $Button->Plunc->disable,
    trim(implode(' ', $Button->classlist))
);

    if ($Button->lefticon !== null){
        snippet('Icons/SVG',[
            'class' => $Button->lefticon->class.' '.$Button->iconsize,
            'path' => $Button->lefticon->path,
            'stroke:width' => $Button->lefticon->strokewidth
        ]);
    }

    echo $Button->textvalue;

    if ($Button->righticon !== null){
        snippet('Icons/SVG',[
            'class' => $Button->righticon->class.' '.$Button->iconsize,
            'path' => $Button->righticon->path,
            'stroke:width' => $Button->righticon->strokewidth
        ]);
    }

echo '</button>';