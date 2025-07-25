import React, { useState } from "react";
import { Button, notification } from "antd";
import { RefreshCw } from "lucide-react";
import InventoryTableContainer from "./InventoryTableContainer";

notification.config({
  placement: "topLeft",
  top: 80,
});

const Products: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdateProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/alegra/sincronizar");
      const data = await response.json();
      console.log("Productos actualizados:", data);

      notification.success({
        message: "Actualización exitosa",
        description:
          data.message ||
          "Se han actualizado los productos desde Alegra correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar productos:", error);
      notification.error({
        message: "Error en la actualización",
        description: "No se pudieron actualizar los productos desde Alegra.",
      });
    }
    setLoading(false);
  };

  return (
    <div
      className="p-4 min-h-[calc(100vh-4rem)] bg-inherit transition-colors duration-500 ease-in-out text-gray-900 dark:text-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Productos
        </h1>
        <Button
          type="primary"
          onClick={handleUpdateProducts}
          loading={loading}
          icon={<RefreshCw className="h-4 w-4" />}
        >
          Actualizar Productos
        </Button>
      </div>
      <div className="overflow-x-auto">
        <InventoryTableContainer />
      </div>
    </div>
  );
};

export default Products;
