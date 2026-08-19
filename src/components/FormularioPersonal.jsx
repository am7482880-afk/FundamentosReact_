function FormularioPersonal({ onSiguiente, datos, setDatos }) {
  
  const continuar = (e) => {
    e.preventDefault();
    
    if (datos.nombre.trim() === "") {
      alert("Ingresar nombre completo");
      return;
    }
    
    if (datos.apellido.trim() === "") {
      alert("Ingrese su apellido");
      return;
    }

    if (datos.correo.trim() === "") {
      alert("Ingrese el correo electronico");
      return;
    }

    const excorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!excorreo.test(datos.correo.trim())) {
      alert("Ingresar un correo electronico valido");
      return;
    }

    if (datos.direccion.trim() === "") {
      alert("Ingrese su direccion");
      return;
    }

    if (datos.perfil.trim() === "") {
      alert("Describa su perfil profesional");
      return;
    }
    
    onSiguiente();
  };

  const manejarCambioArchivo = (e) => {
    const archivo = e.target.files[0]; 
    if (archivo) {
      setDatos({ 
        ...datos, 
        foto: archivo, 
        fotoUrl: URL.createObjectURL(archivo) 
      });
    }
  };

  return (
    <form className="formulario" onSubmit={continuar}>
      <h2>Información Personal</h2>
      
      <div className="campo">
        <label>Foto de perfil</label>
        <input type="file" accept="image/*" onChange={manejarCambioArchivo} />
        {datos.fotoUrl && (
          <img src={datos.fotoUrl} alt="Vista previa" style={{ width: '100px', marginTop: '10px', borderRadius: '50%' }} />
        )}
      </div>

      <div className="campo">
        <label>Nombres</label>
        <input 
          type="text" 
          placeholder="Ingrese sus nombres" 
          value={datos.nombre} 
          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })} 
        />
      </div>

      <div className="campo">
        <label>Apellidos</label>
        <input 
          type="text" 
          placeholder="Ingrese sus apellidos" 
          value={datos.apellido} 
          onChange={(e) => setDatos({ ...datos, apellido: e.target.value })} 
        />
      </div>

      <div className="campo">
        <label>Correo electrónico</label>
        <input 
          type="email" 
          placeholder="ejemplo@gmail.com" 
          value={datos.correo} 
          onChange={(e) => setDatos({ ...datos, correo: e.target.value })} 
        />
      </div>

      <div className="campo">
        <label>Dirección</label>
        <input 
          type="text" 
          placeholder="Ingrese su dirección" 
          value={datos.direccion} 
          onChange={(e) => setDatos({ ...datos, direccion: e.target.value })} 
        />
      </div>

      <div className="campo">
        <label>Perfil Profesional</label>
        <textarea 
          rows="5" 
          placeholder="Escriba una breve descripción" 
          value={datos.perfil} 
          onChange={(e) => setDatos({ ...datos, perfil: e.target.value })}
        ></textarea>
      </div>

      <div className="botones">
        <button type="submit"> Continuar </button>
      </div>
    </form>
  );
}

export default FormularioPersonal;
