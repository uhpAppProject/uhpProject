<?php
/*
 * Coded by Brad Just on 2/1/19.
 * Purpose: Emails a uhp app user with a code generated in the uhp app so they can reset their password.
 * Notable Features: Takes input from the uhp app. Uses PHP Mailer.
 */

require('../db_config.php');
require('../email_config.php');
require('./PHPMailer.php');
require('./SMTP.php');
require('./Exception.php');
use PHPMailer\PHPMailer\Exception;

$email = $_POST['email'];
$code = $_POST['code'];

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//currently configured for bluehost
$sql = "SELECT * FROM login WHERE email = ?";

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

$message = "<p>Disreguard this email if you didn't complete the change password form.</p>
            <p>Your pin number is: $code.</p>
            <p>Enter the above pin into the UHP App and you will be prompted to choose a new password.</p>";

if ($result->num_rows > 0)
  {

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
       $mail->AddAddress($email);
       $mail->IsHTML(true);
       $mail->Subject = 'UHP App Password Reset';
       $mail->Body = $message;

   if ($mail->send()) {}
   else{
     echo("Mailer Error: " . $mail->ErrorInfo);
   }
  }
else
  {
     echo('Invalid Email');
  }


$conn->close();
?>
