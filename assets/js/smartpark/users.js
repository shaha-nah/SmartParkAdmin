async function getAllUsers(){
    var table = $("#example");
    await db.collection("user").where("userRole", "==", "normal").get().then(snapshot => {
        snapshot.forEach(async function(doc){
            var userID = doc.id;
            var countVehicle = 0;
            var countReservation = 0;

            await db.collection("vehicle").where("userID", "==", userID).get().then(function(snapshotVehicle){
                snapshotVehicle.forEach(function(v){
                    countVehicle++;
                });
            });
            await db.collection("reservation").where("userID", "==", userID).get().then(function(snapshotReservation){
                snapshotReservation.forEach(function(r){
                    countReservation++;
                });
            });
            table.row.add(
                [
                    doc.data().userName,
                    doc.data().userEmail,
                    // doc.data().userPhoneNumber,
                    countVehicle,
                    countReservation
                ]
            ).draw(false);
            console.log(doc.data().userName);
            console.log(doc.data().userEmail);
            console.log(doc.data().userPhoneNumber);
            console.log(countVehicle);
            console.log(countReservation);

        });
        var table = $("#example").DataTable({
            paging: true,
            searching: true,
            columns: [
                {title: "Name"},
                {title: "Email"},
                // {title: "Phone Number"},
                {title: "Vehicles Owned"},
                {title: "Reservations Made"}
            ],
            buttons: ['copy', 'excel', 'pdf', 'print', 'colvis'],
            lengthChange: false
        });
        table.buttons().container()
            .appendTo('#example_wrapper .col-md-6:eq(0)');
    });
}

try{
    getAllUsers();
}
catch (err){
    console.log("Error getting document", err);
}