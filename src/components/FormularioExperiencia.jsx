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

  // Función para guardar la experiencia actual en el array general
  const agregarExperiencia = () => {
    if (!nuevaExp.empresa.trim() || !nuevaExp.cargo.trim()) return;

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
  };

  const continuar = (e) => {
    e.preventDefault();
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
        <label>Cargo desempeñada</label>

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
          <small>
            Archivo: {nuevaExp.certificadoLaboral.name}
          </small>
        )}
      </div>

      {/* Botón para guardar esta experiencia individual */}
      <button
        type="button"
        onClick={agregarExperiencia}
        style={{ marginTop: '10px', marginBottom: '20px' }}
      >
        + Agregar esta experiencia
      </button>

      {/* Vista previa temporal de las experiencias agregadas hasta el momento */}
      {Array.isArray(datos.experiencias) && datos.experiencias.length > 0 && (
        <div style={{ marginTop: '10px', marginBottom: '20px' }}>
          <h4>Experiencias agregadas ({datos.experiencias.length}):</h4>
          <ul>
            {datos.experiencias.map((exp, index) => (
              <li key={index}>
                <strong>{exp.cargo}</strong> en <em>{exp.empresa}</em>
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