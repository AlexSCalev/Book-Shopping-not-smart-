<?php 
    session_start();
    session_unset();
    header('Location: http://localhost/book_shopping/editorPage.php');
    exit;
?>