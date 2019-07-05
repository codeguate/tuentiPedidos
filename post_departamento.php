<?php

        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "tuenti";
        $json = json_decode(file_get_contents("php://input"));
        $obj = json_decode($_POST["myData"]);
        // print_r($obj);
         // echo $obj['dpi'];
         // echo 'entre';
        // echo $obj->dpi;
        $values = get_object_vars($obj);
        // print_r($dpi);
        // echo $dpi['dpi'];   
        $val_departamento = $values['departamento'];
    

        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }else{
            echo 'se conecto';
            echo $val_departamento;
        } 

        $sql_check = "SELECT * FROM table_depar";
        $result = $conn->query($sql_check);

        
        $sql = "INSERT INTO table_depar(fecha, departamento) VALUES (NOW(),'$val_departamento')";

            if ($conn->query($sql) === TRUE) {
                echo 'entro';
            } else {
                echo 'no entro' ;
                echo $conn->error;
            }     
?>