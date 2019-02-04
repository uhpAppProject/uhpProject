<?php
/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Sends an email to bjust@scu.edu with error information about a uhp app crash.
 * Notable Features: Uses php mailer. Takes input from the app.
 */

require('../email_config.php')
require('./PHPMailer.php');
require('./SMTP.php');
require('./Exception.php');
use PHPMailer\PHPMailer\Exception;

date_default_timezone_set('America/Los_Angeles');

$email = $_POST['user'];
$error_message = $_POST['error'];
$timestamp = date("D F d Y G:i:s"); //weekday, month day, year time

$message = "<p>Timestamp: $timestamp</p> <br>
            <p>User: $email</p> <br>
            <p>Error: $error_message</p>";


$mail = new PHPMailer\PHPMailer\PHPMailer(true);
   $mail->IsSMTP();
   $mail->SMTPDebug = 0;
   $mail->Host = 'smtp.gmail.com';
   $mail->Port = 587;
   $mail->SMTPSecure = 'tls';
   $mail->SMTPAuth = true;
   $mail->Username = $userName;
   $mail->Password = $password;
   $mail->SetFrom($userName, $nickName);
   $mail->AddReplyTo($userName, $nickName);
   $mail->AddAddress("bjust@scu.edu");
   $mail->IsHTML(true);
   $mail->Subject = 'UHP App Crash';
   $mail->Body = $message;

if ($mail->send()) {}
else{
 echo("Mailer Error: " . $mail->ErrorInfo);
}

?>
