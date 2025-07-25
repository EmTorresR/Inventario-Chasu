import React, { useEffect, useState } from "react";
import api from "../services/api";
import InventoryTable, { InventoryRow } from "./InventoryTable";

const InventoryTableContainer: React.FC = () => {
  // Definimos el estado rows con tipo InventoryRow[]
  const [rows, setRows] = useState<InventoryRow[]>([]);

  useEffect(() => {
    api
      .get("/productos")
      .then((response) => {
        const productos = response.data;
        const newRows: InventoryRow[] = [];
        productos.forEach((producto: any) => {
          if (producto.variants && producto.variants.length > 0) {
            producto.variants.forEach((variant: any) => {
              newRows.push({
                productId: producto.id,
                nombre: producto.nombre,
                codigo: producto.codigo,
                tipo: producto.tipo,
                equipo: producto.equipo,
                descripcion: producto.descripcion,
                variantId: variant.id,
                diseño: variant.diseño,
                variante: variant.variante,
                stock: variant.stock,
                qrCode: variant.qrCode,
              });
            });
          } else {
            newRows.push({
              productId: producto.id,
              nombre: producto.nombre,
              codigo: producto.codigo,
              tipo: producto.tipo,
              equipo: producto.equipo,
              descripcion: producto.descripcion,
              variantId: "-", // o un valor adecuado, por ejemplo, 0 o una cadena vacía
              diseño: "-",
              variante: "-",
              stock: typeof producto.stock === "number" ? producto.stock : 0,
              qrCode: "-",
            });
          }
        });
        setRows(newRows);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  return (
    // Este contenedor evita que la tabla expanda el ancho global y activa scroll horizontal
    <div style={{ width: "100%", maxWidth: "100vw", overflowX: "auto" }}>
      <InventoryTable rows={rows} />
    </div>
  );
};

export default InventoryTableContainer;
