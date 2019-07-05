<!DOCTYPE html>
<html>
<head>
<style>
table {
  border-collapse: collapse;
  width: 100%;
  padding-top: 1em;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {background-color: #f2f2f2;}
</style>
<meta name="description" content="Bootstrap.">  
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">   
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css"></style>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</head>
<body>

	<form action="show_dpi.php" method="POST" >
		<input type="text" name="pass">
		<input type="submit" name="submit">
	</form>

<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "tuenti";
$pass = $_POST['pass'];

if((isset($_POST['submit'])) && ($pass == 'tuentiRoot')){
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, dpi, pedido,nombre, celular, date_entry FROM dpi_tracking ORDER BY id DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table id='myTable' class='table table-striped'><thead><tr><th>ID</th><th>DPI</th><th>PEDIDO</th><th>NOMBRE</th><th>CELULAR</th><th>FECHA</th></tr></thead>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["id"]. "</td><td>" . $row["dpi"]. "</td><td>" . $row["pedido"]. "</td><td>" . $row["nombre"]. "</td><td>" . $row["celular"]. "</td><td>" . $row["date_entry"]. "</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}
$conn->close();
}

?> 

</body>
<script>
$(document).ready(function(){
    $('#myTable').dataTable();
});
</script>
</html>