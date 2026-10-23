interface PictureSlotProps {
  readonly label: string;
  readonly ratio: "4/5" | "16/9";
}

// Placeholder for a picture the owner will supply. Visible, labelled, and removed when the real picture is added.
export function PictureSlot({ label, ratio }: PictureSlotProps) {
  return (
    <figure data-placeholder="true" role="img" aria-label={`Picture to come: ${label}`} className="reveal m-0">
      <div
        className="flex items-end bg-border p-5 text-[15px] text-muted"
        style={{ aspectRatio: ratio }}
      >
        Picture to come: {label}
      </div>
    </figure>
  );
}
