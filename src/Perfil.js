import withRoot from "./modules/withRoot";
import React from "react";
import FileUpload from "./modules/components/FileUpload"


function Perfil({ setAuthentication }) {
  return (
    <div>
      <FileUpload/>  
    </div>
    
  );
}

export default withRoot(Perfil);
