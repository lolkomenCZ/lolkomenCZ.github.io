<?php
header('Content-Type: application/json; charset=utf-8');

$file = __DIR__ . '/../csv/exhibitions.csv';
$out = [];

if (file_exists($file)) {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines && count($lines) > 0) {
        $headers = str_getcsv(array_shift($lines));
        
        foreach ($lines as $line) {
            $row = str_getcsv($line);
            if (count($row) >= 4) {
                $out[] = [
                    'title' => trim($row[0]),
                    'desc' => trim($row[1]),
                    'category' => trim($row[2]),
                    'image' => trim($row[3])
                ];
            }
        }
    }
}

echo json_encode($out, JSON_UNESCAPED_UNICODE);