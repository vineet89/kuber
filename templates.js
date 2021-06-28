const kuberUIBox = (data) => {
    let content = '';
    data.forEach((value, key) => content += `<li> ${key + ' ' + value} </li>`)
    return `
    <div id='kuber-box'>
        <div class='kuber-branding'>
            <span class='logo'> KUBER </span>
        </div>
        <ul class='kuber-insights'> ${content} </ul>
    </div >
    `
};