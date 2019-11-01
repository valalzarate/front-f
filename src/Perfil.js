import withRoot from "./modules/withRoot";
import React, {Components} from "react";
import FileUpload from "./modules/components/FileUpload"


function Perfil({ setAuthentication }) {
  return (
    <div>
      Montar Foto
      <FileUpload/>  
    </div>
    
  );
}

export default withRoot(Perfil);
