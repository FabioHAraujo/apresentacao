'use client';

const Loading = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">Carregando...</div>
        <style jsx>{`
          .loader {
            border: 4px solid #f3f3f3; /* Cor clara */
            border-top: 4px solid #3498db; /* Cor do topo */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };
  
  export default Loading;
  