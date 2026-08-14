function FormularioExperiencia({
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

      <h2>Experiencia Laboral</h2>

      <div className="campo">
        <label>Empresa</label>

        <input
          type="text"
          placeholder="Nombre de la empresa"
          value={datos.empresa}
          onChange={(e) =>
            setDatos({
              ...datos,
              empresa: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Cargo desempeñado</label>

        <input
          type="text"
          placeholder="Cargo"
          value={datos.cargo}
          onChange={(e) =>
            setDatos({
              ...datos,
              cargo: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Área</label>

        <input
          type="text"
          placeholder="Área de trabajo"
          value={datos.area}
          onChange={(e) =>
            setDatos({
              ...datos,
              area: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Fecha de ingreso</label>

        <input
          type="date"
          value={datos.fechaIngreso}
          onChange={(e) =>
            setDatos({
              ...datos,
              fechaIngreso: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Fecha de retiro</label>

        <input
          type="date"
          value={datos.fechaRetiro}
          onChange={(e) =>
            setDatos({
              ...datos,
              fechaRetiro: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Funciones realizadas</label>

        <textarea
          rows="5"
          placeholder="Describa las funciones desempeñadas"
          value={datos.funciones}
          onChange={(e) =>
            setDatos({
              ...datos,
              funciones: e.target.value
            })
          }
        ></textarea>
      </div>

      <div className="campo">
        <label>Referencia laboral</label>

        <input
          type="text"
          placeholder="Nombre y teléfono"
          value={datos.referencia}
          onChange={(e) =>
            setDatos({
              ...datos,
              referencia: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Adjuntar certificado laboral</label>

        <input
          type="file"
          onChange={(e) =>
            setDatos({
              ...datos,
              certificadoLaboral: e.target.files[0]
            })
          }
        />

        {datos.certificadoLaboral && (
          <small>
            Archivo: {datos.certificadoLaboral.name}
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
          Ver hoja de vida
        </button>

      </div>

    </form>
  );
}

export default FormularioExperiencia;