import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import useUser from "../hooks/useUser";

const initial = { username: "", email: "", password: "", repeatPassword: "" };

const Register = () => {
  const { user, register, logout } = useUser();
  const [form, setForm] = useState(initial);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(form).some(v => v.trim() === "")) {
      return setAlert({ error: true, msg: "Todos los campos son obligatorios" });
    }
    if (form.username.length < 3 || form.username.length > 20) {
      return setAlert({ error: true, msg: "El usuario debe tener entre 3 y 20 caracteres" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return setAlert({ error: true, msg: "El email no es válido" });
    }
    if (form.password.length < 6) {
      return setAlert({ error: true, msg: "La contraseña debe tener al menos 6 caracteres" });
    }
    if (form.password !== form.repeatPassword) {
      return setAlert({ error: true, msg: "Las contraseñas no coinciden" });
    }

    register({ username: form.username, email: form.email });
    setAlert({ error: false, msg: "¡Cuenta creada! Redirigiendo…" });
    setForm(initial);
    setTimeout(() => navigate("/"), 1200);
  };

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <h1 className="text-3xl font-bold">Hola, <span className="text-primary">{user.username}</span> 👋</h1>
        <p className="text-gray-300">Ya tienes una sesión iniciada.</p>
        <div className="flex gap-3">
          <Link to="/mi-lista" className="bg-primary hover:bg-opacity-80 rounded p-2 px-4 font-bold">Mi Lista</Link>
          <button onClick={logout} className="bg-slate-700 hover:bg-slate-600 rounded p-2 px-4 font-bold">Cerrar sesión</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <form onSubmit={handleSubmit} className="bg-slate-900 rounded-lg p-8 w-full max-w-md flex flex-col gap-4 border border-slate-800">
        <div className="flex items-center gap-2 justify-center">
          <BiLogIn className="text-primary text-3xl" />
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
        </div>

        <input name="username" value={form.username} onChange={handleChange} placeholder="Usuario"
          className="bg-slate-800 border border-slate-700 rounded p-3 focus:outline-none focus:border-primary" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email"
          className="bg-slate-800 border border-slate-700 rounded p-3 focus:outline-none focus:border-primary" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña"
          className="bg-slate-800 border border-slate-700 rounded p-3 focus:outline-none focus:border-primary" />
        <input name="repeatPassword" type="password" value={form.repeatPassword} onChange={handleChange} placeholder="Repetir contraseña"
          className="bg-slate-800 border border-slate-700 rounded p-3 focus:outline-none focus:border-primary" />

        {alert && (
          <p className={`text-center text-sm font-bold ${alert.error ? "text-red-400" : "text-green-400"}`}>{alert.msg}</p>
        )}

        <button type="submit" className="bg-primary hover:bg-opacity-80 rounded p-3 font-bold uppercase">
          Registrarse
        </button>
        <Link to="/" className="text-center text-sm text-gray-400 hover:text-primary">Volver al inicio</Link>
      </form>
    </div>
  );
};

export default Register;
