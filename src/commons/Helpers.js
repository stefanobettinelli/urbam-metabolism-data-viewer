const convertArrayOfObjectsToCSV = (args) => {
    let csvStringResult = "box_name, timestamp, co, co2, no2, o3, pm2.5, pm10\n";

    args.forEach(
        (element) => {
            csvStringResult += element + "\n";
        }
    );

    return csvStringResult.replace(',',';');
};

export {convertArrayOfObjectsToCSV};