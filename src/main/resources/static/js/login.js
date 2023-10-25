function getTokenLogin(){
    let user = $("#loginName").val();
    let password = $("#loginPassword").val();
    console.log(user, password);
    if (user==='' || password==='') {
        return;
    }
    data = {
            username: user,
            password: password
    }
    $.ajax({
        url: "http://localhost:8080/api/auth/login", 
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(output, status, xhr) { 
            const token= xhr.getResponseHeader("Authorization")
            localStorage.setItem("jwtLlave", token) 
        },
          error: function(output) {
            console.log("Error al aunteticar usuario");
        }
    })
}


