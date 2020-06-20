


function giveres(){
    if (document.forms["Addform"]["name"].value==""){
        alert("Please Enter Valid Name");
        return false;
    }
    if (document.forms["Addform"]["eye_color"].value==""){
        document.forms["Addform"]["eye_color"].value="   ";
    }
    if (document.forms["Addform"]["hair_color"].value==""){
        document.forms["Addform"]["hair_color"].value="   ";
    }
    if (document.forms["Addform"]["type"].value==""){
        document.forms["Addform"]["type"].value="   ";
    }
    
  

}


function giveresdel(){
    if (document.forms["Deleteform"]["name"].value==""){
        alert("Please Enter Valid Name");
        return false;
    }
}


function giveresupd(){
    if (document.forms["Updateform"]["name"].value==""){
        alert("Please Enter Valid Name");
        return false;
    }
    if (document.forms["Updateform"]["type"].value==""){
        document.forms["Updateform"]["type"].value="   ";
    }
    if (document.forms["Updateform"]["hair_color"].value==""){
        document.forms["Updateform"]["hair_color"].value="   ";
    }
    if (document.forms["Updateform"]["eye_color"].value==""){
        document.forms["Updateform"]["eye_color"].value="   ";
    }
}