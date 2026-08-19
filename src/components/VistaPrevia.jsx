function VistaPrevia({ datos, onVolver, onEditarAcademico }) {
  const finalizar = () => {
    alert("Hoja de vida registrada correctamente.");
  };

  return (
    <div className="formulario">

      <h2>Vista Previa de la Hoja de Vida</h2>

      <section className="preview-seccion">
        <h3>Información Personal</h3>

        <p><strong>Nombre:</strong> {datos.nombre} {datos.apellido}</p>
        <p><strong>Correo:</strong> {datos.correo}</p>
        <p><strong>Dirección:</strong> {datos.direccion}</p>
        <p><strong>Perfil Profesional:</strong> {datos.perfil}</p>
      </section>

      <section className="preview-seccion">
        <h3>Información Académica</h3>

        <p><strong>Nivel:</strong> {datos.nivel}</p>
        <p><strong>Institución:</strong> {datos.institucion}</p>
        <p><strong>Título:</strong> {datos.titulo}</p>
        <p><strong>Fecha de inicio:</strong> {datos.fechaInicio}</p>
        <p><strong>Fecha de finalización:</strong> {datos.fechaFinalizacion}</p>

        <div>
          <strong>Cursos:</strong>
          {Array.isArray(datos.cursos) && datos.cursos.length > 0 ? (
            <ul>
              {datos.cursos.map((curso, index) => (
                <li key={index}>{curso}</li>
              ))}
            </ul>
          ) : (
            <span> No registrado</span>
          )}
        </div>

        <p>
          <strong>Certificado:</strong>{" "}
          {datos.certificadoAcademico
            ? datos.certificadoAcademico.name
            : "No adjuntado"}
        </p>

        <button
          type="button"
          onClick={onEditarAcademico}
        >
          Editar
        </button>
      </section>

      <section className="preview-seccion">
  <h3>Experiencia Laboral</h3>

  {Array.isArray(datos.experiencias) && datos.experiencias.length > 0 ? (
    datos.experiencias.map((exp, index) => (
      <div key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <p><strong>Empresa:</strong> {exp.empresa}</p>
        <p><strong>Cargo:</strong> {exp.cargo}</p>
        <p><strong>Área:</strong> {exp.area}</p>
        <p><strong>Fecha de ingreso:</strong> {exp.fechaIngreso}</p>
        <p><strong>Fecha de retiro:</strong> {exp.fechaRetiro}</p>
        <p><strong>Funciones:</strong> {exp.funciones}</p>
        <p><strong>Referencia:</strong> {exp.referencia}</p>
        <p>
          <strong>Certificado:</strong>{" "}
          {exp.certificadoLaboral
            ? exp.certificadoLaboral.name
            : "No adjuntado"}
        </p>
      </div>
    ))
  ) : (
    <p>No hay experiencia laboral registrada.</p>
  )}
</section>

      <div className="botones">
        <button
          type="button"
          onClick={onVolver}
        >
          Volver
        </button>

        <button
          type="button"
          onClick={finalizar}
        >
          Finalizar
        </button>
      </div>

      

    </div>
  );
}

export default VistaPrevia;