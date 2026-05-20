import { useState, useEffect } from 'react';
// Importamos tu botón atómico y la grilla (organismo) con sus tipos
import { Button } from './components/atoms/button';
import { DataTableGrid } from './components/organisms/DataTableGrid';
import type { DataTableColumn } from './components/organisms/DataTableGrid';
import './App.css';

// --- NUEVAS IMPORTACIONES DE ÍCONOS MODERNOS (De react-icons) ---
// Importamos íconos de la colección Heroicons (Hi2)
import { 
  HiMagnifyingGlass,  // Lupa para Buscar
  HiArrowRight,       // Flecha para Siguiente
  HiTrash,             // Tachito para Eliminar
  HiCog8Tooth          // Engranaje para Configuración/Procesando
} from "react-icons/hi2"

function App() {
  // Estados para controlar los datos de las dos tablas y sus respectivos loaders
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableData2, setTableData2] = useState<any[]>([]);
  const [loading2, setLoading2] = useState(true);

  // Configuración de columnas para la primera tabla (Usuarios Activos)
  const columns: DataTableColumn[] = [
    { data: 'id', title: 'ID', orderable: true },
    { data: 'name', title: 'Nombre', orderable: true },
    { data: 'username', title: 'Usuario', orderable: false },
    {
      data: 'email',
      title: 'Email',
      // Propiedad 'render' para personalizar cómo se ve la celda usando JSX
      render: (data: string) => <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{data?.toLowerCase()}</span>
    }
  ];

  // Configuración de columnas para la segunda tabla (Contactos de Respaldo)
  const columns2: DataTableColumn[] = [
    { data: 'id', title: 'ID', orderable: true },
    { data: 'name', title: 'Nombre', orderable: true },
    { data: 'username', title: 'Usuario', orderable: false, searchable: false },
    {
      data: 'phone',
      title: 'Telefono',
      orderable: false,
      render: (data: string) => <span style={{ color: '#000', fontStyle: 'italic' }}>{data}</span>
    }
  ];

  // Primer useEffect: Simula la carga de datos de la API principal al montar el componente
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setTableData(data);
        setLoading(false); // Apagamos el loader cuando la data ya está en el estado
      })
      .catch(err => console.error("Error en API:", err));
  }, []);

  // Segundo useEffect: Carga de datos para la tabla de respaldo
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setTableData2(data);
        setLoading2(false);
      })
      .catch(err => console.error("Error en API 2:", err));
  }, []);

  // Guard de carga: Bloquea el renderizado de la app hasta que ambas APIs respondan
  if (loading || loading2) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando entorno...</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>

      {/* SECCIÓN 1: El catálogo donde mostramos el poder del botón reutilizable */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>1. Componente Button (Catálogo de Pruebas)</h2>
        <div style={{
          padding: '2rem',
          border: '1px dashed #ccc',
          borderRadius: '8px',
          backgroundColor: '#fcfcfc',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>

          {/* Prueba de Variantes y paso de eventos nativos */}
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Variantes de Color (con Eventos):</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {/* Demostración de que el onClick (...rest) funciona correctamente en el botón */}
              <Button label="Default" color="#0050a5" onClick={() => alert('¡El botón Default funciona!')} />
              <Button label="Secondary" color="#ff922c" onClick={() => alert('¡Secundario activo!')} />
              <Button label="Danger" color="#cc0000" />
              <Button label="Success" color="#009100" />
              {/* Variant outline fuerza al botón a usar bordes en lugar de fondo sólido */}
              <Button label="Outline" variant="outline" color="#ff91f0" />
            </div>
          </div>

          {/* Prueba de escala de tamaños definidos en el diccionario interno del Button */}
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Escala de Tamaños:</h4>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button label="Small" size="sm" />
              <Button label="Medium" size="md" />
              <Button label="Large" size="lg" />
            </div>
          </div>

          {/* Prueba de las formas de bordes y cambio de tipografías */}
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Shapes y Fuentes controladas:</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button label="Estilo Pill (Cápsula)" shape="pill" variant="success" />
              <Button label="Estilo Recto" shape="square" variant="danger" />
              <Button label="Fuente Monospace" font="mono" variant="secondary" />
            </div>
          </div>

          {/* Prueba de integración de iconos y la propiedad nativa 'disabled' */}
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Estructuras Complejas y Íconos Modernos (Vectoriales):</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              
              {/* Usamos <Hi2MagnifyingGlass /> en lugar de "🔍" */}
              <Button label="Buscar Usuario" icon={<HiMagnifyingGlass />} iconPosition="left" variant="primary" />
              
              {/* Usamos <Hi2ArrowRight /> en lugar de "➡️" */}
              <Button label="Siguiente Paso" icon={<HiArrowRight />} iconPosition="right" variant="secondary" />
              
              <Button label="Botón Bloqueado Nativamente" disabled />
            </div>
          </div>

          {/* Prueba del nuevo estado isLoading (fundamental para flujos asincrónicos del CPS) */}
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Estado de Carga (Simulación API):</h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button label="Guardar Datos" variant="primary" isLoading={true} />
              
              {/* Usamos <Hi2Cog8Tooth /> en lugar de "⚙️" */}
              <Button label="Procesando..." variant="secondary" isLoading={true} icon={<HiCog8Tooth />} />
            </div>
          </div>

          {/* Prueba de botones compuestos "Solo Ícono" (evalúa la ausencia de label para quitar márgenes) */}
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Botones de Acción (Solo Ícono Moderno):</h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              
              {/* Ícono de tachito vectorial */}
              <Button icon={<HiTrash />} variant="danger" shape="square" aria-label="Eliminar" />
              
              {/* Ícono de engranaje vectorial */}
              <Button icon={<HiCog8Tooth />} variant="secondary" shape="pill" aria-label="Configuración" />
              
              {/* Ícono de lupa vectorial */}
              <Button icon={<HiMagnifyingGlass />} variant="outline" shape="default" aria-label="Buscar" />
            </div>
          </div>
          {/* Prueba de comportamiento estructural ocupando el ancho del contenedor padre */}
<div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Comportamiento Estructural:</h4>
            <Button label="Botón en Bloque (fullWidth={true})" fullWidth variant="primary" />
          </div>

        </div>
      </section>

      <hr style={{ margin: '2rem 0' }} />
      
      {/* SECCIÓN 2: Uso de componentes en un escenario real con la grilla de usuarios */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>2. Componente DataTableGrid (Usuarios Activos)</h2>
        <div style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <DataTableGrid
            data={tableData}
            columns={columns}
            onEdit={(row) => alert(`Editando a ${row.name}`)}
            onDelete={(row) => alert(`Eliminando a ${row.name}`)}
            customActions={[
              {
                id: 'custom-view',
                label: 'Ver',
                style: { background: '#dbeafe', color: '#1e40af', border: '1px solid #3b82f6', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
                onClick: (row) => alert(`Viendo perfil de ${row.email}`)
              },
            ]}
            options={{ pageLength: 3, lengthMenu: [3, 5, 10] }}
          />
        </div>
      </section>

      {/* SECCIÓN 3: Segunda grilla demostrando la reutilización de botones como acciones de interfaz */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>3. Componente DataTableGrid (Contactos de Respaldo)</h2>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ flex: 1, padding: '1rem', border: '1px dashed #da2626', borderRadius: '8px' }}>
            <DataTableGrid
              data={tableData2}
              columns={columns2}
              onEdit={(row) => alert(`Editando a ${row.name}`)}
              onDelete={(row) => alert(`Eliminando a ${row.name}`)}
              customActions={[
                {
                  id: 'custom-view',
                  label: 'Ver',
                  style: { background: '#dbeafe', color: '#1e40af', border: '1px solid #3b82f6', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
                  onClick: (row) => alert(`Viendo perfil de ${row.name}`)
                },
              ]}
              options={{ pageLength: 3, lengthMenu: [3, 5, 10] }}
            />
          </div>

          {/* Botón de acción rápida lateral optimizado con forma circular (shape="pill") */}
          <Button
            label="+"
            variant="primary"
            size="md"
            shape="pill"
            onClick={() => alert('Agregar nueva columna')}
          />
        </div>

        {/* Botón de acción rápida inferior para insertar registros a la grilla */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button
            label="+"
            variant="primary"
            size="md"
            shape="pill"
            onClick={() => alert('Agregar nueva fila')}
          />
        </div>

      </section>

    </div>
  );
}

export default App;