async function getAllReservation() {
    var table = $("#example");
    await db.collection("reservation").get().then(snapshot => {
        snapshot.forEach(async function (documentReservation) {
            var userID = documentReservation.data().userID;
            await db.collection("user").doc(userID).get().then(function(snapshotUser){
                var date = documentReservation.data().reservationDate.toDate().toDateString();
                // console.log(date2);
                table.row.add(
                    [
                        snapshotUser.data().userName,
                        snapshotUser.data().userEmail,
                        snapshotUser.data().userPhoneNumber,
                        documentReservation.data().vehicleID,
                        documentReservation.data().reservationDate.toDate().toDateString(),
                        documentReservation.data().reservationStartTime.toDate().toLocaleTimeString(),
                        documentReservation.data().reservationEndTime.toDate().toLocaleTimeString()
                    ]
                ).draw(false);
            });
        });
        var table = $('#example').DataTable({
            paging: true,
            searching: true,
            columns: [
                {title: "Name"}, 
                {title: "Email"}, 
                {title: "Phone Number"},
                {title: "Vehicle"},
                {title: "Date"},
                {title: "Start Time"},
                {title: "End Time"}
            ],
            buttons: ['copy', 'excel', 'pdf', 'print', 'colvis'],
            lengthChange: false
        });
        table.buttons().container()
            .appendTo('#example_wrapper .col-md-6:eq(0)');
    });
}
try {
    getAllReservation();
}
catch (err) {
    console.log("Error getting document", err);
}