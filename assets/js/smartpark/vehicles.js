async function getAllVehicles(){
    await db.collection("vehicle").get().then(snapshot => {
        snapshot.forEach(async function(doc){
            var userID = doc.data().userID;
            var plateNumber = doc.data().vehiclePlateNumber.toString();
            await db.collection("user").doc(userID).get().then(function(snapshotUser){
                table.row.add(
                    [
                        plateNumber,
                        snapshotUser.data().userName,
                        snapshotUser.data().userEmail,
                        snapshotUser.data().userPhoneNumber
                    ]
                ).draw(false);
            });
        });
        var table = $("#example").DataTable({
            paging: true,
            searching: true,
            columns: [
                { title: "Vehicle Plate Number"},
                { title: "Name"},
                { title: "Email"},
                { title: "Phone Number"}
            ],
            buttons: ['copy', 'excel', 'pdf', 'print', 'colvis'],
            lengthChange: false
        });
        table.buttons().container()
            .appendTo('#example_wrapper .col-md-6:eq(0)');
    });
}

try{
    getAllVehicles();
}
catch(err){
    console.log("Error getting documents", err);
}