import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder,  } from '@fortawesome/free-solid-svg-icons'
import './App.css'; 
import Php from './icons/php-brands.svg';
import htmlCanvas from 'html2canvas';
import FolderIcon from './icons/folder-solid.svg';
import _ from 'lodash';

function App() {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [folders, setFolders] = useState([]);
  const foldersdummy = [
    {
      "name": "First",
      "type": "folder"
    },
    {
      "name": "Second",
      "type": "folder"
    }
  ]

  const stringToObject = (textInput ) => {
    // console.log('this is the text Input ', textInput)
    let inputString = JSON.parse(textInput);
    console.log('the parsed value ', inputString);
    
    // let tempArray = []
    // {_.mapKeys(inputString, (value, key) => {
    //   console.log('showing the value ', value)
    //   // setFolders([...folders, {key: value}]);
    //   tempArray.push({key: value})
    // } 
    // )}
    // setFolders(tempArray);
    setFolders(inputString);

  }

 

  const handleClick = () => {
    htmlCanvas(document.querySelector("#capture")).then(canvas => {
      document.body.appendChild(canvas);
      let canvasUrl = canvas.toDataURL('image/png');

      // let  downloadCanvas = canvasUrl.replace(/^data:image.png/, "data:application/octet-stream");
      // setDownloadUrl(downloadCanvas);
      setDownloadUrl(canvasUrl)
    // document.querySelector('#downloadThis').attr("href", downloadCanvas);

	});

  }
  return (
    <div className="App">
      
      <div>
        <textarea onChange={(e) => stringToObject(e.target.value)
        }
        style={{width: '300px', height: '300px'}}>

        </textarea>
      </div>
      <div id="capture">
      <h2>show this</h2>
     {/* <FontAwesomeIcon icon={faFolder} /> */}

     {folders.map(fold => {
       if(Array.isArray(fold.folder)){
         fold.folder.map()
         return (
           <p>It is an array</p>
         )
       }
       if(typeof(fold.folder)  === 'object'){
        return (
          <p>It is an object</p>
        )
      }
       return (
        <>
        <img src={FolderIcon} style={{width: '20px', height: '10px'}}/> {fold.file}
        <br />
        
        </>
       )
     }
       
      
      )}

     {/* {_.mapKeys(folders, (value, key) => {
       console.log('showing the value ', value)
// (
//   <>
//  <img src={FolderIcon} style={{width: '20px', height: '10px'}}/> {value}
//  </>
// )
     } 
     )} */}
     </div>

     <button onClick={() => handleClick()}> Click this</button>

     <a href={downloadUrl} id="downloadThis" download>Download this</a>
    </div>
  );
}

export default App;
