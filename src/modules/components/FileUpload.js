import React, {Component} from 'react';
import firebase from 'firebase';
import AppForm from "../../modules/views/AppForm";
import Typography from "../../modules/components/Typography";
// import { updatePhoto } from "././services/firebase";
//import { Component } from 'react';

class FileUpload extends Component{
    constructor () {
        super();
            this.state = {
                UploadValue: 0,
                picture: null
            };
           
           
            this.handleUpload =this.handleUpload.bind(this);
       
    }
   
    handleUpload(event)
    {
      
      const user = firebase.auth().currentUser;
      const idUsuario = user.email;
      const db = firebase.firestore();
      const userActual =  db.collection("Usuarios").doc(idUsuario);
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref(`/usuarios/${idUsuario}/fotos/profilePhoto.jpg`);
      const task = storageRef.put(file);

      task.on('state_changed' , snapshot =>{
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          uploadValue : percentage
        })
      } , error =>{
        console.log(error.message);
      } , () =>{
           storageRef.getDownloadURL().then(url => {
                    this.setState({ picture: url });
                    userActual.update({
                      photoURL: url
                    });
                });

               

      });
    }

    render(){
        return(
            <div>
               <AppForm>
                
               <Typography variant="h4" gutterBottom marked="center" align="center">
                Perfil
               </Typography>
                <progress value ={this.state.UploadValue} max="100"> </progress>
                <br/>
                <input type ="file" onChange={this.handleUpload}/>
                <br/>
                <img with="100" src={this.state.picture} alt ="100"/>
                </AppForm>
            </div>
        )
    }
}

export default FileUpload;