<?php

if (isset($_POST['Insertar'])) {
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "tuenti";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "SELECT * FROM noPedido";
    $result = $conn->query($sql);
    $number = $result->num_rows + 1;

    $query = "INSERT INTO noPedido(id_tuenti, status, counter)
    VALUES($number,$number,$number)";
    

    if ($conn->query($query)) {
        header('Location: paso3.php#formularios');
    }
}else{
    print 'xd2';
}

?>