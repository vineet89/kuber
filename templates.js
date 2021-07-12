const kuberUIBox = (insights) => {
    let content = '';

    const dataToHTMLList = (data) => data.map((d) => `<li> ${d.label + ' : ' + `<b>${d.value}</b>`} </li>`).join('')

    insights.forEach(i => {
        content += `<section>
            <div class='section-title'>${i.title}</div>
            <ul class='kuber-insights'> ${dataToHTMLList(i.data)} </ul>
        </section>`
    })

    return `
    <div id='kuber-box'>
        <div class='kuber-branding'>
            <span class='logo'> KUBER </span>
        </div>
        ${content}
    </div >
    `
};