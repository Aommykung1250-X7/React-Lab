import { useState } from "react";

function RegisterForm() {

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [age, setAge] = useState('');
    const [error, setError] = useState({});

    const [form, setForm] = useState({ name: '', email: '', age: '' });

    const updateForm = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (form.name.trim() === "") {
            errors.name = "Name is required";
        }
        if (!form.email.includes("@")) {
            errors.email = "Email is invalid format";
        }
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Form submitted successfully");
        }

    };

    return (
        <form className="p-8 space-y-4" onSubmit={(e) => {
            handleSubmit(e);
        }}>
            <input className="border rounded p-2" value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Name" />
            <input className="border rounded p-2" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="Email" />
            <input className="border rounded p-2" value={form.age} onChange={(e) => updateForm("age", e.target.value)} placeholder="Age" />
            {JSON.stringify(form)}
            <br />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm;