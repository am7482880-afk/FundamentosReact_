import React, { useState } from 'react';

export default function FormularioExperiencia({ onSiguiente, onVolver }) {
  // Lista de experiencias agregadas en este formulario
  const [experiencias, setExperiencias] = useState([]);

  // Campos del formulario
  const [empresa, setEmpresa] = useState('');
  const [cargo, setCargo] = useState('');
  const [area, setArea] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaRetiro, setFechaRetiro] = useState('');
  const [trabajoActual, setTrabajoActual] = useState(false);
  const [funciones, setFunciones] = useState('');
  const [referencia, setReferencia] = useState('');
  const [certificadoLaboral, setCertificadoLaboral] = useState(null);

  // Estado para Habilidades
  const [habilidadTemp, setHabilidadTemp] = useState('');
  const [habilidades, setHabilidades] = useState([]);

  const agregarHabilidad = () => {
    if (!habilidadTemp.trim()) return;
    setHabilidades([...habilidades, habilidadTemp.trim()]);
    setHabilidadTemp('');
  };

  const eliminarHabilidad = (index) => {
    setHabilidades(habilidades.filter((_, i) => i !== index));
  };

  // AGREGAR EXPERIENCIA A LA LISTA LOCAL
  const agregarBloqueExperiencia = (e) => {
    if (e) e.preventDefault(); // Evita recarga si se dispara por enter

    if (!empresa || !cargo) {
      alert('Por favor ingresa al menos la Empresa y el Cargo.');
      return;
    }

    const nuevaExp = {
      empresa,
      cargo,
      area,
      fechaIngreso,
      fechaRetiro: trabajoActual ? 'Actualmente' : fechaRetiro,
      funciones,
      referencia,
      certificadoLaboral,
      habilidades
    };

    // Añade inmediatamente al arreglo
    setExperiencias((prev) => [...prev, nuevaExp]);

    // Limpia los inputs para ingresar otra
    setEmpresa('');
    setCargo('');
    setArea('');
    setFechaIngreso('');
    setFechaRetiro('');
    setTrabajoActual(false);
    setFunciones('');
    setReferencia('');
    setCertificadoLaboral(null);
    setHabilidades([]);
  };

  const eliminarExperiencia = (index) => {
    setExperiencias(experiencias.filter((_, i) => i !== index));
  };

  // ENVIAR TODO AL COMPONENTE PADRE
  const handleGuardarTodo = () => {
    let listaFinal = [...experiencias];

    // Si hay datos escritos en los inputs y no ha dado clic en "+ Añadir esta experiencia", se incluyen
    if (empresa.trim() !== '' || cargo.trim() !== '') {
      if (!empresa || !cargo) {
        alert('Por favor completa los campos de Empresa y Cargo antes de guardar.');
        return;
      }

      const expPendiente = {
        empresa,
        cargo,
        area,
        fechaIngreso,
        fechaRetiro: trabajoActual ? 'Actualmente' : fechaRetiro,
        funciones,
        referencia,
        certificadoLaboral,
        habilidades
      };

      listaFinal.push(expPendiente);
    }

    if (listaFinal.length === 0) {
      alert('Por favor añade al menos una experiencia laboral.');
      return;
    }

    // Pasa la lista completa al padre (quien gestiona "datos.experiencias")
    if (typeof onSiguiente === 'function') {
      onSiguiente(listaFinal);
    }
  };

  return (
    <div className="formulario">
      <h2>Experiencia Laboral</h2>

      <div className="campo">
        <label>Empresa</label>
        <input
          type="text"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Cargo</label>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Área</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Fecha de Ingreso</label>
        <input
          type="date"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
        />
      </div>

      {!trabajoActual && (
        <div className="campo">
          <label>Fecha de Retiro</label>
          <input
            type="date"
            value={fechaRetiro}
            onChange={(e) => setFechaRetiro(e.target.value)}
          />
        </div>
      )}

      <div className="campo" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        <input
          type="checkbox"
          id="trabajoActual"
          checked={trabajoActual}
          onChange={(e) => setTrabajoActual(e.target.checked)}
          style={{ width: 'auto' }}
        />
        <label htmlFor="trabajoActual" style={{ margin: 0 }}>
          Trabajo actualmente aquí
        </label>
      </div>

      <div className="campo">
        <label>Funciones</label>
        <textarea
          rows="4"
          value={funciones}
          onChange={(e) => setFunciones(e.target.value)}
        ></textarea>
      </div>

      <div className="campo">
        <label>Referencia Laboral</label>
        <input
          type="text"
          value={referencia}
          onChange={(e) => setReferencia(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Certificado (Soporte)</label>
        <input
          type="file"
          onChange={(e) => setCertificadoLaboral(e.target.files[0])}
        />
      </div>

      {/* HABILIDADES */}
      <div className="campo">
        <label>Habilidades / Competencias aplicadas</label>
        <div className="grupo-agregar-curso">
          <input
            type="text"
            value={habilidadTemp}
            onChange={(e) => setHabilidadTemp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), agregarHabilidad())}
          />
          <button
            type="button"
            className="btn-agregar"
            onClick={agregarHabilidad}
          >
            + Agregar
          </button>
        </div>

        {habilidades.length > 0 && (
          <ul className="lista-cursos">
            {habilidades.map((hab, index) => (
              <li key={index}>
                <span>{hab}</span>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => eliminarHabilidad(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* BOTÓN AGREGAR EXP LOCAL */}
      <button
        type="button"
        className="btn-bloque-agregar"
        onClick={agregarBloqueExperiencia}
      >
        + Añadir esta experiencia
      </button>

      {/* LISTA DE EXPERIENCIAS YA AÑADIDAS */}
      {experiencias.length > 0 && (
        <div className="contenedor-experiencias-lista">
          <h3>Experiencias agregadas ({experiencias.length}):</h3>
          <ul className="lista-experiencias">
            {experiencias.map((item, index) => (
              <li key={index}>
                <div className="info-exp">
                  <strong>{item.cargo}</strong> en <em>{item.empresa}</em>
                </div>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => eliminarExperiencia(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* BOTONES PRINCIPALES */}
      <div className="botones">
        <button type="button" onClick={onVolver}>
          Volver
        </button>

        <button type="button" onClick={handleGuardarTodo}>
          Guardar todo
        </button>
      </div>
    </div>
  );
}