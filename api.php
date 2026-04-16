<?php
// DATA
header('Content-Type: application/json; charset=utf-8');
$csvFile = 'exhibitions.csv';
$data = [];

if (file_exists($csvFile) && ($handle = fopen($csvFile, 'r')) !== false) {
  $headers = fgetcsv($handle, 1000, ',');
  while (($row = fgetcsv($handle, 1000, ',')) !== false) {
    $data[] = [
      'title' => $row[0],
      'desc' => $row[1],
      'category' => $row[2],
      'image' => $row[3]
    ];
  }
  fclose($handle);
}

echo json_encode($data);
?>