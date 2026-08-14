function FormularioPersonal({ onSiguiente, datos, setDatos }) {

  const continuar = (e) => {
    e.preventDefault();
    onSiguiente();
  };

  return (
    <form className="formulario" onSubmit={continuar}>

      <h2>Información Personal</h2>

      <div className="campo">
        <label>Nombres</label>

        <input
          type="text"
          placeholder="Ingrese sus nombres"
          value={datos.nombre}
          onChange={(e) =>
            setDatos({
              ...datos,
              nombre: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Apellidos</label>

        <input
          type="text"
          placeholder="Ingrese sus apellidos"
          value={datos.apellido}
          onChange={(e) =>
            setDatos({
              ...datos,
              apellido: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Correo electrónico</label>

        <input
          type="email"
          placeholder="ejemplo@gmail.com"
          value={datos.correo}
          onChange={(e) =>
            setDatos({
              ...datos,
              correo: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Dirección</label>

        <input
          type="text"
          placeholder="Ingrese su dirección"
          value={datos.direccion}
          onChange={(e) =>
            setDatos({
              ...datos,
              direccion: e.target.value
            })
          }
        />
      </div>

      <div className="campo">
        <label>Perfil Profesional</label>

        <textarea
          rows="5"
          placeholder="Escriba una breve descripción"
          value={datos.perfil}
          onChange={(e) =>
            setDatos({
              ...datos,
              perfil: e.target.value
            })
          }
        ></textarea>
      </div>

      <div className="botones">
        <button type="submit">
          Continuar
        </button>
      </div>

    </form>
  );
}

export default FormularioPersonal;