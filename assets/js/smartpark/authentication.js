//  listen for auth changes
auth.onAuthStateChanged(user => {
    if (user){
        if (window.location.pathname == "/smartpark/login.html"){
            window.location.href = ('./dashboard.html');
        }
    }
    else{
        console.log(window.location.pathname);

        if (window.location.pathname == "/smartpark/dashboard.html" || window.location.pathname == "/smartpark/manageparking.html" || window.location.pathname == "/smartpark/users.html" || window.location.pathname == "/smartpark/reservations.html" || window.location.pathname == "/smartpark/vehicles.html"){
            window.location.href = ('./login.html');
        }
    }
});

const logout = document.querySelector('#signOut');
if (logout != null){
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            window.location.href = ('./login.html');
        }).catch((error) =>{
            console.log(error);
        });
    });
}

const loginForm = document.querySelector("#formLogin");
if(loginForm != null){
    
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        //get user info
        const email = loginForm["txtEmail"].value;
        const password = loginForm["txtPassword"].value;

        userDocument = db.collection("user").where("userEmail", "==", email).where("userRole", "==", "admin").get().then(snapshot => {
            if (!snapshot.empty){
                auth.signInWithEmailAndPassword(email, password).then(cred => {
                    console.log("Logged in");
                    window.location.href = ('./dashboard.html');
                });
            }
            else{
                alert("You are not an admin!");
            }
        }).catch(err => {
            console.log("Error getting document", err);
        });
    });
}

async function getAdminName(){
    auth.onAuthStateChanged(async function(user){
        if (user){
            await db.collection("user").doc(user.uid).get().then(function(documentSnapshot){
                document.getElementById("adminName").innerHTML = documentSnapshot.data().userName;
            });
        }
    });
}

try{
    getAdminName();
}
catch(err){
    console.log("Error getting document", err);
}

const forgotPasswordForm = document.querySelector("#formForgotPassword");
if(forgotPasswordForm != null){
    
    forgotPasswordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        //get user info
        const email = forgotPasswordForm["txtEmail"].value;
        
        db.collection("user").where("userEmail", "==", email).get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                if (doc.data().userRole != "admin"){
                    alert("You are not an admin!");
                }
                else{
                    auth.sendPasswordResetEmail(email);
                    alert("Please check your inbox!");
                }
            });
        });
    });
}