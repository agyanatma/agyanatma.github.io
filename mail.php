<?php

if(isset($_POST['submit'])){
    $to = "agyanatma1410@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['name'];
    $subject = "Form portfolio website";
    $message = $name . " message :" . "\n\n" . $_POST['message'];
    $headers = "From:" . $from;
    mail($to,$subject,$message,$headers);
    header("Location: index.php?#contact");
    exit();
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
?>