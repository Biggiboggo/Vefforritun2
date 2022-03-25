import { Link } from 'react-router-dom';

export function Login({li}) {
    return (
        <div>
            {li ? (
                <div>
                    <p>Skráður inn sem <b>test</b></p>
                </div>
              ) : (
                <div>
                    <Link to='/login'>Innskráning</Link>
                </div>
            )}
        </div>  
    )  
        
}