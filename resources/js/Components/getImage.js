// http://msib6.lmizakat.id/laraccb1/public/storage/lmi-logo.png
// http://127.0.0.1:8000/storage/lmi-logo.png
// http://localhost/larac/public/storage/lmi-logo.png

const getImage = (path) => {
    // const appURL = "http://msib6.lmizakat.id/lmizakat/public";
    const appURL = "http://localhost/larac/public/";

    if (!path || path === '') {
        return;
    }

    if (path.includes("https:")) {
        return path;
    }

    return appURL + '/storage/' + path
}

export default getImage;
