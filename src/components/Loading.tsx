const LoadingSpinner = ({ size = 10 }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`w-${size} h-${size} rounded-full border-4 border-primary border-opacity-25 animate-spin ease-in-out`}>
        <div className={`w-${size - 8} h-${size - 8} rounded-full bg-primary shadow-lg`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
