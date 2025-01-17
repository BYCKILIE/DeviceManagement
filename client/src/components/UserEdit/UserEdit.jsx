import './UserEdit.css'
import { useState, useEffect } from 'react';
import useUsers from "../../hooks/useUsers.js";
import useProfiles from "../../hooks/userProfiles.js";

const UserEdit = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // Set up state for the form fields with initial user data.
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const [newData, setNewData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });


    const { readUser, updateUser } = useUsers()
    const { readProfile, updateProfile } = useProfiles()

    useEffect(() => {
        const getData = async () => {
            const user = await readUser()
            const profile = await readProfile()

            setFormData({
                ...formData,
                email: user.email,
                firstName: profile.firstName,
                lastName: profile.lastName,
            });
        }
        getData()
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const handle = async () => {
            setError('');
            try {
                await updateUser(newData.email, newData.password);
                await updateProfile(newData.firstName, newData.lastName);

                window.location.reload();
            } catch (err) {
                setError(err.message);
            }
        }

        handle();
        setLoading(false)
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Personal Profile</h1>

                <div className="input-box">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={formData.email}
                        value={newData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={newData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        placeholder={formData.firstName}
                        value={newData.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="name"
                        name="lastName"
                        id="lastName"
                        placeholder={formData.lastName}
                        value={newData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}</button>
            </form>
        </div>
    );
};

export default UserEdit;

