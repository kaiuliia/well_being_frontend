import React, {useState} from 'react';

interface Props {
    title: string;
}


    export function  Register(props: Props) {
        const [name, setName] = useState("");

        // HandleChange method to update the states
        const handleChange = () => {
            console.log('eheeh')
        }




        return (
            <div>
                <form>
                    <input value={name} onChange={handleChange}/>
                </form>
            </div>
        )



    };

    // export default Register;

