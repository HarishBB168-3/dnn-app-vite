const Collapse = ({ id, children, ...props }) => {
  return (
    <div className="collapse mb-3" id={id} {...props}>
      {children}
    </div>
  );
};

export default Collapse;
