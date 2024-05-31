const getValues = (value) => {
    const months = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];
    const date = new Date(value);
    const day = date.getDate();
    const suffixes = {1: "st", 2: "nd",3:"rd"};
    const dayChar = String(day).slice(-1);
    const suffix = suffixes[dayChar] || "th";
    const month = months[date.getMonth()];
    return {month,day,suffix}
}

export const dayAndMonth = (value) => {
    const {month,day,suffix} = getValues(value);
    return `${day}${suffix} ${month} `;
}

export const year = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    return `${year}`;
}

export const formatDate = (value) => {
    const {day} = getValues(value);
    const month = new Date(value).getMonth()+1;
    let dayStr = day.toString();
    if(dayStr.length === 1) dayStr = '0'+ dayStr;
    let monthStr = month.toString();
    if(monthStr.length === 1) monthStr = '0' + monthStr;
    const fullYear = year(value);
    return `${dayStr}/${monthStr}/${fullYear}`;
}




