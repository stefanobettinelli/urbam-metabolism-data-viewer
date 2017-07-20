import moment from 'moment';

const convertArrayOfObjectsToCSV = (args) => {
    let csvStringResult = "box_name; timestamp_cest; timestamp_utc; co; co2; no2; o3; pm2.5; pm10; voc; air_t_ds; air_t_am; rad_am\n";

    args.forEach(
        (element) => {
            let colValues = element.split(';');
            colValues.forEach(item => item.trim());
            colValues[1] = moment(colValues[1]).format('YYYY-MM-DD HH:mm:ss');
            colValues[2] = moment(colValues[2]).format('YYYY-MM-DD HH:mm:ss');
            element = colValues.join(';');
            csvStringResult += element + "\n";
        }
    );

    return csvStringResult;
};

export {convertArrayOfObjectsToCSV};