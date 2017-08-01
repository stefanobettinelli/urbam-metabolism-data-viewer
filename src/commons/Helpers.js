export const convertArrayOfObjectsToCSV = (args) => {
    let csvStringResult = "box_name; timestamp_cest; timestamp_utc; co; co2; no2; o3; pm2.5; pm10; voc; air_t_ds; air_t_am; rad_am\n";

    args.forEach(
        (element) => {
            csvStringResult += element + "\n";
        }
    );

    return csvStringResult;
};

export const getHeaderAsJSONFromCSVText = (csvText) => {
    if (!csvText) return;

    const records = csvText.split("<br/>");
    const header = records[0].split(";").map(
        item => ( {Header: item, accessor: item.toLowerCase()} )
    );

    return header;
};

export const convertCSVBlobTextToListOfJSON = (csvText) => {
    if (!csvText) return;

    const headerJSONList = getHeaderAsJSONFromCSVText(csvText);

    if (!headerJSONList) return;

    const records = csvText.split("<br/>").slice(1);

    return records.map(
        record => {
            let obj = {};
            record.split(";").forEach(
                function (item, index) {
                    let key = headerJSONList[index].accessor;
                    obj[key] = item;
                }
            );
            return obj;
        }
    );
};