<?php
/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Login script. Queries Bluehost MySQl database to test if a user exists in the uhp app users database
 * Notable Features: Querries MySQL. Checkes non-hashed values against hashed ones
 */

$email = $_POST['email'];
$_password = $_POST['password'];

//db configuration
require('../db_config.php');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//SQL querry
$sql = "SELECT * FROM login
        WHERE email = ?";

if (!($stmt = $conn->prepare($sql))) {
    echo(json_encode("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error));
}

if (!$stmt->bind_param("s", $email)) {
    echo(json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error));
}

if (!$stmt->execute()) {
    echo(json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error));
}

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $phpResult = mysqli_fetch_all($result, MYSQLI_ASSOC);
    if(password_verify($_password, $phpResult[0]['password'])){
      echo(json_encode(True));
    }
    else{
      echo(json_encode(False));
      }
}
else {
    echo(json_encode(False));
}

$stmt->close();
$conn->close();
?>
