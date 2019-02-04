<?php
/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Update user passwords from inside the uhp app
 * Notable Features: Uses one way hashing on passwords. Inserts into Bluehost MySQL database
 */

$email = $_POST['email'];
$_password = $_POST['password'];
$hashedPassword = password_hash($_password, PASSWORD_DEFAULT);

//db configuration
require('../db_config.php');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//currently configured for bluehost
$sql = "UPDATE login SET password = ? WHERE email = ?";

if (!($stmt = $conn->prepare($sql))) {
    echo(json_encode("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error));
}

if (!$stmt->bind_param("ss", $hashedPassword, $email)) {
    echo(json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error));
}

if ($stmt->execute()) {
    $result = $stmt->get_result();
    echo json_encode(True);
}
else {
    echo json_encode(False);
}

$stmt->close();
$conn->close();
?>
