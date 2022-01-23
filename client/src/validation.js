
const validation = (values) =>{

    let errors={};

    if(!values.firstname){
        errors.firstname="First Name is required.";
    }
    if(!values.lastname){
        errors.lastname="Last Name is required.";
    }
    if(!values.mobile){
        errors.mobile="Mobile is required.";
    }else if(values.mobile.length < 9 || values.mobile.length > 10){
        errors.mobile = "Mobile number is invalid.";

    }


    if(!values.address){
        errors.address="Address is required.";
    }
    if(!values.email){
        errors.email="Email is required";
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is invalid.";
    }
    if(!values.password){
        errors.password = "Password is required.";
    }else if(values.password.length < 5){
        errors.password = "Password must be more then five characters.";

    }
    return errors;
}

export default validation;