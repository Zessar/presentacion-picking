$excelPath = "c:\Users\cesar.sequera\Desktop\Presentacion Picking\Imagenes\Resumen_Productividad_DICIEMBRE_2025.xlsx"
$outputDir = "c:\Users\cesar.sequera\Desktop\Presentacion Picking\extracted_data"

# Create output directory if it doesn't exist
if (!(Test-Path -Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

try {
    $workbook = $excel.Workbooks.Open($excelPath)
    
    foreach ($sheet in $workbook.Worksheets) {
        $sheetName = $sheet.Name
        # Sanitize sheet name for filename
        $safeName = $sheetName -replace '[^a-zA-Z0-9]', '_'
        $csvPath = Join-Path -Path $outputDir -ChildPath "${safeName}.csv"
        
        Write-Host "Extracting sheet '$sheetName' to '$csvPath'..."
        $sheet.SaveAs($csvPath, 6) # 6 = xlCSV
    }
}
catch {
    Write-Error "Error processing Excel file: $_"
}
finally {
    $workbook.Close($false)
    $excel.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
