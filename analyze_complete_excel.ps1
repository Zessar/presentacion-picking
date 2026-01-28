$excel = New-Object -ComObject Excel.Application
$workbook = $excel.Workbooks.Open('c:\Users\cesar.sequera\Desktop\Presentacion Picking\Imagenes\Resumen_Productividad_DICIEMBRE_2025.xlsx')

$summaryFile = "excel_extra_analysis.json"
$extraData = @{}

for ($s = 1; $s -le $workbook.Sheets.Count; $s++) {
    $sheet = $workbook.Sheets.Item($s)
    $sheetName = $sheet.Name
    $range = $sheet.UsedRange
    $data = $range.Value2
    
    # Store everything to ensure nothing is missed
    $extraData[$sheetName] = $data
}

$workbook.Close($false)
$excel.Quit()

$extraData | ConvertTo-Json -Depth 10 | Out-File -FilePath $summaryFile -Encoding utf8
