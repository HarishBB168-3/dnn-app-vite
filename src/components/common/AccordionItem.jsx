// AccordionItem.jsx
const AccordionItem = ({
  id,
  title,
  parentId,
  isOpen = false,
  actionBtn,
  children,
}) => {
  const headingId = `heading-${parentId}-${id}`;
  const collapseId = `collapse-${parentId}-${id}`;

  return (
    <div className="accordion-item">
      <div className="d-flex align-items-center">
        <h2 className="accordion-header flex-grow-1" id={headingId}>
          <button
            className={`accordion-button ${!isOpen ? "collapsed" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${collapseId}`}
            aria-expanded={isOpen}
            aria-controls={collapseId}
          >
            {title}
          </button>
        </h2>
        {actionBtn}
      </div>

      <div
        id={collapseId}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
        aria-labelledby={headingId}
        data-bs-parent={`#${parentId}`}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
