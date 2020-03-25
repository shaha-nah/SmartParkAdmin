//  listen for auth changes
auth.onAuthStateChanged(user => {
    if (user){
        if (window.location.pathname == "/smartpark/login.html"){
            window.location.href = ('./dashboard.html');
        }
    }
    else{
        console.log(window.location.pathname);

        if (window.location.pathname == "/smartpark/dashboard.html" || window.location.pathname == "/smartpark/managepricerates.html" || window.location.pathname == "/smartpark/manageusers.html" || window.location.pathname == "/smartpark/reservations.html"){
        console.log("boo2");

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
            if (snapshot.empty){
                console.log("User does not exist");
                return;
            }
            else{
                auth.signInWithEmailAndPassword(email, password).then(cred => {
                    console.log("Logged in");
                    window.location.href = ('./dashboard.html');
                });
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