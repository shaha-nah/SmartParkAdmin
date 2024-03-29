//get total revenue
async function getTotalRevenue(){
    var totalRevenue = 0;
    await db.collection("reservation").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            if (doc.data().reservationFee > 0){
                totalRevenue = totalRevenue + parseInt(doc.data().reservationFee);
            }
        });
        document.getElementById("lblRevenue").innerHTML = "Rs " + totalRevenue;
    });
}
try{
    getTotalRevenue();
}
catch(err){
    console.log("Error getting document", err);
}

//get total reservations
async function getTotalReservation(){
    var totalReservation = 0;
    await db.collection("reservation").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            totalReservation++;
        });
    });
    document.getElementById("lblReservation").innerHTML = totalReservation;
}
try{
    getTotalReservation();
}
catch(err){
    console.log("Error getting document", err);
}

//get total users
async function getTotalUsers(){
    var totalUsers = 0;
    await db.collection("user").where("userRole", "==", "normal").where("markAsDeleted", "==", false).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            totalUsers = totalUsers + 1;
        });
    });
    document.getElementById("lblUser").innerHTML = totalUsers;
}
try{
    getTotalUsers();
}
catch(err){
    console.log("Error getting document", err);
}

$(async function obtainStatistics() {
    "use strict";
    var StatsLineOptions = {
        scales: {
            responsive: false,
            maintainAspectRatio: true,
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        },
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: 0
            }
        },
        stepsize: 100
    }
    if ($('#stat-line_1').length) {
        var lineChartCanvas = $("#stat-line_1").get(0).getContext("2d");
        var gradientStroke = lineChartCanvas.createLinearGradient(100, 60, 30, 0);
        gradientStroke.addColorStop(0, '#B721FF');
        gradientStroke.addColorStop(1, '#21D4FD');

        var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: {
                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13"],
                datasets: [{
                    label: 'Profit',
                    data: [7, 6, 9, 7, 8, 6, 8, 5, 7, 8, 6, 7, 7],
                    borderColor: gradientStroke,
                    borderWidth: 3,
                    fill: false
                }]
            },
            options: StatsLineOptions
        });
    }
    if ($('#stat-line_2').length) {
        var lineChartCanvas = $("#stat-line_2").get(0).getContext("2d");
        var gradientStroke = lineChartCanvas.createLinearGradient(100, 60, 30, 0);
        gradientStroke.addColorStop(0, '#08AEEA');
        gradientStroke.addColorStop(1, '#2AF598');
        var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: {
                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13"],
                datasets: [{
                    label: 'Profit',
                    data: [8, 6, 9, 7, 8, 6, 8, 8, 7, 8, 6, 7, 7],
                    borderColor: gradientStroke,
                    borderWidth: 3,
                    fill: false
                }]
            },
            options: StatsLineOptions
        });
    }
    if ($('#stat-line_3').length) {
        var lineChartCanvas = $("#stat-line_3").get(0).getContext("2d");
        var gradientStroke = lineChartCanvas.createLinearGradient(100, 60, 30, 0);
        gradientStroke.addColorStop(0, '#FEE140');
        gradientStroke.addColorStop(1, '#FA709A');
        var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: {
                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13"],
                datasets: [{
                    label: 'Profit',
                    data: [7, 6, 9, 7, 8, 6, 8, 5, 7, 8, 6, 7, 7],
                    borderColor: '#6d7cfc',
                    borderColor: gradientStroke,
                    borderWidth: 3,
                    fill: false
                }]
            },
            options: StatsLineOptions
        });
    }

    if ($("#followers-bar-chart").length) {
        var a = {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                scales: {
                    responsive: !0,
                    maintainAspectRatio: !0,
                    yAxes: [{
                        display: !0,
                        gridLines: {
                            color: "rgba(0, 0, 0, 0.03)",
                            drawBorder: !1
                        },
                        ticks: {
                            min: 20,
                            max: 80,
                            stepSize: 20,
                            fontColor: "#212529",
                            maxTicksLimit: 3,
                            callback: function (a, e, r) {
                                return a + " K"
                            },
                            padding: 10
                        }
                    }],
                    xAxes: [{
                        display: !1,
                        barPercentage: .3,
                        gridLines: {
                            display: !1,
                            drawBorder: !1
                        }
                    }]
                },
                legend: {
                    display: !1
                }
            },
            e = document.getElementById("followers-bar-chart");
        new Chart(e, {
            type: "bar",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thus", "Fri", "Sat"],
                datasets: [{
                    label: "Follower",
                    data: [62, 52, 73, 58, 63, 72],
                    backgroundColor: [chartColors[0], chartColors[0], chartColors[0], chartColors[0], chartColors[0], chartColors[0]],
                    borderColor: chartColors[0],
                    borderWidth: 0
                }]
            },
            options: a
        })
    }
    if ($("#radial-chart").length) {
        var countCar = 0;
        var countParkingLotSize = 0;

        await db.collection("reservation").where("reservationStatus", "==", 3).get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                countCar = countCar + 1;
            });
        });

        await db.collection("parkingSlot").get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                countParkingLotSize = countParkingLotSize +1;
            });
        });
     
        document.getElementById("lblCarCount").innerHTML = countCar

        var usage = parseInt((countCar/countParkingLotSize) * 100)
        a = {
            chart: {
                height: 230,
                type: "radialBar"
            },
            series: [usage],
            colors: ["#696ffb"],
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "70%",
                        background: "rgba(255,255,255,0.1)"
                    },
                    track: {
                        dropShadow: {
                            enabled: !0,
                            top: 2,
                            left: 0,
                            blur: 4,
                            opacity: .02
                        }
                    },
                    dataLabels: {
                        name: {
                            offsetY: -10,
                            color: "#adb5bd",
                            fontSize: "13px"
                        },
                        value: {
                            offsetY: 5,
                            color: "#000",
                            fontSize: "20px",
                            show: !0
                        }
                    }
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "vertical",
                    gradientToColors: ["#87D4F9"],
                    stops: [0, 100]
                }
            },
            stroke: {
                lineCap: "round"
            },
            labels: ["Current Usage"]
        };
        (r = new ApexCharts(document.querySelector("#radial-chart"), a)).render()
    }

    if ($("#chartjs-staked-line-chart").length) {
        var parkingSlots = new Array();
        var reservations = new Array();
        var currentDateA = new Date();
        var currentMonth = currentDateA.getMonth();
        await db.collection("parkingSlot").where("parkingLotID", "==", "A").get().then(function(querySnapshot){
            querySnapshot.forEach(async function(doc){
                parkingSlots.push(doc.id)
                //get reservations
                var count = 0;
                await db.collection("reservation").where("parkingSlotID", "==", doc.id).get().then(function(reservationSnapshot){
                    reservationSnapshot.forEach(function(doc){
                        var reservationDate = doc.data().reservationDate.toDate();
                        
                        if (reservationDate.getMonth() == currentMonth){
                            count = count + 1
                        }
                    });
                });
                reservations.push(count);
                var options = {
                    type: 'line',
                    data: {
                      labels: parkingSlots,
                      datasets: [{
                          label: 'Reservations',
                          data: reservations,
                          borderWidth: 2,
                          fill: false,
                          backgroundColor: chartColors[0],
                          borderColor: chartColors[0],
                          borderWidth: 0
                        }
                      ]
                    },
                    options: {
                      scales: {
                        yAxes: [{
                          ticks: {
                            reverse: false
                          }
                        }]
                      },
                      fill: false,
                      legend: false
                    }
                  }
              
                  var ctx = document.getElementById('chartjs-staked-line-chart').getContext('2d');
                  new Chart(ctx, options);
            });
        });
    }

    if ($("#chartjs-staked-line-chart2").length) {
        var parkingSlotsB = new Array();
        var reservationsB = new Array();
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        await db.collection("parkingSlot").where("parkingLotID", "==", "B").get().then(function(querySnapshot){
            querySnapshot.forEach(async function(doc){
                parkingSlotsB.push(doc.id)
                //get reservations
                var count = 0;
                await db.collection("reservation").where("parkingSlotID", "==", doc.id).get().then(function(reservationSnapshot){
                    reservationSnapshot.forEach(function(doc){
                        var reservationDate = doc.data().reservationDate.toDate();
     
                        
                        if (reservationDate.getMonth() == currentMonth){
                            count = count + 1;
                        }
                    });
                });
                reservationsB.push(count);
                var options = {
                    type: 'line',
                    data: {
                      labels: parkingSlotsB,
                      datasets: [{
                          label: 'Reservations',
                          data: reservationsB,
                          borderWidth: 2,
                          fill: false,
                          backgroundColor: chartColors[0],
                          borderColor: chartColors[0],
                          borderWidth: 0
                        }
                      ]
                    },
                    options: {
                      scales: {
                        yAxes: [{
                          ticks: {
                            reverse: false
                          }
                        }]
                      },
                      fill: false,
                      legend: false
                    }
                  }
              
                  var ctx = document.getElementById('chartjs-staked-line-chart2').getContext('2d');
                  new Chart(ctx, options);
            });
        });
    }

    if ($("#chartjs-bar-chart").length) {

        var parkingBSlots = new Array();
        var parkingBReservations = new Array();
        
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth() - 1;

        // // parkingSlots = ["A1", "A2", "A3", "A4", "A5", "A5", "A6", "A7", "A8", "A9", "A10"];
        await db.collection("parkingSlot").where("parkingLotID", "==", "B").get().then(function(querySnapshot){
            querySnapshot.forEach(async function(doc){
                parkingBSlots.push(doc.id)
                //get reservations
                var count = 0;
                await db.collection("reservation").where("parkingSlotID", "==", doc.id).get().then(function(reservationSnapshot){
                    reservationSnapshot.forEach(function(doc){
                        var reservationDate = doc.data().reservationDate.toDate();
                        console.log(reservationDate.getMonth());
                        console.log(currentMonth);
                        if (reservationDate.getMonth() == currentMonth){
                            count = count + 1;
                            console.log("boo")
                        }
                    });
                });
                parkingBReservations.push(count);
                var BarData = {
                    labels: parkingBSlots,
                    datasets: [{
                      label: '# of Reservations',
                      data: parkingBReservations,
                      backgroundColor: chartColors,
                      borderColor: chartColors,
                      borderWidth: 0
                    }]
                  };
                  var barChartCanvas = $("#chartjs-bar-chart").get(0).getContext("2d");
                  var barChart = new Chart(barChartCanvas, {
                    type: 'bar',
                    data: BarData,
                    options: {
                      legend: false
                    }
                  });
            });
        });

        
      }

    if ($("#cpu-performance").length) {
        var r, y = (r = document.getElementById("cpu-performance").getContext("2d")).createLinearGradient(0, 0, 0, 0);
        y.addColorStop(0, "rgba(255, 255, 225,0.5)"), y.addColorStop(1, "rgba(255, 255, 225,0.5)");
        new Chart(r, {
            type: "line",
            data: {
                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14", "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21", "Day 22", "Day 23", "Day 24", "Day 25", "Day 26", "Day 27", "Day 28", "Day 29", "Day 30", "Day 31", "Day 32", "Day 33", "Day 34", "Day 35", "Day 36", "Day 37", "Day 38", "Day 39", "Day 40", "Day 41", "Day 42", "Day 43", "Day 44", "Day 45", "Day 46", "Day 47", "Day 48", "Day 49", "Day 50", "Day 51", "Day 52", "Day 53", "Day 54", "Day 55", "Day 56", "Day 57", "Day 58", "Day 59", "Day 60", "Day 61", "Day 62", "Day 63", "Day 64", "Day 65", "Day 66", "Day 67", "Day 68", "Day 69", "Day 70", "Day 71", "Day 72", "Day 73", "Day 74", "Day 75", "Day 76", "Day 77", "Day 78", "Day 79", "Day 80", "Day 81", "Day 82"],
                datasets: [{
                    label: "CPU Usage",
                    data: [56, 55, 59, 59, 59, 57, 56, 57, 54, 56, 58, 57, 59, 58, 59, 57, 55, 56, 54, 52, 49, 48, 50, 50, 46, 45, 49, 50, 52, 53, 52, 55, 54, 53, 56, 55, 56, 55, 54, 55, 57, 58, 56, 55, 56, 57, 58, 59, 58, 57, 55, 53, 52, 55, 57, 55, 54, 52, 55, 57, 56, 57, 58, 59, 58, 59, 57, 56, 55, 57, 58, 59, 60, 62, 60, 59, 58, 57, 56, 57, 56, 58, 59],
                    borderColor: chartColors[0],
                    backgroundColor: y,
                    borderWidth: 3
                }, {
                    label: "Ram Usage",
                    data: [32, 25, 29, 29, 29, 27, 26, 27, 24, 26, 28, 27, 29, 28, 29, 27, 25, 26, 24, 20, 18, 21, 19, 17, 14, 13, 16, 15, 17, 18, 19, 22, 20, 23, 21, 25, 24, 22, 25, 27, 25, 26, 24, 20, 18, 18, 18, 22, 19, 23, 25, 23, 22, 25, 27, 25, 24, 22, 25, 27, 26, 27, 28, 29, 28, 29, 27, 26, 25, 27, 28, 29, 26, 27, 25, 29, 28, 27, 26, 27, 26, 28, 29],
                    borderColor: chartColors[1],
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderWidth: 3
                }]
            },
            options: {
                responsive: !0,
                animation: {
                    animateScale: !0,
                    animateRotate: !0
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                legend: !1,
                stepsize: 150,
                min: 0,
                max: 350,
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: !1,
                            drawBorder: !1
                        },
                        ticks: {
                            display: !1,
                            max: 150
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: !1,
                            drawBorder: !1
                        },
                        ticks: {
                            display: !1
                        }
                    }]
                }
            }
        })
    }
});


$(function drawParkingA(){
    var usageA = document.getElementById("usageA")
    db.collection("parkingSlot").where("parkingLotID", "==", "A").onSnapshot(function (querySnapshot){
        parkingLot = [];
        $("#rowA1").children().remove();
        $("#rowA2").children().remove();
        querySnapshot.forEach(function (document){
            parkingLot.push([document.id, document.data().available])
        });
        //have to sort
        
        var divA = document.getElementById("rowA1");
        var divB = document.getElementById("rowA2");

        for (var i = 0; i< (parkingLot.length)/2; i++){
            var divA = document.getElementById("rowA1");
            var div = document.createElement("div")
            div.className ="slotUpper"
            // if ( i == (parkingLot.length)/2 -1){
            //     div.style.borderWidth="5px"
            // }
            if (parkingLot[i][1] == true){
                div.style.borderColor = "#2af598"
            }
            else{
                div.style.borderColor = "#fa709a"
            }
            // div.style.background="#ff77ee"
            div.innerHTML = parkingLot[i][0]
            divA.appendChild(div)
        }

        for (var i = (parkingLot.length)/2 ; i <parkingLot.length; i++){
            var div = document.createElement("div")
            div.className ="slotLower"
            // if ( i == parkingLot.length -1){
            //     div.style.borderRightStyle="solid"
            // }
            if (parkingLot[i][1] == true){
                div.style.borderColor = "#2af598"
            }
            else{
                div.style.borderColor = "#fa709a"
            }
            div.innerHTML = parkingLot[i][0]
            divB.appendChild(div)
        }

        countA = 0;
        for (var i = 0; i < parkingLot.length; i++){
            if (parkingLot[i][1] == true){
                countA++;
            }
        }
        usageA.innerHTML = "Usage: " + ((countA / parkingLot.length) * 100).toFixed(0)+ "%"
    });
});

$(function drawParkingB(){
    db.collection("parkingSlot").where("parkingLotID", "==", "B").onSnapshot(function (querySnapshot){
        var usageB = document.getElementById("usageB");
        parkingLot = [];
        $("#rowB1").children().remove();
        $("#rowB2").children().remove();
        querySnapshot.forEach(function (document){
            parkingLot.push([document.id, document.data().available])
        });
        //have to sort
        
        var divB1 = document.getElementById("rowB1");
        var divB2 = document.getElementById("rowB2");

        for (var i = 0; i< (parkingLot.length)/2; i++){
            var div = document.createElement("div")
            div.className ="slotUpper"
            // if ( i == (parkingLot.length)/2 -1){
            //     div.style.borderRightStyle="solid"
            // }
            if (parkingLot[i][1] == true){
                div.style.borderColor = "#2af598"
            }
            else{
                div.style.borderColor = "#fa709a"
            }
            // div.style.background="#ff77ee"
            div.innerHTML = parkingLot[i][0]
            divB1.appendChild(div)
        }

        for (var i = (parkingLot.length)/2 ; i <parkingLot.length; i++){
            var div = document.createElement("div")
            div.className ="slotLower"
            // if ( i == parkingLot.length -1){
            //     div.style.borderRightStyle="solid"
            // }
            if (parkingLot[i][1] == true){
                div.style.borderColor = "#2af598"
            }
            else{
                div.style.borderColor = "#fa709a"
            }
            div.innerHTML = parkingLot[i][0]
            divB2.appendChild(div)
        }

        countB = 0;
        for (var i = 0; i < parkingLot.length; i++){
            if (parkingLot[i][1] == true){
                countB++;
            }
        }
        usageB.innerHTML = "Usage: " + ((countB / parkingLot.length) * 100).toFixed(0)+ "%"
    });
});