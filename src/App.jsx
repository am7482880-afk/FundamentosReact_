import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import FormularioPersonal from "./components/FormularioPersonal";
import FormularioAcademico from "./components/FormularioAcademico";
import FormularioExperiencia from "./components/FormularioExperiencia";
import VistaPrevia from "./components/VistaPrevia";

function App() {

  const [paso, setPaso] = useState(1);

  const [datos, setDatos] = useState({
    // Información personal
    nombre: "",
    apellido: "",
    correo: "",
    direccion: "",
    perfil: "",

    // Información académica
    nivel: "",
    institucion: "",
    titulo: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    cursos: [],
    certificadoAcademico: null,
    experiencias: []
  });

  // CONECTAR REACT CON FLASK
const guardarhv = async () => {
    try {
      const datosapi = {
        Fotografia: datos.fotografia || "foto_default.jpg",
        Nombres: datos.nombre,
        Apellidos: datos.apellido,
        Correo: datos.correo,
        Direccion: datos.direccion,
        Perfil_Profesional: datos.perfil
      };

      const respuesta = await fetch(
        "http://127.0.0.1:5000/api/registrohv",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosapi)
        }
      );
      
      const resultado = await respuesta.json();

      if (respuesta.ok) {
        console.log("Respuesta realizada", resultado);
        alert("Hoja de vida registrada con éxito en la base de datos.");
      } else {
        console.error("Error devuelto por el servidor:", resultado);
        alert("Ocurrió un error al guardar: " + (resultado.mensaje || "Error en Flask"));
      }

    } catch (error) {
      console.error("Error al conectar con flask", error);
    }
  };

  // Función para guardar el arreglo de experiencias y cambiar al paso 4
  const handleGuardarExperiencias = (listaExperiencias) => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      experiencias: listaExperiencias
    }));
    setPaso(4);
  };

  return (
    <>
      <Header />

      {paso === 1 && (
        <FormularioPersonal
          datos={datos}
          setDatos={setDatos}
          onSiguiente={() => setPaso(2)}
        />
      )}

      {paso === 2 && (
        <FormularioAcademico
          datos={datos}
          setDatos={setDatos}
          onVolver={() => setPaso(1)}
          onSiguiente={() => setPaso(3)}
        />
      )}

      {paso === 3 && (
        <FormularioExperiencia
          datos={datos}
          setDatos={setDatos}
          onVolver={() => setPaso(2)}
          onSiguiente={handleGuardarExperiencias} // Guarda las experiencias recibidas
        />
      )}

      {paso === 4 && (
        <VistaPrevia
          datos={datos}
          onVolver={() => setPaso(3)}
          onEditarAcademico={() => setPaso(2)}
        />
      )}

      <Footer />
    </>
  );
}

export default App;