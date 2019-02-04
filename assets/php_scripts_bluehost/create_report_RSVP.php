<?php
/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Creates an RSVP report in a txt file in the bluehost file manager.
 * Notable Features: Receives data from the uhp app. Creates a new file if the event doesn't already exist, otherwise appends to the existing file.
 */

date_default_timezone_set('America/Los_Angeles');

$timestamp = date("D F d Y G:i:s"); //day, month day, year time
$email =  $_POST['email']; //bjust@scu.edu, user email
$title = $_POST['title']; //Event1, event title
$date_JS = $_POST['date']; //Month day, year. the date of the event

$date = date('n-j-y', strtotime($date_JS));

$my_file = "../Reports/RSVP-$title-$date.txt";

//appends data to a file if it already exists, creats a new file and writes data to it if it doesn't
//already exits
$report = file_get_contents($my_file);
$entry = "$email,$title,$date,$timestamp";

if(boolval($report) && stristr($report, $email) == '') {

  $handle = fopen($my_file, 'a') or die(json_encode('Cannot open file:  '.$my_file));
  $new_data = "\n".$entry;
  fwrite($handle, $new_data);
  fclose($handle);
  echo(json_encode('FALSE'));

} elseif (!boolval($report)) {

  $handle = fopen($my_file, 'a') or die(json_encode('Cannot open file:  '.$my_file));
  $title_line = "User Email,Event Title,Event Date,Timestamp";
  fwrite($handle, $title_line);
  $data = "\n".$entry;
  fwrite($handle, $data);
  fclose($handle);
  echo(json_encode('FALSE'));

} elseif (boolval($report) && stristr($report, $email) != '') {

  echo(json_encode("TRUE"));

}
 ?>
