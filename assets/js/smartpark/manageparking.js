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
            if (doc.data().reserve == true){
                document.getElementById("normalFeeA").innerHTML = "Rs " + doc.data().parkingLotNormalRate.toString();
                document.getElementById("overtimeFeeA").innerHTML = "Rs " + doc.data().parkingLotLateFee.toString();
                document.getElementById("expirationFeeA").innerHTML = "Rs " + doc.data().parkingLotExpirationFee.toString();
                document.getElementById("cancellationFeeA").innerHTML = "Rs " + doc.data().parkingLotCancellationFee.toString();
            }
            else{
                document.getElementById("normalFeeB").innerHTML = "Rs " + doc.data().parkingLotNormalRate.toString();
                document.getElementById("overtimeFeeB").innerHTML = "Rs " + doc.data().parkingLotLateFee.toString();
            }
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
    $("#formNormalA").submit(async function(e){
        e.preventDefault();
        var normalFee = parseInt($("#txtNormalFeeA").val());
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
    $("#formOvertimeA").submit(async function(e){
        e.preventDefault();
        var overtimeFee = parseInt($("#txtOvertimeFeeA").val());
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
    $("#formExpirationA").submit(async function(e){
        e.preventDefault();
        var expirationFee = parseInt($("#txtExpirationFeeA").val());
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
    $("#formCancellationA").submit(async function(e){
        e.preventDefault();
        var expirationFee = parseInt($("#txtCancellationFeeA").val());
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


// async function getParkingLots(){
//     var table = $("#example");

//     await db.collection("parkingLot").get().then(snapshot =>{
//         snapshot.forEach(async function(parkingLot){
//             var parkingLotID = parkingLot.id;

//             var numSlots = 0;
//             await db.collection("parkingSlot").where("parkingLotID", "==", parkingLotID).get().then(function(parkingSlot){
//                 parkingSlot.forEach(function(doc){
//                     numSlots++;
//                 });
//             });
//             if (parkingLot.data().reserve == true){
//                 table.row.add(
//                     [
//                         parkingLot.id,
//                         numSlots,
//                         parkingLot.data().parkingLotNormalRate,
//                         parkingLot.data().parkingLotLateFee,
//                         parkingLot.data().parkingLotCancellationFee,
//                         parkingLot.data().parkingLotExpirationFee
//                     ]
//                 ).draw(false);
//             }
//             else{
//                 table.row.add(
//                     [
//                         parkingLot.id,
//                         numSlots,
//                         parkingLot.data().parkingLotNormalRate,
//                         parkingLot.data().parkingLotLateFee,
//                         "",
//                         ""
//                     ]
//                 ).draw(false);
//             }
//         });

//         var table = $('#example').DataTable({
//             paging: true,
//             searching: true,
//             columns: [
//                 {title: "Parking Lot"}, 
//                 {title: "Number of Slots"}, 
//                 {title: "Normal Fee"},
//                 {title: "Late Fee"},
//                 {title: "Cancellation Fee"},
//                 {title: "Expiration Fee"},
//             ],
//             buttons: ['copy', 'excel', 'pdf', 'print', 'colvis'],
//             lengthChange: false
//         });
//         table.buttons().container()
//             .appendTo('#example_wrapper .col-md-6:eq(0)');
//     });
// }

// try{
//     getParkingLots();
// }
// catch(err){
//     console.log("Erorr getting document: ", err);
// }