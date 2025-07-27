import '../../styles/index.css';

export default function Loader() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
