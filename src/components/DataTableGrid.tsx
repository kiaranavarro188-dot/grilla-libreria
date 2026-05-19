import React from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

DataTable.use(DT);

export interface DataTableColumn {
  data: string | null;
  title: string;
  render?: (data: any, type: any, row: any) => any;
  orderable?: boolean;
  searchable?: boolean;
  [key: string]: any;
}

export interface DataTableAction {
  /** Identificador único para la acción */
  id: string;
  /** Texto del botón (opcional si se usa un icono) */
  label?: string;
  /** Icono (SVG u otro elemento de React) */
  icon?: React.ReactNode;
  /** Función que se ejecutará al hacer clic (recibe la fila entera) */
  onClick: (row: any) => void;
  /** Clases CSS personalizadas */
  className?: string;
  /** Estilos CSS en línea personalizados */
  style?: React.CSSProperties;
}

export interface DataTableGridProps {
  data: any[];
  columns: DataTableColumn[];
  options?: any;
  className?: string;

  /** Función que se ejecuta al presionar Editar (si se provee, aparece el botón por defecto) */
  onEdit?: (row: any) => void;
  /** Función que se ejecuta al presionar Eliminar (si se provee, aparece el botón por defecto) */
  onDelete?: (row: any) => void;
  /** Acciones completamente personalizadas */
  customActions?: DataTableAction[];
}

// Iconos SVG por defecto
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

export const DataTableGrid: React.FC<DataTableGridProps> = ({
  data,
  columns,
  options = {},
  className = 'display',
  onEdit,
  onDelete,
  customActions = []
}) => {
  const slots: Record<number, any> = {};

  // Mapeamos las columnas para convertir los 'render' de React en 'slots' de DataTables
  const finalColumns = columns.map((col, index) => {
    const newCol = { ...col };
    if (newCol.render) {
      const renderFn = newCol.render; // Guardamos la función antes de eliminarla del objeto
      // Si el usuario provee un render (que devuelve JSX), lo movemos a los slots
      slots[index] = (cellData: any, rowData: any) => renderFn(cellData, 'display', rowData);
      // Eliminamos el render nativo para que DataTables no reciba un objeto [object Object]
      delete newCol.render;
    }
    return newCol;
  });

  // Consolidar todas las acciones
  const actionsToRender: DataTableAction[] = [...customActions];

  if (onEdit) {
    actionsToRender.unshift({
      id: 'default-edit',
      label: '',
      icon: <EditIcon />,
      onClick: onEdit,
      style: { background: '#fef08a', color: '#854d0e', border: '1px solid #eab308', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', marginRight: '4px' }
    });
  }

  if (onDelete) {
    actionsToRender.push({
      id: 'default-delete',
      label: '',
      icon: <DeleteIcon />,
      onClick: onDelete,
      style: { background: '#fecaca', color: '#991b1b', border: '1px solid #ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }
    });
  }

  // Si hay acciones, agregamos la columna dinámica al final
  if (actionsToRender.length > 0) {
    const actionColIndex = finalColumns.length;
    finalColumns.push({
      data: null, // No mapea a una propiedad específica
      title: 'Acciones',
      orderable: false,
      searchable: false,
    });

    // Inyectamos el componente React nativo en esa columna usando la prop "slots"
    slots[actionColIndex] = (cellData: any, rowData: any) => {
      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          {actionsToRender.map((action) => (
            <button
              key={action.id}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(rowData);
              }}
              className={action.className}
              style={action.style}
              title={action.label}
            >
              {action.icon}
              {action.label && <span>{action.label}</span>}
            </button>
          ))}
        </div>
      );
    };
  }

  return (
    <div className="datatable-grid-container" style={{ width: '100%', overflowX: 'auto' }}>
      <DataTable
        data={data}
        columns={finalColumns}
        className={className}
        slots={slots}
        options={{
          language: {
            url: '//cdn.datatables.net/plug-ins/2.0.8/i18n/es-ES.json',
          },
          responsive: true,
          ...options
        }}
      />
    </div>
  );
};
