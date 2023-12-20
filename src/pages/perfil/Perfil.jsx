import React, { useState, useContext, useEffect} from "react";
import "./perfil.css";
import { updateUser, findUser } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { UserContext } from "../../context/userContext";

const Perfil = () => {

    const {userData} = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        state: "",
        city: "",
    });

    useEffect(() => {
        const find = async () => {
            const response = await findUser("email", userData.email, "name lastname state city");
            if (response.success) {
                setFormData({
                    name: response.userData.name,
                    lastname: response.userData.lastname,
                    state: response.userData.state,
                    city: response.userData.city,
                });
            } else {
                swalPopUp("Error", response.message, "error");
            }
        }
        find();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {             /* Actualizacion de datos de usuario */
        e.preventDefault();
        const formData = new FormData(document.querySelector(".userUpdateForm"));
        const data = Object.fromEntries(formData);
        data.email = userData.email;
        const entries = Object.values(data);    
        if (entries.every((value) => value.trim() !== "")) {
            const response = await updateUser(data);
            response.success ? swalPopUp("Perfil Actualizado", response.message, "success") : swalPopUp("Error", response.message, "error");
            setFormData({name: "", lastname: "", state: "", city: ""});
        } else {
            swalPopUp("Ops!", "Todos los campos son obligatorios", "warning")
        }
    };

    return (
        <div className="perfil-container">
            <div className="perfil-card">
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="userUpdateForm">
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Apellido:
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Provincia:
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Localidad:
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

export default Perfil;
