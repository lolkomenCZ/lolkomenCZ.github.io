<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = htmlspecialchars($_POST['date'] ?? '');
    $time = htmlspecialchars($_POST['time'] ?? '');
    $people = htmlspecialchars($_POST['people'] ?? '');
    $type = htmlspecialchars($_POST['ticket_type'] ?? '');
    $fname = htmlspecialchars($_POST['fname'] ?? '');
    $lname = htmlspecialchars($_POST['lname'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');

    $file = __DIR__ . '/../csv/bookings.csv';
    
    if (!file_exists($file)) {
        $header = "Datum,Cas,Pocet,Typ,Jmeno,Prijmeni,Email,Telefon\n";
        file_put_contents($file, $header);
    }

    $row = [$date, $time, $people, $type, $fname, $lname, $email, $phone];
    $fp = fopen($file, 'a');
    if ($fp !== false) {
        fputcsv($fp, $row);
        fclose($fp);
        echo "success";
    } else {
        http_response_code(500);
        echo "error";
    }
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}