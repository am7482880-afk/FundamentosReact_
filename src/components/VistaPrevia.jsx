import React from 'react';

function VistaPrevia({ datos, onVolver, onEditarAcademico }) {

  const finalizar = async () => {
    try {
      // 1. Guardar o registrar la Información Personal
      const datosPersonales = {
        Fotografia: datos.fotografia || "foto_default.jpg",
        Nombres: datos.nombre,
        Apellidos: datos.apellido,
        Correo: datos.correo,
        Direccion: datos.direccion,
        Perfil_Profesional: datos.perfil
      };

      const resPersona = await fetch("http://127.0.0.1:5000/api/registrohv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosPersonales)
      });

      const resPersonaData = await resPersona.json();

      if (!resPersona.ok || !resPersonaData.id) {
        alert("Error al registrar datos personales: " + (resPersonaData.Mensaje || "Error en el servidor"));
        return;
      }

      const idPersonal = resPersonaData.id;

      // 2. Registrar la Información Académica en la tabla 'estudios'
      if (datos.institucion && datos.titulo) {
        const datosEstudio = {
          Nivel: datos.nivel,
          Institucion: datos.institucion,
          Titulo: datos.titulo,
          Fecha_inicio: datos.fechaInicio,
          Fecha_finalizacion: datos.fechaFinalizacion,
          Certificado: datos.certificadoAcademico ? datos.certificadoAcademico.name : null
        };

        await fetch(`http://127.0.0.1:5000/api/registrarestudio/${idPersonal}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosEstudio)
        });
      }

      // 3. Registrar los Cursos en la tabla 'cursos'
      if (Array.isArray(datos.cursos) && datos.cursos.length > 0) {
        for (const cursoNombre of datos.cursos) {
          await fetch(`http://127.0.0.1:5000/api/registrarcurso/${idPersonal}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Nombre: cursoNombre })
          });
        }
      }

      // 4. Registrar cada Experiencia Laboral en la tabla 'experiencias'
      if (Array.isArray(datos.experiencias) && datos.experiencias.length > 0) {
        for (const exp of datos.experiencias) {
          const datosExp = {
            Empresa: exp.empresa,
            Cargo: exp.cargo,
            Area: exp.area,
            Fecha_ingreso: exp.fechaIngreso,
            Fecha_retiro: exp.fechaRetiro,
            Funciones: exp.funciones,
            Referencia_laboral: exp.referencia,
            Certificado: exp.certificadoLaboral ? exp.certificadoLaboral.name : null,
            Habilidades: Array.isArray(exp.habilidades) ? exp.habilidades.join(", ") : ""
          };

          await fetch(`http://127.0.0.1:5000/api/registrarexperiencia/${idPersonal}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosExp)
          });
        }
      }

      alert("¡Hoja de vida y todos sus datos guardados con éxito en la base de datos!");

    } catch (error) {
      console.error("Error registrando los datos completos:", error);
      alert("Ocurrió un fallo en la conexión con la API de Flask.");
    }
  };

  return (
    <div className="formulario">
      <h2>Vista Previa de la Hoja de Vida</h2>

      {/* INFORMACIÓN PERSONAL */}
      <section className="preview-seccion">
        <h3>Información Personal</h3>
        <p><strong>Nombre:</strong> {datos.nombre} {datos.apellido}</p>
        <p><strong>Correo:</strong> {datos.correo}</p>
        <p><strong>Dirección:</strong> {datos.direccion}</p>
        <p><strong>Perfil Profesional:</strong> {datos.perfil}</p>
      </section>

      {/* INFORMACIÓN ACADÉMICA */}
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

        <button type="button" onClick={onEditarAcademico}>
          Editar
        </button>
      </section>

      {/* EXPERIENCIA LABORAL */}
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
              <div>
                <strong>Habilidades:</strong>
                {Array.isArray(exp.habilidades) && exp.habilidades.length > 0 ? (
                  <ul>
                    {exp.habilidades.map((hab, i) => (
                      <li key={i}>{hab}</li>
                    ))}
                  </ul>
                ) : (
                  <span> No registradas</span>
                )}
              </div>

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

      {/* BOTONES PRINCIPALES */}
      <div className="botones">
        <button type="button" onClick={onVolver}>
          Volver
        </button>

        <button type="button" onClick={finalizar}>
          Finalizar
        </button>
      </div>
    </div>
  );
}

export default VistaPrevia;