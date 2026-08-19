import { useState } from 'react';

function FormularioAcademico({
  datos,
  setDatos,
  onVolver,
  onSiguiente
}) {

  const [nuevoCurso, setNuevoCurso] = useState('');

  const agregarCurso = () => {
    if (!nuevoCurso.trim()) return;

    setDatos({
      ...datos,
      cursos: [...(Array.isArray(datos.cursos) ? datos.cursos : []), nuevoCurso.trim()]
    });

    setNuevoCurso('');
  };

  const eliminarCurso = (indexParaEliminar) => {
    const cursosActuales = Array.isArray(datos.cursos) ? datos.cursos : [];
    const cursosFiltrados = cursosActuales.filter((_, index) => index !== indexParaEliminar);
    
    setDatos({
      ...datos,
      cursos: cursosFiltrados
    });
  };

  const continuar = (e) => {
    e.preventDefault();

    if (datos.institucion.trim() === ""){
      alert("Agregue la institucion");
      return;
    }

    if (datos.titulo.trim() === ""){
      alert("Agregue el titulo");
      return;
    } 

    if (datos.fechaInicio.trim() === ""){
      alert("Seleccione la fecha de inicio");
      return;
    }

    if (datos.fechaFinalizacion.trim() === ""){
      alert("Ingrese la fecha de finalizacion");
      return;
    }

    if (!Array.isArray(datos.cursos) || datos.cursos.length === 0) {
      alert("Debes agregar al menos un curso para continuar");
      return; 
    }

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

      <div className="campo">
        <label>Cursos realizados</label>

        <div className="grupo-agregar-curso">
          <input
            type="text"
            placeholder="Escriba un curso realizado"
            value={nuevoCurso}
            onChange={(e) => setNuevoCurso(e.target.value)}
          />

          <button
            type="button"
            className="btn-agregar"
            onClick={agregarCurso}
          >
            Agregar
          </button>
        </div>

        {Array.isArray(datos.cursos) && datos.cursos.length > 0 && (
          <ul className="lista-cursos">
            {datos.cursos.map((curso, index) => (
              <li key={index}>
                <span>{curso}</span>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => eliminarCurso(index)}
                  title="Eliminar curso"
                >
                  ✕
                </button>
              </li>
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
          <small className="archivo-adjunto">
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
