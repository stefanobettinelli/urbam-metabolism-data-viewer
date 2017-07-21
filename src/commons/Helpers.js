export const convertArrayOfObjectsToCSV = (args) => {
    let csvStringResult = "box_name, timestamp, co, co2, no2, o3, pm2.5, pm10\n";

    args.forEach(
        (element) => {
            csvStringResult += element + "\n";
        }
    );

    return csvStringResult;
};

export const convertCSVtoJSONArray = (csvText) => {
    if (!csvText) return;
    const records = csvText.split("<br/>");
    const header = records[0].split(";").map(
        item => ( {Header: item, accessor: item.toLowerCase()} )
    );

    return header;
};