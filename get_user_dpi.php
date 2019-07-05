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
        $dpi = get_object_vars($obj);
        // print_r($dpi);
        // echo $dpi['dpi'];   
        $val_dpi = $dpi['dpi'];
        $val_pedido = $dpi['pedido'];
        $val_nombre = $dpi['nombre'];    
        $val_celular = $dpi['celular'];        


        //     $user_agent = $_SERVER['HTTP_USER_AGENT']; //user browser
        //     $ip_address = $_SERVER["REMOTE_ADDR"];     // user ip adderss

        //     $url = json_decode(file_get_contents("http://api.ipinfodb.com/v3/ip-city/?key=0636a8a6fd0cf88c7555aa5b5d4e752a5cf92ae6ccb05c9bd91f6012c70d1f4c&ip=".$_SERVER['REMOTE_ADDR']."&format=json"));
        //     $country = $url->countryName;  // user country
        //     $city = $url->cityName;       // city
        //     $region = $url->regionName;   // regoin
        //     $latitude = $url->latitude;    //lat and lon
        //     $longitude = $url->longitude;
        //     date_default_timezone_set('UTC');
        //     $date = date("Y-m-d");
        //     $time = date("H:i:s");

        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 

        $sql_check = "SELECT * FROM dpi_tracking WHERE dpi LIKE '$val_dpi'";
        $result = $conn->query($sql_check);

        if ($result->num_rows > 0) {
           echo "Este dpi ya fue utilizado";
        }else {
               $sql = "INSERT INTO dpi_tracking(dpi, pedido, nombre, celular, date_entry) VALUES ('$val_dpi', '$val_pedido','$val_nombre', '$val_celular', NOW())";

            if ($conn->query($sql) === TRUE) {
               // echo 'entro';
            } else {
               // echo 'no entro' ;
               // echo $conn->error;
            }
        }


       
?>