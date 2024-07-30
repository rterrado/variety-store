<?php 

    $name    = $snippet['name'];
    $content = $snippet['include'];

?>

<dialog xblock="<?php echo $name; ?>" class="--slate-modal-backdrop">
    <?php include $content; ?>
</dialog>