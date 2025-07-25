import React from "react";
import { Modal, Table } from "antd";
import "./UpdateModal.css";

export interface PendingUpdate {
  variantId: string | number;
  nombre: string;
  variante: string;
  oldStock: number;
  newStock: number;
  // Puedes agregar otros campos si es necesario
}

interface UpdateModalProps {
  visible: boolean;
  pendingUpdates: PendingUpdate[];
  onConfirm: () => void;
  onCancel: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  visible,
  pendingUpdates,
  onConfirm,
  onCancel,
}) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Variante",
      dataIndex: "variante",
      key: "variante",
    },
    {
      title: "Stock",
      dataIndex: "oldStock",
      key: "oldStock",
    },
    {
      title: "Stock Nuevo",
      dataIndex: "newStock",
      key: "newStock",
    },
  ];

  return (
    <Modal
      title="Confirmar Actualización de Stock"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirmar"
      cancelText="Cancelar"
      wrapClassName="left-modal"
    >
      <p>Se actualizarán las siguientes actualizaciones:</p>
      <Table 
        dataSource={pendingUpdates}
        columns={columns}
        pagination={false}
        rowKey="variantId"
      />
    </Modal>
  );
};

export default UpdateModal;
