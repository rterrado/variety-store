<?php 
    $stroke_width = $snippet['stroke:width'] ?? '0.5';
?>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="<?php echo $stroke_width; ?>" stroke="currentColor" class="<?php echo $snippet['class'] ?? ''; ?>">
    <?php 
        if (str_contains($snippet['path'], '/Paths')) {
            echo file_get_contents(__dir__.$snippet['path']);
        } else {
            echo $snippet['path'];
        }
    ?>
</svg>