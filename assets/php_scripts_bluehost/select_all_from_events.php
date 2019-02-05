<?php
/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Query Bluehost MySQL database for event information
 * Notable Features: Querries MySQL
 */

//db configuration
require('../db_config.php');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM events ORDER BY date, time;";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $phpResult = mysqli_fetch_all($result, MYSQLI_ASSOC);

//Changes the MySQL date and time formatting into something easier to read
    for ($i = 0; $i < count($phpResult); $i++) {
      $MySQL_date = $phpResult[$i]["date"];
      $MySQL_time = $phpResult[$i]["time"];
      $unix_date = strtotime($MySQL_date);
      $unix_time = strtotime($MySQL_time);
      $JS_date = date('F j, Y', $unix_date);
      $JS_time = date('g:i a', $unix_time);
      $phpResult[$i]["date"] = $JS_date;
      $phpResult[$i]["time"] = $JS_time;
    }

    echo(json_encode($phpResult));
} else {
    echo "0 results";
}

$conn->close();

?>
