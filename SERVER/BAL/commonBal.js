exports.getCurrentFinYear = () => {
    return new Promise((resolve, reject) => {
        const cYear = new Date().getFullYear().toString();
        const cMonth = new Date().getMonth();
        const cFinYear = cMonth >= 3 ? cYear + "-" + (parseInt(cYear.slice(2, 4)) + 1).toString() : (parseInt(cYear) - 1).toString() + "-" + cYear.slice(2, 4);
        resolve(cFinYear);
    })
}