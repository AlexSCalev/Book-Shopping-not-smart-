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
    function show2DArray($array2D){
        for($i = 0; $i < count($array2D);$i++){
            echo "<br>";
            for($j = 0;$j < count($array2D[$i]);$j++){
                echo " ".$array2D[$i][$j];
            }
        }
    }
    function show1DArray($array1D){
        for($i = 0; $i < count($array1D);$i++){
            echo " ".$array1D[$i];
        }
    }
    function readDateTable1($link){
        $arr_inf = array();
        $qeury = "SELECT * FROM  book_information";
        $result = mysqli_query($link,$qeury);
        $countes = mysqli_num_rows($result);
        for($i = 0; $i < $countes; $i++){
        $row = mysqli_fetch_row($result);
            array_push($arr_inf, $row);
        } 
        return $arr_inf;
    }
    function readDateTable2($parent_id,$link){
        $arr_pages = array();
        $qeury = "SELECT link_pages FROM  about_book
        WHERE id_parent = $parent_id";
        $result = mysqli_query($link,$qeury);
        $countes = mysqli_num_rows($result);
        for($i = 0; $i < $countes; $i++) {
        $row = mysqli_fetch_row($result);
            array_push($arr_pages, $row);
        }
        return $arr_pages;
    }
    function getSizePages($link){
        $qeury = "SELECT * FROM  about_book";
        $result = mysqli_query($link,$qeury);
        $countes = mysqli_num_rows($result);
        return $countes;
    }
    function makeCardsBook($arr_inf,$link) {
        $count_books = getSizePages($link);
        $a = count($arr_inf)/6;
        $b = ceil($a);
        echo "<script>drawSheels('$b')</script>";
        for($i = 0; $i < count($arr_inf); $i++) {
            $tempString1 = implode(" | ",$arr_inf[$i]);
            $arrTemp = readDateTable2($arr_inf[$i][0],$link);
            for($j = 0; $j < count($arrTemp); $j++) {
                $tempString2 = implode(" | ",$arrTemp[$j]);      
                echo "<script>formatDates('$tempString1','$tempString2','$count_books')</script>";
            }
        }
    }

    if(isset($_POST['valueInputEmail']) && isset($_POST['valueInputPassword'])) {
        $link = connect_to_db();
        $email = $_POST['valueInputEmail'];
        $qeury = "SELECT pass_editor  FROM user_editors 
        WHERE email_editor LIKE '$email'";
        $result = mysqli_query($link,$qeury);
        $countes = mysqli_num_rows($result);
        $row = mysqli_fetch_row($result);
        if (password_verify($_POST['valueInputPassword'],$row[0])) {
            session_start();
            $_SESSION['user'] = $_POST['valueInputEmail'];
            header('Location: http://localhost/book_shopping/editorPage.php');
            exit;
        }

        // Alert to errors 
        if($countes == 0) {
            // Show error
            echo "<script>alert('Error , Sorry this email wasn`t found');</script>";
            // Clear post when your refresh
            header("Refresh:0; url = http://localhost/book_shopping/cleanerPost.php");
        } else {
            echo "<script>alert('You fill incorect password');</script>";
            // Clear post when your refresh
            header("Refresh:0; url = http://localhost/book_shopping/cleanerPost.php");
        }
    }
    
    require("index.html");
//   Open connecting to DB
    connect_to_db();
    $arr_inf = readDateTable1(connect_to_db());
    makeCardsBook($arr_inf,connect_to_db());
    
    echo "<script src = 'scale.js'></script>";
// Close Connectiong to DB
    mysqli_close(connect_to_db());

?>