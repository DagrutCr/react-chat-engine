export function getDateTime(date) {
    if (!date) {
        return new Date();
    }

    let dateObj = new Date(date);
    if (isNaN(dateObj.getFullYear())) {
        dateObj = new Date(date.replace(' ', 'T'));
    }

    return (dateObj);
}

export function formatTime(dateObj) {
    var time = dateObj.toLocaleString('en-US')
    return time.split(' ')[1].slice(0, -3) + ' ' + time.slice(-2)
}

export function formatDate(dateObj) {
    return dateObj.toLocaleString('en-US')
}

export function formatDateTime(dateObj) {
    return formatTime(dateObj) + ', ' + formatDate(dateObj)
}

export function formatDateTimeAgo(dateObj) {
    return dateObj.toString().substr(4, 6)
}
