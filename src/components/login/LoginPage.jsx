import { Link } from 'react-router-dom';
import { Input } from '../input/Input';

export function LoginPage() {
    return (
        <div>
           <h1>Innskráning</h1>
            <Input num1='Notendamafn*' num2='Lykilorð'/>
            <div>
                <Link to="/">Til baka</Link>
            </div> 
        </div>
        
    )
}