const getLocalDate = (date, lang, showDate = true) => {
    const arrDate = date.split('-');
    const monthsId = [
                    "Januari", "Februari", "Maret", "April",
                    "Mei", "Juni", "Juli", "Agustus",
                    "September", "Oktober", "November", "Desember",
                ];
    const monthsEn = [
                    "January", "February", "March", "April",
                    "May", "June", "July", "August",
                    "September", "October", "November", "December",
    ];

    const day = arrDate[2];
    const month = lang === 'id' ? monthsId[arrDate[1] - 1] : monthsEn[arrDate[1] - 1];
    const year = arrDate[0]

    let localDate;
    // const localDate = `${showDate === true ? (day) : ''} ${month} ${year}`;
    if (showDate === true) {
        localDate = `${day} ${month} ${year}`
    } else if (showDate === false) {
        localDate = `${month} ${year}`
    }

    return localDate;
}

export default getLocalDate;
