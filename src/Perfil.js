import withRoot from "./modules/withRoot";
import React from "react";
import FileUpload from "./modules/components/FileUpload"


function Perfil({ setAuthentication }) {
  return (
    <div>
      <FileUpload route={`/usuarios/${1+1}/fotos/profilePhoto.jpg"`}/>  
    </div>
    
  );
}

export default withRoot(Perfil);
