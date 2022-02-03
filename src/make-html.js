export function makeHTML(entry) {
    const html = entry.content;
    const date = entry.metadata.date;
    const template = 
    `<section> 
        ${html} 
        <p>Skrifað: ${date}</p> 
    </section>
    `;

    return template;
}

export function blogTemplate(title, blog) {
    return `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>  
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            ${blog}
        </body>
    </html>
    `;
}