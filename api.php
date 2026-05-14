<?php
header('Content-Type: application/json; charset=utf-8');

$file = 'exhibitions.csv';
$out = [];

if (file_exists($file)) {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $headers = str_getcsv(array_shift($lines));
    
    foreach ($lines as $line) {
        $row = str_getcsv($line);
        if (count($row) >= 4) {
            $out[] = [
                'title' => $row[0],
                'desc' => $row[1],
                'category' => $row[2],
                'image' => $row[3]
            ];
        }
    }
}

echo json_encode($out, JSON_UNESCAPED_UNICODE);