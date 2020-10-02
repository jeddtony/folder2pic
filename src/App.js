import React, {useState} from 'react';
import {Row, Col, Input, Menu, Dropdown, Button} from 'antd';
import 'antd/dist/antd.css';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import FolderIcon from './icons/folder-solid.svg';
import htmlCanvas from 'html2canvas';
export default function App() {
    const {TextArea} = Input

    const defaultFieldWidth = "500px";
    const defaultFieldHeight = "100px";

    const [inputFormat, setInputFormat] = useState('JSON');
    const [folders, setFolders] = useState([]);

    const [downloadUrl, setDownloadUrl] = useState('');

    const [editorFormat, setEditorFormat] = useState('Sublime');

    const menu = (
        <Menu 
        // onClick={handleMenuClick}
        >
          <Menu.Item key="1" 
        //   icon={<UserOutlined />}
          >
            1st menu item
          </Menu.Item>
          <Menu.Item key="2" >
            2nd menu item
          </Menu.Item>
          <Menu.Item key="3" >
            3rd menu item
          </Menu.Item>
        </Menu>
      );

      const downloadOptions = () => (
        <Menu 
        // onClick={handleMenuClick}
        >
          <Menu.Item key="1" 
        //   icon={<UserOutlined />}
          >
            <a href={downloadUrl} id="downloadThis" download>Download PNG</a>
          </Menu.Item>
          
        </Menu>
      )

      const stringToObject = (event ) => {
        let textInput = event.target.value;
        console.log(textInput);
        let inputString = JSON.parse(textInput);
        console.log('the parsed value ', inputString);
        setFolders(inputString);
      
      }

      const prepareDownload = () => {
        htmlCanvas(document.querySelector("#capture")).then(canvas => {
     
          let canvasUrl = canvas.toDataURL('image/png');
          setDownloadUrl(canvasUrl);

          let a = document.getElementById('downloadThis');
          a.click();
        });
      }
      
    return (
        <>
        <Row gutter={24} justify="center" >
          <Col style={{marginTop: '10%'}}>
          <h1>Easily create and share images of your folder
             structure using your favourite Editor them</h1>
          </Col>
       
        </Row>
        
        <Row gutter={24}>
          <Col xs={0} sm={0} md={4} lg={4}></Col>
            <Col xs={24} sm={24} md={8} lg={8} style={{backgroundColor: '#DEDEDE', padding: '20px'}}>

            <Row>
            <Col span={24}>
            <Dropdown.Button 
            // onClick={handleButtonClick} 
            trigger="click"
            overlay={menu}>
      {inputFormat}
    </Dropdown.Button>
   
            </Col>
                </Row>    

                <TextArea allowClear
                 onChange={stringToObject} 
                style={{width: "100", height: defaultFieldHeight}}>
                    </TextArea>        
            </Col>


{/* THE RIGHT HAND SIDE */}

<Col xs={0} sm={0} md={1} lg={1}></Col>
<Col xs={24} sm={24} md={8} lg={8} style={{backgroundColor: '#DEDEDE', padding: '20px'}}>
                <Row>
                <Dropdown.Button 
            // onClick={prepareDownload} 
            trigger="click"
            overlay={menu}>
      {editorFormat}
    </Dropdown.Button>

    &nbsp; &nbsp; &nbsp;

<Button>Tweet</Button>

&nbsp; &nbsp; &nbsp;

<Button 
            onClick={prepareDownload} 
            trigger="click"
            >
      Download
    </Button>

    <a href={downloadUrl} id="downloadThis" download hidden>Download this</a>

                </Row>
                <Row>
                <Col span={24} style={{backgroundColor: "#EDEDED"}}>
                <div id="capture">
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
        <img src={FolderIcon} style={{width: '20px', height: '10px'}}/> {fold.name}
        <br />
        
        </>
       )
     }
           
     )}
                </div>
                </Col>
                </Row>
            </Col>
        </Row>
        </>
    )
}
