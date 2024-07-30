<?php 

class Fieldset {
    public bool $wrap = false;
    public array $classlist = [];
    public function __construct(array $snippet){
        $this->wrap = $snippet['fieldset:enable'] ?? false;
    }
}

class Label {
    public string $value = '';
    public string $for = '';
    public string $position = 'default';
    public string $enabled;
    public array $classlist = [];
    public Text $Text;
    public Margin $Margin;
    public function __construct(string $inputid, array $snippet){
        $this->Text = new Text(
            size:  $snippet['label:text:size'] ?? 'text-2',
            color: $snippet['label:text:color'] ?? 'color-gray-scale-super-dark',
        );
        $this->Margin = new Margin(
            top:    $snippet['label:margin:top'] ?? '',
            right:  $snippet['label:margin:right'] ?? 'margin-right-5',
            left:   $snippet['label:margin:left'] ?? '',
            bottom: $snippet['label:margin:bottom'] ?? 'margin-bottom-4',
        );
        $this->enabled = false;
        if (!isset($snippet['label'])) return;
        $this->enabled = true;
        $this->value   = $snippet['label'];
        $this->for     = strtolower(
            str_replace(' ' , '_', $this->value) . $inputid
        );
        $this->position = $snippet['label:position'] ?? 'default';
        /** Default label classes that aren't affected by it's position */
        array_push(
            $this->classlist,
            $this->Text->color,
            $this->Text->size,
            $snippet['label:class:list'] ?? '',
            'display-inline-block'
        );
        if ($this->position === 'default') {
            array_push(
                $this->classlist,
                $this->Margin->bottom
            );
            return;
        }
        if ($this->position === 'inside') {
            array_push(
                $this->classlist,
                $this->Margin->right
            );
            return;
        }
    }
}

class InputMessage {
    public bool $enabled = true;
    public Text $Text; 
    public Margin $Margin;
    public array $classlist = [];
    public function __construct(array $snippet) {
        $this->enabled = $snippet['input:message:enabled'] ?? true;
        $this->Text = new Text(
            size: $snippet['input:message:text:size'] ?? 'text-2',
            color: $snippet['input:message:text:color'] ?? ''
        );
        $this->Margin = new Margin(
            top: $snippet['input:message:margin:top'] ?? 'margin-top-5',
            left: $snippet['input:message:margin:left'] ?? '',
            bottom: $snippet['input:message:margin:bottom'] ?? '',
            right: $snippet['input:message:margin:right'] ?? '',
        );
    }

}

class FormIcon {
    public string $path;
    public string $class;
    public string $strokewidth;
    public FormIcon $ErrorIcon;
    public FormIcon $SuccessIcon;
    public function __construct(
        array $snippet
    ){
        $this->path        = $snippet['path'] ?? '';
        $this->class       = $snippet['class'] ?? '';
        $this->strokewidth = $snippet['stroke:width'] ?? '1.5';
        if (isset($snippet['icon:option:error'])) {
            $this->ErrorIcon = new FormIcon($snippet['icon:option:error']);
        }
        if (isset($snippet['icon:option:success'])) {
            $this->SuccessIcon = new FormIcon($snippet['icon:option:success']);
        }
    }
}

class Input {
    public string $id;
    public string $name;
    public Padding $Padding;
    public Fieldset $Fieldset;
    public Label $Label;
    public Text $Text;
    public Border $Border;
    public Plunc $Plunc;
    public InputMessage $InputMessage;
    public string $type;
    public string $placeholder;
    public array $classlist = [];
    public FormIcon | null $lefticon = null;
    public FormIcon | null $righticon = null;
    public string $iconsize = '';
    public string $customclasses;
    public function __construct(array $snippet){
        $this->id           = uniqid().rand(1,1000);
        $this->name         = '/Forms/Input/' . $this->id;
        $this->Fieldset     = new Fieldset($snippet);
        $this->Label        = new Label($this->id, $snippet);
        $this->InputMessage = new InputMessage($snippet);
        $this->type         = $snippet['type'];
        $this->placeholder  = $snippet['placeholder'] ?? '';
        $this->Border       = new Border(
            enabled: $snippet['input:border:enable'] ?? true,
            width: $snippet['input:border:width'] ?? '--border-width-1',
            color: $snippet['input:border:color'] ?? 'border-color-gray-scale-dark',
            style: $snippet['input:border:style'] ?? 'border-style-solid',
        );
        $this->Border->radius = $snippet['input:border:radius'] ?? 'border-radius-extra-small-3';
        $this->customclasses  = $snippet['custom:classes'] ?? '';
        $change = null;
        if (isset($snippet['plunc:change'])) {
            $change = sprintf("%s('%s')", $snippet['plunc:change'], $this->name);
        }
        $click = null;
        if (isset($snippet['plunc:click'])) {
            $click = sprintf("%s('%s')", $snippet['plunc:click'], $this->name);
        }
        $touch = null;
        if (isset($snippet['plunc:touch'])) {
            $touch = sprintf("%s('%s')", $snippet['plunc:touch'], $this->name);
        }
        $this->Plunc = new Plunc(
            model:   $snippet['plunc:model'] ?? null,
            click:   $click ?? null,
            change:  $change ?? null,
            touch:   $touch ?? null,
            disable: $snippet['plunc:disable'] ?? null
        );
        if (isset($snippet['icon:left'])) {
            $this->lefticon = new FormIcon($snippet['icon:left']);
        }
        if (isset($snippet['icon:right'])) {
            $this->righticon = new FormIcon($snippet['icon:right']);
        }
    }
}

class MediumInput extends Input {
    public function __construct(array $snippet){
        parent::__construct($snippet);
        $this->Padding = new Padding(
            top: 'padding-top-6',
            bottom: 'padding-bottom-6',
            left: 'padding-left-7',
            right: 'padding-right-7'
        );
        $this->Text = new Text(
            size: $snippet['input:text:size'] ?? 'text-5',
            color: $snippet['input:text:color'] ?? 'color-elegant-dark'
        );
        $this->iconsize = $snippet['input:icons:width'] ?? 'concrete-width-extra-small-13';
    }
}




class Button {
    public string $textvalue;
    public string $type;
    public Text $Text;
    public Border $Border;
    public string $bgcolor;
    public string $bgcolorhover;
    public array $classlist = [];
    public Plunc $Plunc;
    public Padding $Padding;
    public string $iconsize;
    public string $justifycontent;
    public string $cursor;
    public FormIcon | null $lefticon = null;
    public FormIcon | null $righticon = null;
    public string $customclasses;
    public function __construct(array $snippet){
        $this->textvalue      = $snippet['text'];
        $this->type           = $snippet['type'] ?? 'button';
        $this->bgcolor        = $snippet['background:color'];
        $this->bgcolorhover   = $snippet['background:color:hover'];
        $this->cursor         = $snippet['cursor'] ?? 'cursor-pointer';
        $this->justifycontent = $snippet['flexbox:justify_content'] ?? 'justify-content-center';
        $this->customclasses  = $snippet['custom:classes'] ?? '';
        $this->Border         = new Border(
            enabled: $snippet['border:enabled'] ?? true,
            style: $snippet['border:style'] ?? '',
            color: $snippet['border:color'] ?? '',
            width: $snippet['border:width'] ?? ''
        );
        $this->Border->radius = $snippet['border:radius'] ?? 'border-radius-extra-small-3';
        $this->Plunc = new Plunc(
            model:   null,
            click:   $snippet['plunc:click'] ?? null,
            change:  null,
            touch:   null,
            disable: $snippet['plunc:disable'] ?? null
        );
        if (isset($snippet['icon:left'])) {
            $this->lefticon = new FormIcon($snippet['icon:left']);
        }
        if (isset($snippet['icon:right'])) {
            $this->righticon = new FormIcon($snippet['icon:right']);
        }
        array_push(
            $this->classlist,
            $this->bgcolor,
            $this->bgcolorhover,
            $this->justifycontent,
            $this->customclasses,
            $this->cursor
        );
        if ($this->Border->enabled) {
            array_push(
                $this->classlist,
                $this->Border->style,
                $this->Border->color,
                $this->Border->width,
                $this->Border->radius
            );
        }
    }
}

class MediumButton extends Button {
    public function __construct(array $snippet){
        parent::__construct($snippet);
        $this->Padding = new Padding(
            top: 'padding-top-6',
            bottom: 'padding-bottom-6',
            left: 'padding-left-10',
            right: 'padding-right-10'
        );
        $this->Text = new Text(
            size: $snippet['text:size'] ?? 'text-5',
            color: $snippet['text:color'] ?? 'color-everwhite'
        );
        $this->iconsize = $snippet['icons:width'] ?? 'concrete-width-extra-small-13';
    }
}