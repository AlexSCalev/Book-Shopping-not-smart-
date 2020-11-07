<?php
   // if(strpos($pathname, 'Oblojca') !== false) {
        //     $numberBook = substr($pathname, 13, -5);
        //     if($numberBook > $max){
        //         $max = $numberBook;
        //     }
        // }

  function connect_to_db(){
    $hostName = "localhost";
    $userAccses = "root";
    $password = "";
    $datebaseName = "booking_shopping";
    $connect = mysqli_connect($hostName,$userAccses,
    $password,$datebaseName);
    return $connect;
}

function get_string_between($string, $start, $end){
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}

function removeBook($id){
    $rootpath = 'book/';
    $fileinfos = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($rootpath)
    );
    foreach($fileinfos as $pathname => $fileinfo) {
        if (!$fileinfo->isFile()) continue;
        if($id == (int)get_string_between($pathname,'[',']')) {
            unlink($pathname);
        }
    }
}


if(isset($_POST["id"])) {
// Delete date in table "about book"
    $id = $_POST["id"];
    $link = connect_to_db();
    $qeury = "DELETE FROM about_book
    WHERE id_parent = $id";
    $result = mysqli_query($link,$qeury);
// Delete date in table "book_information"
    $qeury = "DELETE FROM book_information
    WHERE id_book = $id";
    $result = mysqli_query($link,$qeury);
// Delete file on server
    removeBook($id);
    header('Location: editorPage.php');
    exit;
}

mysqli_close(connect_to_db());
?>