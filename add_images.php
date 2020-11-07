<?php
 function connect_to_db(){
    $hostName = "localhost";
    $userAccses = "root";
    $password = "";
    $datebaseName = "booking_shopping";
    $connect = mysqli_connect($hostName,$userAccses,
    $password,$datebaseName);
    return $connect;
}

function getLastBook(){
    $rootpath = 'book/';
    $fileinfos = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($rootpath)
    );
    $max = 1;
    foreach($fileinfos as $pathname => $fileinfo) {
        if (!$fileinfo->isFile()) continue;
        if(strpos($pathname, 'Oblojca') !== false) {
            $numberBook = substr($pathname, 13, -5);
            if($numberBook > $max){
                $max = $numberBook;
            }
        }
    }
    return $max;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{   
    
    if(!empty($_FILES['Oblojca']['name'])){
    $link = connect_to_db();
    // Write information about book in book information
    $book_name = $_POST['namebook'];
    $genere_book = $_POST['genere'];
    $author_book = $_POST['author'];
    $price_book = $_POST['pricebook'];

    echo $_POST['namebook'];
    echo  $_POST['genere'];
    echo  $_POST['author'];
    echo  $_POST['pricebook'];
    $qeury = "INSERT INTO book_information (name_book,genere_book,name_author,price_book)
    VALUES ('$book_name','$genere_book','$author_book','$price_book');";
    $result = mysqli_query($link,$qeury);
    // Get last id
    $qeury = "SELECT id_book FROM book_information WHERE id_book = LAST_INSERT_ID();";
    $result = mysqli_query($link,$qeury);
    $row = mysqli_fetch_row($result);
    $parent_id = $row[0];
    // $numberBook = getLastBook()+1;
    foreach ($_FILES as $key => $value) {
        if(strpos($key, 'Oblojca') !== false) {
            $value['name'] = $key.'['.$parent_id.']'.'.'.pathinfo($value['name'], PATHINFO_EXTENSION);
            $name = $value['name'];
            $file_temp = $value["tmp_name"];
            move_uploaded_file($file_temp , "book/$name");
            $qeury = "INSERT INTO about_book (id_parent,link_pages) 
            VALUES ('$parent_id','/book/$name');";
            $result = mysqli_query($link,$qeury);
        } else if(strlen($value['name']) != 0 && strpos($key, 'Oblojca') == false) {
            $value['name'] = 'page_oblojca_['.$parent_id.']_'.$key.'.'.pathinfo($value['name'], PATHINFO_EXTENSION);
            $name = $value['name'];
            $file_temp = $value["tmp_name"];
            move_uploaded_file($file_temp , "book/$name");

            $qeury = "INSERT INTO about_book (id_parent,link_pages) 
            VALUES ('$parent_id','/book/$name');";
            $result = mysqli_query($link,$qeury);
        }
    }
    // Save date in date base
        header('Location: http://localhost/book_shopping/editorPage.php');
        exit;
    } else {
        echo "<h1>Error if you see this messages you forgot add Cover Page for book</h1>";
        header("Refresh:2; url = http://localhost/book_shopping/editorPage.php");
    }

}


?>