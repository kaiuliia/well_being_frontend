import React, {useState} from 'react';

interface Props {
    title: string;
}


    export function  Register(props: Props) {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        // States for checking the errors
        const [submitted, setSubmitted] = useState(false);
        const [error, setError] = useState(false);

        // HandleChange method to update the states
        const handleChange = () => {
            console.log('eheeh')
        }



        // Handling the form submission
        // const handleSubmit = (e)  => {
        //     e.preventDefault();
        //     if (name === '' || email === '' || password === '') {
        //         setError(true);
        //     } else {
        //         setSubmitted(true);
        //         setError(false);
        //     }
        // };

        return (
            <div>
                <form>
                    <input  onChange={handleChange}/>
                    <button onClick={handleChange} className="btn"
                            type="submit">
                      Submit
                    </button>
                </form>
            </div>
        )

    };

    // export default Register;

