import Image from "next/image";
export function TeamCard({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image: string | null;
}) {
  return (
    <article className="team-card">
      <div className="portrait-placeholder">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 700px) 100vw, 33vw"
          />
        ) : (
          <span>PORTRAIT TO BE ADDED</span>
        )}
      </div>
      <h3>{name}</h3>
      <p>{role}</p>
    </article>
  );
}
