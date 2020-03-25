//get parking lot ID
async function getParkingLotID(){
    var parkingLotID;
    await db.collection("parkingLot").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            parkingLotID = doc.id;
        })
    });
    return parkingLotID;
}

async function getFees(){
    await db.collection("parkingLot").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            document.getElementById("normalFee").innerHTML = "Rs " + doc.data().parkingLotNormalRate.toString();
            document.getElementById("overtimeFee").innerHTML = "Rs " + doc.data().parkingLotLateFee.toString();
            document.getElementById("expirationFee").innerHTML = "Rs " + doc.data().parkingLotExpirationFee.toString();
            document.getElementById("cancellationFee").innerHTML = "Rs " + doc.data().parkingLotCancellationFee.toString();
        })
    });
}

try{
    getFees();
}
catch(err){
    console.log("Error gettting document", err);
}

$(function(){
    $("#formNormal").submit(async function(e){
        e.preventDefault();
        var normalFee = parseInt($("#txtNormalFee").val());
        await db.collection("parkingLot").get().then(function(querySnapshot){
            querySnapshot.forEach(async function(doc){
                var parkingLotID = doc.id;
                
                await db.collection("parkingLot").doc(parkingLotID).set({
                    parkingLotNormalRate: normalFee
                },
                {
                    merge: true
                }).then(f =>{
                    location.reload(true);
                }).catch(err => {
                    console.log(err)
                });
            });
        });
        
    });
});

$(function(){
    $("#formOvertime").submit(async function(e){
        e.preventDefault();
        var overtimeFee = parseInt($("#txtOvertimeFee").val());
        await db.collection("parkingLot").get().then(function(querySnapshot){
            querySnapshot.forEach(async function(doc){
                var parkingLotID = doc.id;

                await db.collection("parkingLot").doc(parkingLotID).set({
                    parkingLotLateFee: overtimeFee
                },
                {
                    merge: true
                }).then(f =>{
                    location.reload(true);
                }).catch(err =>{
                    console.log(err);
                });
            });
        });
    });
});

$(function(){
    $("#formExpiration").submit(async function(e){
        e.preventDefault();
        var expirationFee = parseInt($("#txtExpirationFee").val());
        await db.collection("parkingLot").get().then(function(querySnapshot){
            querySnapshot.forEach(async function(doc){
                var parkingLotID = doc.id;
                await db.collection("parkingLot").doc(parkingLotID).set({
                    parkingLotExpirationFee: expirationFee
                },
                {
                    merge:true
                }).then(f => {
                    location.reload(true);
                }).catch(err => {
                    console.log(err);
                });
            });
        });
    });
}); 

$(function(){
    $("#formCancellation").submit(async function(e){
        e.preventDefault();
        var expirationFee = parseInt($("#txtCancellationFee").val());
        await db.collection("parkingLot").get().then(function(querySnapshot){
            querySnapshot.forEach(async function(doc){
                var parkingLotID = doc.id;
                await db.collection("parkingLot").doc(parkingLotID).set({
                    parkingLotCancellationFee: expirationFee
                },
                {
                    merge:true
                }).then(f => {
                    location.reload(true);
                }).catch(err => {
                    console.log(err);
                });
            });
        });
    });
}); 