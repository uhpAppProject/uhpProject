<?php
/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Creates a Sign In report in a txt file in the bluehost file manager.
 * Notable Features: Receives data from the uhp app. Creates a new file if the event doesn't already exist, otherwise appends to the existing file.
 */

date_default_timezone_set('America/Los_Angeles');

$timestamp = date("D F d Y G:i:s"); //day, month day, year time
$email =  $_POST['email']; //bjust@scu.edu, user email
$requirement = $_POST['requirement']; //Social Justice Event or UHP Event, event type
$title = $_POST['title']; //Event1, event title
$date = $_POST['date']; //YYYY-MM-DD, the date of the event
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$locationCheck = $_POST['locationCheck'];

$my_file = "../Reports/$title-$date.txt";

//appends data to a file if it already exists, creats a new file and writes data to it if it doesn't
//already exits
$report = file_get_contents($my_file);
$entry = "$email,$title,$requirement,$locationCheck,$latitude,$longitude,$timestamp";

if(boolval($report) && stristr($report, $email) == '') {

  $handle = fopen($my_file, 'a') or die(json_encode('Cannot open file:  '.$my_file));
  $new_data = "\n".$entry;
  fwrite($handle, $new_data);
  fclose($handle);
  echo(json_encode('FALSE'));

} elseif (!boolval($report)) {

  $handle = fopen($my_file, 'a') or die(json_encode('Cannot open file:  '.$my_file));
  $title_line = "User Email,Event Title,Requirement Filled,Location Check Passed,latitude,longitude,Timestamp";
  fwrite($handle, $title_line);
  $data = "\n".$entry;
  fwrite($handle, $data);
  fclose($handle);
  echo(json_encode('FALSE'));

} elseif (boolval($report) && stristr($report, $email) != '') {

  echo(json_encode("TRUE"));

}
 ?>
