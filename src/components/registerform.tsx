import React, {useState} from 'react';

interface Props {
    title: string;
}

interface User {
    name: string;
}

    export function  Register(props: Props) {

        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [users, setUsers] = useState<User[]>([{'name': 'anna'}, {'name': 'alex'}])

        // States for checking the errors
        const [submitted, setSubmitted] = useState(false);
        const [error, setError] = useState(false);

        console.log(users)

        // HandleChange method to update the states
        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
        }

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

                if (name) {
                    setUsers([...users, {name: name}]);
                    setName(''); // Clear the input field
                }

            if (name === '' || email === '' || password === '') {
                setError(true);
            } else {
                setSubmitted(true);
                setError(false);
            }
            setName('')


        }



        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input  onChange={handleChange} value={name}/>
                    <button  className="btn"
                            type="submit">
                      Submit
                    </button>
                </form>
            </div>
        )

    };

    // export default Register;

