<?php
/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Query Bluehost MySQL database for specific user participation information
 * Notable Features: Queries MySQL
 */

$email = $_POST['email'];

//db configuration
require('../db_config.php');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM users WHERE user_email = ?";
//preparing query
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
//reformatting date
if ($result->num_rows > 0) {
    $phpResult = mysqli_fetch_all($result, MYSQLI_ASSOC);
    if($phpResult[0]['social_justice_date'] != '0000-00-00'){
      $MySQL_date = $phpResult[0]['social_justice_date'];
      $unix_date = strtotime($MySQL_date);
      $JS_date = date('n/j/y', $unix_date);
      $phpResult[0]['social_justice_date'] = $JS_date;
    }
    else {
      $phpResult[0]['social_justice_date'] = 'Not Recorded';
    }
    if($phpResult[0]['academic_date'] != '0000-00-00'){
      $MySQL_date = $phpResult[0]['academic_date'];
      $unix_date = strtotime($MySQL_date);
      $JS_date = date('n/j/y', $unix_date);
      $phpResult[0]['academic_date'] = $JS_date;
    }
    else {
      $phpResult[0]['academic_date'] = 'Not Recorded';
    }
    echo(json_encode($phpResult));
} else {
    echo "0 results";
}

$conn->close();
?>
