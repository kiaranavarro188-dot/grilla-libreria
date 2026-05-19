import { useState, useEffect } from 'react'; // 1. Sumamos useEffect
import { Button } from './components/boton';
import { DataTableGrid } from './components/DataTableGrid';
import type { DataTableColumn } from './components/DataTableGrid';
import './App.css';

function App() {
  // 2. Arranca como array vacío y sumamos estado de carga
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableData2, setTableData2] = useState<any[]>([]);
  const [loading2, setLoading2] = useState(true);
  // 3. Columnas adaptadas a los campos reales de la API de prueba
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

  // 4. Llamada a la API al montar el componente
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
        console.log(data);
      })
      .catch(err => console.error("Error en API 2:", err));
  }, []);

  // 5. Cartel de espera mientras descarga
  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando usuarios...</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <hr style={{ margin: '2rem 0' }} />

      <section style={{ marginBottom: '3rem' }}>
        <h2>1. Componente Button</h2>
        <div style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <Button label="Haz clic aquí" onClick={() => alert('¡El botón funciona!')} />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>2. Componente DataTableGrid</h2>
        <div style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <DataTableGrid
            data={tableData}
            columns={columns}
            onEdit={(row) => {
              console.log('Controlador - Editar fila:', row);
              alert(`Editando a ${row.name} (ID: ${row.id})`);
            }}

            onDelete={(row) => {
              console.log('Controlador - Eliminar fila:', row);
              alert(`Eliminando a ${row.name} (ID: ${row.id})`);
            }}
            customActions={[
              {
                id: 'custom-view',
                label: 'Ver',
                style: { background: '#dbeafe', color: '#1e40af', border: '1px solid #3b82f6', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
                onClick: (row) => alert(`Viendo perfil de ${row.email}`)
              },

            ]}
            options={{
              pageLength: 3,
              lengthMenu: [3, 5, 10]
            }}
          />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>2. Componente DataTableGrid</h2>
        <div style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <DataTableGrid
            data={tableData2}
            columns={columns2}
            onEdit={(row) => {
              console.log('Controlador - Editar fila:', row);
              alert(`Editando a ${row.name} (ID: ${row.id})`);
            }}

            onDelete={(row) => {
              console.log('Controlador - Eliminar fila:', row);
              alert(`Eliminando a ${row.name} (ID: ${row.id})`);
            }}
            customActions={[
              {
                id: 'custom-view',
                label: 'Ver',
                style: { background: '#dbeafe', color: '#1e40af', border: '1px solid #3b82f6', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
                onClick: (row) => alert(`Viendo perfil de ${row.name}`)
              },

            ]}
            options={{
              pageLength: 3,
              lengthMenu: [3, 5, 10]
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default App;