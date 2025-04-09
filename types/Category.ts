import { ID, Text } from "./Global";

export interface Category {
    Id?: number,
    Nombre?: string,
    Icono?: string,
    Tag?: string,
}

export interface ServiceItem {
    id?: number,
    name?: string,
    icon?: string,
}

export interface PackageItem {
    titulo?: Text,
    url?: Text,
}

export interface Order {
    pq_id: ID,
    pq_titulo?: Text,
    pq_sub_titulo?: Text,
    pq_codigo?: Text,
    pq_img?: Text,
    us_nombres: Text,
    cp_id: Text,
    cp_code: Text,
    cp_fecha: Text,
    cp_est: Text,
    anombre_de: Text,
    pq_tipo_orden: Text,
    pq_tipo_orden_nombre: Text,
    pq_cod_interno: Text,
    pp_id: Text,
    pi_id: Text,
    iny_fecha: Text,
    iny_direccion: Text,
    url_orden?: Text,
    url_paquetes?: PackageItem[],
}