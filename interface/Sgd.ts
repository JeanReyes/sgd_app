export interface ItemSolicitud {
    quantity: string;
    unidad_medida: string;
    detail: string;
    classification: string;
    precio: string;
}

type TypeCompra = 
| 'Trato directo' 
| 'Compra Agil' 
| 'Convenio Marco' 
| 'Licitación Privada' 
| 'Licitación Pública <=100UTM (L1)' 
| 'Licitación Pública > 100 UTM y <= 1000 UTM (LE)'
| 'Licitación Pública > 1000 UTM y <= 2000 UTM (LP)'
| 'Compra excluida del sistema (Art. 53 Ley 19886)'
| 'Licitación Pública > 2000 UTM y <= 5000 UTM (LQ)'
| 'Licitación Pública > 5000 UTM (LR)'
| 'Gran Compra'
 
export interface NewSolicitud {
    numero_solicitud: string;
    tipo_compra: TypeCompra;
    fecha_ingreso: string;
    area: string;
    unidad: string;
    items: ItemSolicitud []
    afecto: 'afecto' | 'exento'
    total_neto: number;
    iva: number;
    total_buto: number;
    destino: string;
    programa: string;
}

// Solicitud List

export interface Status {
    unidad: string;
    fecha: string;
    firma: string;
    observacion: string;
    status: string
  } 
  
  export interface Solicitud {
    id: string,
    fecha_creacion: string,
    creador: string,
    numero_solicitud: string,
    area: string,
    firma: string,
    items: ItemSolicitud []
    status: Status []
    calculate: CalculateSolicitud
  }

export interface CalculateSolicitud {
    total_neto: string;
    iva: string;
    total_bruto: string;
    destino: string;
    programa: string;
    observacion: string;
}
