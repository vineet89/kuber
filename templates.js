const kuberUIBox = (data) => {
    let content = '';
    data.forEach((value, key) => content += `<p> ${key + ' ' + value} </p>`)
    return `
    <div id='kuber-box'>
        <div class='kuber-branding'>
            <span class='logo'> KUBER </span>
            <span class='personal'> by Vineet </span>
        </div>
        <div class='kuber-insights'> ${content} </div>
    </div >
    `
};