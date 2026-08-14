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
    cursos: "",
    certificadoAcademico: null,

    // Experiencia
    empresa: "",
    cargo: "",
    area: "",
    fechaIngreso: "",
    fechaRetiro: "",
    funciones: "",
    referencia: "",
    certificadoLaboral: null
  });

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
          onSiguiente={() => setPaso(4)}
        />
      )}

      {paso === 4 && (
        <VistaPrevia
          datos={datos}
          onVolver={() => setPaso(3)}
        />
      )}

      <Footer />
    </>
  );
}

export default App;