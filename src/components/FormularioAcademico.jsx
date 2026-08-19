import { useState } from 'react';

function FormularioAcademico({
  datos,
  setDatos,
  onVolver,
  onSiguiente
}) {

  // Estado local para el nombre del curso que se está escribiendo
  const [nuevoCurso, setNuevoCurso] = useState('');

  // Función para agregar el nombre del curso al array 'cursos'
  const agregarCurso = () => {
    if (!nuevoCurso.trim()) return;

    setDatos({
      ...datos,
      cursos: [...(Array.isArray(datos.cursos) ? datos.cursos : []), nuevoCurso]
    });

    // Limpia el input del curso
    setNuevoCurso('');
  };

  const continuar = (e) => {
    e.preventDefault();
    onSiguiente();
  };

  return (
    <form className="formulario" onSubmit={continuar}>

      <h2>Información Académica</h2>

      <div className="campo">
        <label>Nivel de formación</label>

        <select
          value={datos.nivel}
          onChange={(e) =>
            setDatos({
              ...datos,
              nivel: e.target.value
            })
          }
        >
          <option value="">Seleccione...</option>
          <option value="Bachiller">Bachiller</option>
          <option value="Técnico">Técnico</option>
          <option value="Tecnólogo">Tecnólogo</option>
        </select>
      </div>

      <div className="campo">
        <label>Institución educativa</label>

        <input
          type="text"
          placeholder="Nombre de la institución"
          value={datos.institucion}
          onChange={(e) =>
            setDatos({
              ...datos,
              institucion: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Título obtenido</label>

        <input
          type="text"
          placeholder="Ejemplo: Tecnólogo en ADSO"
          value={datos.titulo}
          onChange={(e) =>
            setDatos({
              ...datos,
              titulo: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Fecha de inicio</label>

        <input
          type="date"
          value={datos.fechaInicio}
          onChange={(e) =>
            setDatos({
              ...datos,
              fechaInicio: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Fecha de finalización</label>

        <input
          type="date"
          value={datos.fechaFinalizacion}
          onChange={(e) =>
            setDatos({
              ...datos,
              fechaFinalizacion: e.target.value
            })
          }
        />
      </div>

      {/* --- CURSOS REALIZADOS (SOLO NOMBRE) --- */}
      <div className="campo">
        <label>Cursos realizados</label>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Escriba un curso realizado"
            value={nuevoCurso}
            onChange={(e) => setNuevoCurso(e.target.value)}
          />

          <button
            type="button"
            onClick={agregarCurso}
          >
            Agregar
          </button>
        </div>

        {/* Muestra la lista de cursos a medida que los agregas */}
        {Array.isArray(datos.cursos) && datos.cursos.length > 0 && (
          <ul style={{ marginTop: '10px' }}>
            {datos.cursos.map((curso, index) => (
              <li key={index}>{curso}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="campo">
        <label>Adjuntar certificado académico</label>

        <input
          type="file"
          onChange={(e) =>
            setDatos({
              ...datos,
              certificadoAcademico: e.target.files[0]
            })
          }
        />

        {datos.certificadoAcademico && (
          <small>
            Archivo: {datos.certificadoAcademico.name}
          </small>
        )}
      </div>

      <div className="botones">

        <button
          type="button"
          onClick={onVolver}
        >
          Volver
        </button>

        <button type="submit">
          Continuar
        </button>

      </div>

    </form>
  );
}

export default FormularioAcademico;