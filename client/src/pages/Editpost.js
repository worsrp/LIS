import React,{useEffect, useState, useContext} from "react";
import Axios from 'axios'
import { Link, Route } from 'react-router-dom';
import { AuthContext } from "../Auth";


const Editpost = () =>{
    const [editPost, seteditPost] = useState([]);
    const [Name,setName] = useState('')
    const [Location,setLocation] = useState('')
    const [Description,setDescription] = useState('')
    const [Status,setStatus] = useState('')
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
       })
    const { currentUser } = useContext(AuthContext);
 
    const handleInputChange = (event) => {
        setuserInfo({
            ...userInfo,
            file:event.target.files[0],
            filepreview:URL.createObjectURL(event.target.files[0]),
        });
    }

    let urlString = window.location.href; 
    let post_id;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
            post_id = pair[0];
        }
    parseInt(post_id);

    useEffect (() => {
        Axios.get(`http://localhost:8000/editpost/${post_id}`).then((response) => {
            seteditPost(response.data);
        });
    }, []);
            
    const savePost = () => {
        var edittoday = new Date();
        var dd = String(edittoday.getDate()).padStart(2, '0');
        var mm = String(edittoday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = edittoday.getFullYear();
        edittoday = yyyy + '-' + mm + '-' + dd;
        console.log(edittoday);

        const formdata = new FormData(); 
        formdata.append('avatar', userInfo.file);

        Axios.post(`http://localhost:8000/editpost/${post_id}`,formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
        })

        Axios.post(`http://localhost:8000/editpost/${post_id}`, { 
            post_name: Name,   
            edit_date: edittoday,  
            location: Location,  
            description: Description,
            post_status: Status,
            image: formdata,
        }).then(() => {
        alert("successful Edit");
        })
    };

    return (
        <div className="myPost">
            <h2>Edit Post</h2>
            <div>
                {editPost.map((val)=> {
                    return (
                        <div className="myPostCard">
                            <form>
                                <label>Post Name : </label>
                                <input type="text" name="post_name" placeholder = {val.post_name} onChange={(e)=>{ setName(e.target.value) }} required /><br></br>

                                <label className="text-white">Select Image :</label>
                                <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
            
                                <label>Location : </label>
                                <select name="location" placeholder = {val.location} onChange={(e)=>{ setLocation(e.target.value) }}>
                                <option value="Bangkok">Bangkok</option>
                                <option value="Krabi">Krabi</option>
                                <option value="Kanchanaburi">Kanchanaburi</option>
                                <option value="Kalasin">Kalasin</option>
                                <option value="Kamphaeng Phet">Kamphaeng Phet</option>
                                <option value="Khon Kaen">Khon Kaen</option>
                                <option value="Chanthaburi">Chanthaburi</option>
                                <option value="Chachoengsao">Chachoengsao</option>
                                <option value="Chonburi">Chonburi</option>
                                <option value="Chainat">Chainat</option>
                                <option value="Chaiyaphum">Chaiyaphum</option>
                                <option value="Chumphon">Chumphon</option>
                                <option value="Chiang Rai">Chiang Rai</option>
                                <option value="Chiang Mai">Chiang Mai</option>
                                <option value="Trang">Trang</option>
                                <option value="Trat">Trat</option>
                                <option value="Tak">Tak</option>
                                <option value="Nakhon Nayok">Nakhon Nayok</option>
                                <option value="Nakhon Pathom">Nakhon Pathom</option>
                                <option value="Nakhon Phanom">Nakhon Phanom</option>
                                <option value="Nakhon Ratchasima">Nakhon Ratchasima</option>
                                <option value="Nakhon Si Thammarat">Nakhon Si Thammarat</option>
                                <option value="Nakhon Sawan">Nakhon Sawan</option>
                                <option value="Nonthaburi">Nonthaburi</option>
                                <option value="Narathiwat">Narathiwat</option>
                                <option value="Nan">Nan</option>
                                <option value="Bueng Kan">Bueng Kan</option>
                                <option value="Buriram">Buriram</option>
                                <option value="Pathum Thani">Pathum Thani</option>
                                <option value="Prachuap Khiri Khan">Prachuap Khiri Khan</option>
                                <option value="Prachinburi">Prachinburi</option>
                                <option value="Pattani">Pattani</option>
                                <option value="Phra Nakhon Si Ayutthaya">Phra Nakhon Si Ayutthaya</option>
                                <option value="Phayao">Phayao</option>
                                <option value="Phang Nga">Phang Nga</option>
                                <option value="Phatthalung">Phatthalung</option>
                                <option value="Phichit">Phichit</option>
                                <option value="Phitsanulok">Phitsanulok</option>
                                <option value="Phetchaburi">Phetchaburi</option>
                                <option value="Phetchabun">Phetchabun</option>
                                <option value="Phrae">Phrae</option>
                                <option value="Phuket">Phuket</option>
                                <option value="Maha Sarakham">Maha Sarakham</option>
                                <option value="Mukdahan">Mukdahan</option>
                                <option value="Mae Hong Son">Mae Hong Son</option>
                                <option value="Yasothon">Yasothon</option>
                                <option value="Yala">Yala</option>
                                <option value="Roi Et">Roi Et</option>
                                <option value="Ranong">Ranong</option>
                                <option value="Rayong">Rayong</option>
                                <option value="Ratchaburi">Ratchaburi</option>
                                <option value="Lopburi">Lopburi</option>
                                <option value="Lampang">Lampang</option>
                                <option value="Lamphun">Lamphun</option>
                                <option value="Loei">Loei</option>
                                <option value="Sisaket">Sisaket</option>
                                <option value="Sakon Nakhon">Sakon Nakhon</option>
                                <option value="Songkhla">Songkhla</option>
                                <option value="Satun">Satun</option>
                                <option value="Samut Prakan">Samut Prakan</option>
                                <option value="Samut Songkhram">Samut Songkhram</option>
                                <option value="Samut Sakhon">Samut Sakhon</option>
                                <option value="Sa Kaeo">Sa Kaeo</option>
                                <option value="Saraburi">Saraburi</option>
                                <option value="Sing Buri">Sing Buri</option>
                                <option value="Sukhothai">Sukhothai</option>
                                <option value="Suphan Buri">Suphan Buri</option>
                                <option value="Surat Thani">Surat Thani</option>
                                <option value="Surin">Surin</option>
                                <option value="Nong Khai">Nong Khai</option> 
                                <option value="Nong Bua Lamphu">Nong Bua Lamphu</option>
                                <option value="Ang Thong">Ang Thong</option>
                                <option value="Amnat Charoen">Amnat Charoen</option>
                                <option value="Udon Thani">Udon Thani</option>
                                <option value="Uttaradit">Uttaradit</option>
                                <option value="Uthai Thani">Uthai Thani</option>
                                <option value="Ubon Ratchathani">Ubon Ratchathani</option>
                                </select><br></br>

                                <label>Description : </label>
                                <input type="text" name="Description" placeholder = {val.description} onChange={(e)=>{ setDescription(e.target.value) }} required /><br></br>

                                <label>Post Status : </label>
                                <input type="text" name="post_status" placeholder = {val.post_status} onChange={(e)=>{ setStatus(e.target.value) }}required /><br></br>
                            </form>

                            <button onClick={() => {savePost(val.post_id)}}> Edit </button>
                            <button > <Link  to="/mypost">Cancel</Link> </button>
                            
                            {userInfo.filepreview !== null ? 
                            <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
                            : null}
                        </div>
                        
                    ); 
                })}
            </div>
        </div>
    );
};

export default Editpost;