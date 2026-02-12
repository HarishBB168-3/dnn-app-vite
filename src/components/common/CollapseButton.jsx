const CollapseButton = ({ targetCollapseId, children, ...props }) => {
  return (
    <button
      data-bs-toggle="collapse"
      data-bs-target={`#${targetCollapseId}`}
      aria-expanded="false"
      aria-controls={targetCollapseId}
      {...props}
    >
      {children}
    </button>
  );
};

export default CollapseButton;
