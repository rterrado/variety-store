<?php 

    $content = $snippet['content'];
    $link = $snippet['link'];
    $classes = $snippet['class'] ?? '';

?>

<a href="<?php echo $link; ?>" class="cursor-pointer <?php echo $classes; ?>">
    <?php echo $content; ?>
</a>