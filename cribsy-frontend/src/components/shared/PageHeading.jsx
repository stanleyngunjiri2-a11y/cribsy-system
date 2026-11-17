function PageHeading({ title, description, action }) {
  return (
    <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="page-title">{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}

export default PageHeading
