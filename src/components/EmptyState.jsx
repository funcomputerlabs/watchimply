export function EmptyState({ title, text, action }) {
  return (
    <div className="empty" role="status">
      <h2>{title}</h2>
      <p className="muted">{text}</p>
      {action}
    </div>
  );
}

export function ErrorState({ title = 'No se pudo mostrar este contenido', text }) {
  return (
    <div className="error-box" role="alert">
      <h2>{title}</h2>
      <p className="muted">{text}</p>
    </div>
  );
}
