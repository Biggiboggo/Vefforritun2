export function Layout(props) {
    return (
                <><head>
            <meta charSet="utf-8"></meta>
            <title>{props.title}</title>
        </head><body>
                <main>
                    {props.main}
                </main>
            </body></>  
    )
}