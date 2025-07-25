import React from "react";
import Html5QrScanner from "./Html5QrScanner";
import ProductCard, { ProductCardProduct } from "./ProductCard";
import "./ScannerArea.css";

interface ScannerAreaProps {
  scannerVisible: boolean;
  pause: boolean;
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onCancel: () => void;
  scanResult: any; // Puedes afinar el tipo según la estructura de scanResult
  productData: ProductCardProduct | null;
  onCloseOverlay: () => void;
  pendingCount: number;
  onIncrement: (quantity: number) => void;
  onUpdate: () => void;
  onToggleDetails?: () => void;
  onStockEditorChange?: (visible: boolean) => void;
}

const ScannerArea: React.FC<ScannerAreaProps> = ({
  scannerVisible,
  pause,
  onScanSuccess,
  onCancel,
  scanResult,
  productData,
  onCloseOverlay,
  pendingCount,
  onIncrement,
  onUpdate,
  onToggleDetails,
  onStockEditorChange,
}) => {
  return (
    <div className="scanner-area">
      <Html5QrScanner
        scannerVisible={scannerVisible}
        onScanSuccess={pause ? () => {} : onScanSuccess}
        onCancel={onCancel}
        pause={pause}
      />
      {scanResult && productData && (
        <div className="overlay">
          <ProductCard
            product={productData}
            onClose={onCloseOverlay}
            pendingCount={pendingCount}
            onIncrement={onIncrement}
            onUpdate={onUpdate}
            onToggleDetails={onToggleDetails}
            onStockEditorChange={onStockEditorChange}
          />
        </div>
      )}
    </div>
  );
};

export default ScannerArea;
