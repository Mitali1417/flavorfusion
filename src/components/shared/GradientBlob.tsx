
const generateBlobs = (count = 10) => {
  const blobs = [];
  for (let i = 0; i < count; i++) {
    const size = Math.floor(Math.random() * 150) + 100; // Width/Height between 100–250px
    const top = Math.floor(Math.random() * 90); // % from top
    const left = Math.floor(Math.random() * 90); // % from left
    const isRight = Math.random() > 0.5;

    blobs.push({
      key: i,
      size,
      position: isRight ? { right: `${left}%`, top: `${top}%` } : { left: `${left}%`, top: `${top}%` },
    });
  }
  return blobs;
};

export default function GradientBlobs() {
  const blobs = generateBlobs(8); 

  return (
    <div className="absolute inset-0 -z-10">
      {blobs.map((blob) => (
        <span
          key={blob.key}
          className="animate-pulse bg-primary blur-3xl rounded-full absolute opacity-30"
          style={{
            width: blob.size,
            height: blob.size,
            ...blob.position,
          }}
        />
      ))}
    </div>
  );
}
