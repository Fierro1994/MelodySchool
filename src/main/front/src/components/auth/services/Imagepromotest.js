
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Imagepromotest() {
  const auth = useSelector((state) => state.auth);
  // для хранения загруженного файла
  const [file, setFile] = useState('');
  
  // для хранения ответа от бекенда
  const [data, getFile] = useState({ name: "", path: "" });
  const [allData, getAllFile] = useState([]);

  const [progress, setProgess] = useState(0); // progessbar
  const el = useRef(); // для доступа к инпуту

  const handleChange = (e) => {
    setProgess(0)
    const file = e.target.files[0]; // доступ к файлу
    console.log(file);
    setFile(file); // сохранение файла
  }

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('userId', auth._id); 
    formData.append('file', file);
   
    axios.post('http://localhost:3000/imagepromo', formData, 
  {  headers: {
            'Content-Type': 'multipart/form-data'
          },},
    {
      
      onUploadProgress: (ProgressEvent) => {
        let progress = Math.round(
          ProgressEvent.loaded / ProgressEvent.total * 100
        ) + '%';
        setProgess(progress);
      }
    }).then(res => {
      getFile({
        name: res.data.name,
        key: res.data.key,
        path: 'http://localhost:3000/imagepromo/' + auth._id + "/" + res.data.key
      })
    }).catch(err => console.log(err))
  }

  const deleteFile = (key) => {
    key.preventDefault()
    axios.delete( 'http://localhost:3000/imagepromo/'  + auth._id + "/" + key.target.value
      ).then(res => {
        downloadAll()
      }).catch(err => console.log(err))
  }

  function result (el) {
            return  'http://localhost:3000/imagepromo/' + auth._id + "/" + el
  } 

  const downloadAll = () => { 
    axios.post('http://localhost:3000/imagepromo/listpromo', {
        userId: auth._id
    }).then(res => {
        getAllFile(res.data.body)
      }).catch(err => console.log(err))   
    }

  return (
    <div>
      <div className="file-upload">
        <input type="file" ref={el} onChange={handleChange} />
        <div className="progessBar" style={{ width: progress }}>
          {progress}
        </div>
        <button onClick={uploadFile} className="upbutton">
          Upload
        </button>
        <button onClick={downloadAll} className="upbutton">
          загрузить все
        </button>
        <hr />
        {/* {data.path && <img src={data.path} alt={data.name} />} */}
        <button onClick={deleteFile} className="upbutton">
          удалить
        </button>
       {allData && allData.map((element, l)=> ( <div key={l}><img src={result(element)}></img><button value={element} onClick={deleteFile}>удалить</button></div>)
       
       )}
      </div>
    </div>
  );
}

export default Imagepromotest;