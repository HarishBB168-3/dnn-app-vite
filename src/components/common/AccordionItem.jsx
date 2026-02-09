// AccordionItem.jsx
const AccordionItem = ({ id, title, parentId, isOpen = false, children }) => {
  const headingId = `heading-${parentId}-${id}`;
  const collapseId = `collapse-${parentId}-${id}`;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={headingId}>
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
