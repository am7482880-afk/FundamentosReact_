function FormularioAcademico({
  datos,
  setDatos,
  onVolver,
  onSiguiente
}) {

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

      <div className="campo">
        <label>Cursos realizados</label>

        <input
          type="text"
          placeholder="Escriba los cursos realizados"
          value={datos.cursos}
          onChange={(e) =>
            setDatos({
              ...datos,
              cursos: e.target.value
            })
          }
        />
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