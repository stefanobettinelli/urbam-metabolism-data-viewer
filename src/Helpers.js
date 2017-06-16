const convertArrayOfObjectsToCSV = (args) => {
    const header = "box_name, timestamp, co, co2, no2, o3, pm2.5, pm10\n";
    let csvStringResult = header;

    args.forEach(
        (element) => {
            csvStringResult += element + "\n";
        }
    );

    return csvStringResult;
};

export {convertArrayOfObjectsToCSV};