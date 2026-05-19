import { useState, useEffect } from 'react';
import { Button } from './components/atoms/button';
import { DataTableGrid } from './components/organisms/DataTableGrid';
import type { DataTableColumn } from './components/organisms/DataTableGrid';
import './App.css';

function App() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableData2, setTableData2] = useState<any[]>([]);
  const [loading2, setLoading2] = useState(true);

  const columns: DataTableColumn[] = [
    { data: 'id', title: 'ID', orderable: true },
    { data: 'name', title: 'Nombre', orderable: true },
    { data: 'username', title: 'Usuario', orderable: false },
    {
      data: 'email',
      title: 'Email',
      render: (data: string) => <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{data?.toLowerCase()}</span>
    }
  ];

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

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setTableData(data);
        setLoading(false);
      })
      .catch(err => console.error("Error en API:", err));
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setTableData2(data);
        setLoading2(false);
      })
      .catch(err => console.error("Error en API 2:", err));
  }, []);

  if (loading || loading2) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando entorno...</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>

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

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Variantes de Color:</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button label="Default" color="#0050a5" />
              <Button label="Secondary" color="#ff922c" />
              <Button label="Danger" color="#cc0000" />
              <Button label="Success" color="#009100" />
              <Button label="Outline" color="#ff91f0" />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Escala de Tamaños:</h4>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button label="Small" size="sm" />
              <Button label="Medium" size="md" />
              <Button label="Large" size="lg" />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Shapes y Fuentes controladas:</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button label="Estilo Pill (Cápsula)" shape="pill" variant="success" />
              <Button label="Estilo Recto" shape="square" variant="danger" />
              <Button label="Fuente Monospace" font="mono" variant="secondary" />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Estructuras Complejas y Atributos HTML:</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button label="Buscar Usuario" icon="🔍" iconPosition="left" variant="primary" />
              <Button label="Siguiente Paso" icon="➡️" iconPosition="right" variant="secondary" />
              <Button label="Botón Bloqueado Nativamente" disabled onClick={() => alert('No debería leerse')} />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#666' }}>Comportamiento Estructural:</h4>
            <Button label="Botón en Bloque (fullWidth={true})" fullWidth variant="primary" />
          </div>

        </div>
      </section>

      <hr style={{ margin: '2rem 0' }} />
      
      
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

      <section style={{ marginBottom: '3rem' }}>
        <h2>3. Componente DataTableGrid (Contactos de Respaldo)</h2>

         //tabla2 
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

          <Button
            label="+"
            variant="primary"
            size="lg"
            onClick={() => alert('Agregar nueva columna')}
          />
           

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button
            label="+"
            variant="primary"
            size="lg"
            onClick={() => alert('Agregar nuevo fila')}

          />

        </div>

      </section>

    </div>
  );
}

export default App;