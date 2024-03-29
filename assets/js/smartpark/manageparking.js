$(document).ready(async function getParkingLots(){
    var select = document.getElementById("drpParkingLot");
    await db.collection("parkingLot").get().then(snapshot =>{
        snapshot.forEach(doc =>{
            var option = document.createElement("option");
            option.text=doc.id;
            option.value=doc.id;
            select.add(option)
        });
    });
});

$("select").change(async function getFees(){
    var parkingLot = $(this).children("option:selected").val();
    await db.collection("parkingLot").doc(parkingLot).get().then(doc =>{
        $("#txtNormal").val(doc.data().parkingLotNormalRate);
        $("#txtLate").val(doc.data().parkingLotLateFee);
        $("#txtPenalty").val(doc.data().parkingLotPenaltyFee);
        $("#txtCancellation").val(doc.data().parkingLotCancellationFee);
        $("#txtExpiration").val(doc.data().parkingLotExpirationFee);
    });
});

$("#formPrice").submit(async function updateRates(e){
    e.preventDefault();
    var parkingLot = $("select").children("option:selected").val();
    if (parkingLot == "Choose a Parking Lot"){
        alert("Please choose a parking lot");
    }
    else{
        await db.collection("parkingLot").doc(parkingLot).get().then(async function(doc){
            if (doc.data().reserve == true){
                if (parseInt($("#txtNormal").val()) > 0 && parseInt($("#txtLate").val()) > 0 && parseInt($("#txtPenalty").val()) > 0 && parseInt($("#txtCancellation").val()) > 0 && parseInt($("#txtExpiration").val()) > 0 ){
                    await db.collection("parkingLot").doc(parkingLot).set({
                        parkingLotNormalRate: parseInt($("#txtNormal").val()),
                        parkingLotLateFee: parseInt($("#txtLate").val()),
                        parkingLotPenaltyFee: parseInt($("#txtPenalty").val()),
                        parkingLotCancellationFee: parseInt($("#txtCancellation").val()),
                        parkingLotExpirationFee: parseInt($("#txtExpiration").val())
                    },
                    {
                        merge: true
                    }).then(f =>{
                        location.reload(true);
                    }).catch(err => {
                        console.log(err)
                    });
                }
                else{
                    alert("Please do not leave any field blank!")
                }
            }
            else{
                await db.collection("parkingLot").doc(parkingLot).set({
                    parkingLotNormalRate: parseInt($("#txtNormal").val()),
                    parkingLotLateFee: parseInt($("#txtLate").val()),
                    parkingLotPenaltyFee: parseInt($("#txtPenalty").val()),
                },
                {
                    merge: true
                }).then(f =>{
                    location.reload(true);
                }).catch(err => {
                    console.log(err)
                });
            }
        });
    }
});
// $(function(){
//     $("#formNormalA").submit(async function(e){
//         e.preventDefault();
//         var normalFee = parseInt($("#txtNormalFeeA").val());
//         if (normalFee > 0){
//             await db.collection("parkingLot").doc("A").get().then(async function(doc){
//                 var parkingLotID = doc.id;
                
//                 await db.collection("parkingLot").doc(parkingLotID).set({
//                     parkingLotNormalRate: normalFee
//                 },
//                 {
//                     merge: true
//                 }).then(f =>{
//                     location.reload(true);
//                 }).catch(err => {
//                     console.log(err)
//                 });
//             });
//         }
//         else{
//             alert("Could not update rate!");
//         }
//     });
// });

// $(function(){
//     $("#formOvertimeA").submit(async function(e){
//         e.preventDefault();
//         var overtimeFee = parseInt($("#txtOvertimeFeeA").val());
//         if (overtimeFee > 0){
//             await db.collection("parkingLot").doc("A").get().then(async function(doc){
//                 var parkingLotID = doc.id;

//                 await db.collection("parkingLot").doc(parkingLotID).set({
//                     parkingLotLateFee: overtimeFee
//                 },
//                 {
//                     merge: true
//                 }).then(f =>{
//                     location.reload(true);
//                 }).catch(err =>{
//                     console.log(err);
//                 });
               
//             });
//         }
//         else{
//             alert("Could not update rate!");
//         }
//     });
// });

// $(function(){
//     $("#formExpirationA").submit(async function(e){
//         e.preventDefault();
//         var expirationFee = parseInt($("#txtExpirationFeeA").val());
//         if (expirationFee > 0){
//             await db.collection("parkingLot").doc("A").get().then(async function(doc){
//                 var parkingLotID = doc.id;
//                 await db.collection("parkingLot").doc(parkingLotID).set({
//                     parkingLotExpirationFee: expirationFee
//                 },
//                 {
//                     merge:true
//                 }).then(f => {
//                     location.reload(true);
//                 }).catch(err => {
//                     console.log(err);
//                 });
//             });
//         }
//         else{
//             alert("Could not update rate!");
//         }
//     });
// }); 

// $(function(){
//     $("#formCancellationA").submit(async function(e){
//         e.preventDefault();
//         var expirationFee = parseInt($("#txtCancellationFeeA").val());
//         if (expirationFee > 0){
//             await db.collection("parkingLot").doc("A").get().then(async function(doc){
//                 var parkingLotID = doc.id;
//                 await db.collection("parkingLot").doc(parkingLotID).set({
//                     parkingLotCancellationFee: expirationFee
//                 },
//                 {
//                     merge:true
//                 }).then(f => {
//                     location.reload(true);
//                 }).catch(err => {
//                     console.log(err);
//                 });
//             });
//         }
//         else{
//             alert("Could not update rate!");
//         }
//     });
// }); 

// $(function(){
//     $("#formNormalB").submit(async function(e){
//         e.preventDefault();
//         var normalFee = parseInt($("#txtNormalFeeB").val());
//         if (normalFee > 0){
//             await db.collection("parkingLot").doc("B").get().then(async function(doc){
//                 var parkingLotID = doc.id;
                
//                 await db.collection("parkingLot").doc(parkingLotID).set({
//                     parkingLotNormalRate: normalFee
//                 },
//                 {
//                     merge: true
//                 }).then(f =>{
//                     location.reload(true);
//                 }).catch(err => {
//                     console.log(err)
//                 });
//             });
//         }
//         else{
//             alert("Could not update rate!");
//         }
//     });
// });

// $(function(){
//     $("#formOvertimeB").submit(async function(e){
//         e.preventDefault();
//         var overtimeFee = parseInt($("#txtOvertimeFeeB").val());
//         if (overtimeFee > 0){
//             await db.collection("parkingLot").doc("B").get().then(async function(doc){
//                 var parkingLotID = doc.id;

//                 await db.collection("parkingLot").doc(parkingLotID).set({
//                     parkingLotLateFee: overtimeFee
//                 },
//                 {
//                     merge: true
//                 }).then(f =>{
//                     location.reload(true);
//                 }).catch(err =>{
//                     console.log(err);
//                 });
//             });
//         }
//         else{
//             alert("Could not update rate!");
//         }
//     });
// });