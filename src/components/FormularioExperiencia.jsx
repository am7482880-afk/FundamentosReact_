import { useState } from 'react';

function FormularioExperiencia({
  datos,
  setDatos,
  onVolver,
  onSiguiente
}) {

  // Estado local para la experiencia actual que se está digitando
  const [nuevaExp, setNuevaExp] = useState({
    empresa: '',
    cargo: '',
    area: '',
    fechaIngreso: '',
    fechaRetiro: '',
    funciones: '',
    referencia: '',
    certificadoLaboral: null
  });

  // Función para capturar los cambios en cada input de la experiencia local
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNuevaExp({
      ...nuevaExp,
      [name]: files ? files[0] : value
    });
  };

  // Función para guardar la experiencia actual en el array general con validación de campos
  const agregarExperiencia = () => {
    
    // VALIDACIONES DE CAMPOS OBLIGATORIOS (Antes de meterlo a la lista)
    if (nuevaExp.empresa.trim() === "") {
      alert("Agregue el nombre de la empresa");
      return;
    }

    if (nuevaExp.cargo.trim() === "") {
      alert("Agregue el cargo desempeñado");
      return;
    }

    if (nuevaExp.area.trim() === "") {
      alert("Ingrese el área de trabajo");
      return;
    }

    if (nuevaExp.fechaIngreso.trim() === "") {
      alert("Seleccione la fecha de ingreso");
      return;
    }

    if (nuevaExp.fechaRetiro.trim() === "") {
      alert("Ingrese la fecha de retiro");
      return;
    }

    if (nuevaExp.funciones.trim() === "") {
      alert("Describa las funciones realizadas");
      return;
    }

    if (nuevaExp.referencia.trim() === "") {
      alert("Ingrese una referencia laboral");
      return;
    }

    // Si pasa todas las validaciones individuales, se guarda en el arreglo general
    setDatos({
      ...datos,
      experiencias: [...(Array.isArray(datos.experiencias) ? datos.experiencias : []), nuevaExp]
    });

    // Limpiar el formulario local de experiencia
    setNuevaExp({
      empresa: '',
      cargo: '',
      area: '',
      fechaIngreso: '',
      fechaRetiro: '',
      funciones: '',
      referencia: '',
      certificadoLaboral: null
    });

    // Resetea el input de tipo archivo visualmente en la pantalla
    const fileInput = document.querySelector('input[type="file"][name="certificadoLaboral"]');
    if (fileInput) fileInput.value = '';
  };

  // Función para borrar una experiencia de la lista
  const eliminarExperiencia = (indexParaEliminar) => {
    const experienciasActuales = Array.isArray(datos.experiencias) ? datos.experiencias : [];
    const experienciasFiltradas = experienciasActuales.filter((_, index) => index !== indexParaEliminar);
    
    setDatos({
      ...datos,
      experiencias: experienciasFiltradas
    });
  };

  const continuar = (e) => {
    e.preventDefault();

    if (nuevaExp.empresa.trim() !== "" || nuevaExp.cargo.trim() !== "") {
      alert("Tienes datos escritos. Por favor, pulsa primero el botón '+ Agregar esta experiencia'.");
      return;
    }

    if (!Array.isArray(datos.experiencias) || datos.experiencias.length === 0) {
      alert("Debes agregar al menos una experiencia laboral para continuar");
      return; 
    }

    onSiguiente();
  };

  return (
    <form className="formulario" onSubmit={continuar}>

      <h2>Experiencia Laboral</h2>

      <div className="campo">
        <label>Empresa</label>
        <input
          type="text"
          name="empresa"
          placeholder="Nombre de la empresa"
          value={nuevaExp.empresa}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label>Cargo desempeñado</label>
        <input
          type="text"
          name="cargo"
          placeholder="Cargo"
          value={nuevaExp.cargo}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label>Área</label>
        <input
          type="text"
          name="area"
          placeholder="Área de trabajo"
          value={nuevaExp.area}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label>Fecha de ingreso</label>
        <input
          type="date"
          name="fechaIngreso"
          value={nuevaExp.fechaIngreso}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label>Fecha de retiro</label>
        <input
          type="date"
          name="fechaRetiro"
          value={nuevaExp.fechaRetiro}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label>Funciones realizadas</label>
        <textarea
          rows="5"
          name="funciones"
          placeholder="Describa las funciones desempeñadas"
          value={nuevaExp.funciones}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="campo">
        <label>Referencia laboral</label>
        <input
          type="text"
          name="referencia"
          placeholder="Nombre y teléfono"
          value={nuevaExp.referencia}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label>Adjuntar certificado laboral</label>
        <input
          type="file"
          name="certificadoLaboral"
          onChange={handleChange}
        />
        {nuevaExp.certificadoLaboral && (
          <small className="archivo-adjunto">
            Archivo: {nuevaExp.certificadoLaboral.name}
          </small>
        )}
      </div>

      <button
        type="button"
        className="btn-bloque-agregar"
        onClick={agregarExperiencia}
      >
        + Agregar esta experiencia
      </button>

      {Array.isArray(datos.experiencias) && datos.experiencias.length > 0 && (
        <div className="contenedor-experiencias-lista">
          <h3>Experiencias agregadas ({datos.experiencias.length})</h3>
          <ul className="lista-experiencias">
            {datos.experiencias.map((exp, index) => (
              <li key={index}>
                <div className="info-exp">
                  <strong>{exp.cargo}</strong> en <em>{exp.empresa}</em>
                  {exp.area && <small> ({exp.area})</small>}
                </div>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => eliminarExperiencia(index)}
                  title="Eliminar experiencia"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="botones">
        <button
          type="button"
          onClick={onVolver}
        >
          Volver
        </button>

        <button type="submit">
          Ver hoja de vida
        </button>
      </div>

    </form>
  );
}

export default FormularioExperiencia;
