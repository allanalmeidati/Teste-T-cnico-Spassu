import React, { createContext, useContext, useState } from 'react';

// Criar um contexto para o Toast
const ToastContext = createContext();

// Provedor do contexto para envolver sua aplicação
export const ToastProvider = ({ children }) => {
    const [toastConfig, setToastConfig] = useState({
        show: false,
        delay: 3000,
        autohide: true,
        headerText: 'Bootstrap',
        headerImgSrc: 'holder.js/20x20?text=%20',
        headerImgAlt: '',
        headerTime: '11 mins ago',
        bodyText: "Woohoo, you're reading this text in a Toast!",
        bgColor: '#007bff', // Cor padrão do Bootstrap
    });

    const showToast = (config) => {
        setToastConfig({ ...toastConfig, ...config, show: true });
    };

    const hideToast = () => {
        setToastConfig({ ...toastConfig, show: false });
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast, toastConfig }}>
            {children}
        </ToastContext.Provider>
    );
};

// Hook para acessar o contexto
export const useToast = () => {
    return useContext(ToastContext);
};
