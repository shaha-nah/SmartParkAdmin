$(document).ready(async function getUserEmails(){
    var select = document.getElementById("drpEmail");
    await db.collection("user").where("userRole", "==", "normal").where("markAsDeleted", "==", false).get().then(snapshot =>{
        snapshot.forEach(doc =>{
            var option = document.createElement("option");
            option.text=doc.data().userEmail;
            option.value=doc.id;
            select.add(option)
        });
    });
});

$("#formRecharge").submit(async function recharge(e){
    e.preventDefault();
    
    var user = $("select").children("option:selected").val();
    var amount = parseInt($("#txtAmount").val());
    if (user == "Pick an email" || amount == 0){
        alert("Please do not leave any blank fields");
    }
    else{
        await db.collection("user").doc(user).get().then(async function(document){
            var credit = document.data().userCredit;
            console.log(amount);
            console.log(credit)
            await db.collection("user").doc(user).set({
                userCredit: credit + amount
            },
            {
                merge:true
            }).then(f =>{
                alert('Recharge successful!') ? "" : "";
            }).catch(err =>{
                alert("Could not recharge account!")
            });
        });
    }
});
