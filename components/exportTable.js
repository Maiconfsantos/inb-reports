import React from 'react';
import buttonStyleExport from './exportTable.module.css'
import { BsDownload } from 'react-icons/bs'

function ButtonExport() {
    function exportTableToExcel(){
        console.log('oi')
        var downloadLink;
        var dataType = 'text/csv;charset=utf-8,%EF%BB%BF';
        var tableSelect = document.getElementById('table');
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        
        // Specify file name
        let filename = 'tabela.xls';
        
        // Create download link element
        downloadLink = document.createElement("a");
        
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), // UTF-8 BOM
            csv
            ],
            { type: "text/csv;charset=utf-8,%EF%BB%BF" });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
    }
  
  return (
    <button onClick={exportTableToExcel} className={buttonStyleExport.button}>
      <BsDownload className={buttonStyleExport.icon}/> Exportar tabela
    </button>
  );
}

export default ButtonExport;