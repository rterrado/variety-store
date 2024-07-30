<?php 

class Margin {
    public function __construct(
        public string $top,
        public string $right,
        public string $bottom,
        public string $left
    ){
        
    }
}

class Padding {
    public function __construct(
        public string $top,
        public string $right,
        public string $bottom,
        public string $left
    ){
        
    }
}

class Text {
    public function __construct(
        public string $size,
        public string $color
    ){

    }
}

class Border {
    public string $radius = '';
    public function __construct(
        public string $enabled,
        public string $width,
        public string $color,
        public string $style
    ){

    }
}

class Icon {

}

class Plunc {
    public string $model = '';
    public string $click = '';
    public string $change = '';
    public string $touch = '';
    public string $disable = '';
    public function __construct(
        string | null $model,
        string | null $click,
        string | null $change,
        string | null $touch,
        string | null $disable,
    ){
        if ($model !== null) {
            $this->model = 'plunc-model="'.$model.'"';
        }
        if ($click !== null) {
            $this->click = 'plunc-click="'.$click.'"';
        }
        if ($change !== null) {
            $this->change = 'plunc-change="'.$change.'"';
        }
        if ($touch !== null) {
            $this->touch = 'plunc-touch="'.$touch.'"';
        }
        if ($disable !== null) {
            $this->disable = 'plunc-disable="'.$disable.'"';
        }
    }

}