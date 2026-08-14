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

        <p>
          <strong>Curso:</strong>{" "}
          {datos.cursos || "No registrado"}
        </p>

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

        <p><strong>Empresa:</strong> {datos.empresa}</p>
        <p><strong>Cargo:</strong> {datos.cargo}</p>
        <p><strong>Área:</strong> {datos.area}</p>
        <p><strong>Fecha de ingreso:</strong> {datos.fechaIngreso}</p>
        <p><strong>Fecha de retiro:</strong> {datos.fechaRetiro}</p>
        <p><strong>Funciones:</strong> {datos.funciones}</p>
        <p><strong>Referencia:</strong> {datos.referencia}</p>

        <p>
          <strong>Certificado:</strong>{" "}
          {datos.certificadoLaboral
            ? datos.certificadoLaboral.name
            : "No adjuntado"}
        </p>
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