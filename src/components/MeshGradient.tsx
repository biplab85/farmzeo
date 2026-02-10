export default function MeshGradient({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Base color */}
      <div className="absolute inset-0 bg-[#021B33]" />

      {/* Gradient blobs */}
      <div
        className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full opacity-60 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #025080 0%, transparent 70%)',
          animation: 'meshBlob1 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -right-[5%] top-[10%] h-[500px] w-[500px] rounded-full opacity-50 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #0D9984 0%, transparent 70%)',
          animation: 'meshBlob2 25s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full opacity-40 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #0A5C4A 0%, transparent 70%)',
          animation: 'meshBlob3 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute right-[20%] top-[50%] h-[350px] w-[350px] rounded-full opacity-30 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #025080 0%, transparent 70%)',
          animation: 'meshBlob1 28s ease-in-out infinite reverse',
        }}
      />

      {/* Grain texture overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <style>{`
        @keyframes meshBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes meshBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.08); }
          66% { transform: translate(20px, -30px) scale(0.92); }
        }
        @keyframes meshBlob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, 20px) scale(1.1); }
          66% { transform: translate(-30px, -10px) scale(0.9); }
        }
      `}</style>
    </div>
  )
}
